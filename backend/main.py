from pathlib import Path

from dotenv import load_dotenv

# Load .env.local first (backend dir), then .env
_env_local = Path(__file__).resolve().parent / ".env.local"
_env = Path(__file__).resolve().parent / ".env"
if _env_local.exists():
    load_dotenv(_env_local)
if _env.exists():
    load_dotenv(_env)

from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from google import genai
from google.genai.types import FileState
from groq import Groq
import json
import os
import time
import uuid

# command to run the server: python3 -m uvicorn main:app --reload

app = FastAPI()

INFO_FILE = "info.json"
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# LLM config: load from backend/.env.local or environment variables only
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "").strip()
GROQ_MODEL = "groq/compound"
GOOD_DEED_PROMPT = (
    "Based on this video create a summary (2 sentence max) of the good deed the user did. Take the user at face value. Focus on sustainibility and environmental impact. Things like saving/sharing food, helping poor, recycling, etc. If the user is just saying something take what they say at face value."
    'For example: "They gave 10 meals to 10 different homeless people." or "They recycled 5 metal cans." or "They installed solar panels on their roof." or "They donated 100 dollars to an environmental charity." or "They used public transportation instead of driving a car."'
)
COMPARE_PROMPT = """You are comparing two good deeds (short summaries). Which good deed is more impactful to the world? more=better
Reply with exactly one word: A or B.
A: {summary_a}
B: {summary_b}"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

goal_data = {
    "name": "Overall Goal",
    "children": [
        {"name": "Subgoal 1", "children": [{"name": "Task 1"}, {"name": "Task 2"}]},
        {"name": "Subgoal 2", "children": [{"name": "Task 3"}]},
    ],
}


def load_info():
    if not os.path.exists(INFO_FILE):
        data = {"users": [], "communities": []}
        with open(INFO_FILE, "w") as f:
            json.dump(data, f, indent=2)
        return data
    with open(INFO_FILE, "r") as f:
        data = json.load(f)
    for u in data.get("users", []):
        if "videos" not in u:
            u["videos"] = []
    return data


def save_info(data: dict):
    with open(INFO_FILE, "w") as f:
        json.dump(data, f, indent=2)


# --- Gemini + Groq: video description and ranking ---


def _wait_for_file_active(client: genai.Client, file_name: str, poll_interval: float = 2.0, timeout: float = 300.0):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        myfile = client.files.get(name=file_name)
        state = getattr(myfile, "state", None)
        if state == FileState.ACTIVE:
            return myfile
        if state == FileState.FAILED:
            raise RuntimeError(f"File processing failed: {file_name}")
        time.sleep(poll_interval)
    raise TimeoutError(f"File did not become ACTIVE within {timeout}s: {file_name}")


def _compare_good_deeds(summary_a: str, summary_b: str) -> str:
    """Returns 'A' if first is better, 'B' if second, 'SAME' if equal."""
    client = Groq(api_key=GROQ_API_KEY)
    prompt = COMPARE_PROMPT.format(summary_a=summary_a.strip(), summary_b=summary_b.strip())
    r = client.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model=GROQ_MODEL,
        max_tokens=10,
    )
    raw = (r.choices[0].message.content or "").strip().upper()
    print(f"[Compare] raw: {r.choices[0].message.content}")
    if "A" in raw and "B" not in raw[:2]:
        result = "A"
    elif "B" in raw:
        result = "B"
    else:
        result = "SAME"
    print(f"[Compare] A: {summary_a[:80]!r}... | B: {summary_b[:80]!r}... => {result}")
    return result


def _rank_index_for_new_summary(new_summary: str, ranked_entries: list[dict]) -> int:
    """Insertion index (0 = best). Max 5 Groq comparisons."""
    MAX_COMPARISONS = 5
    if not ranked_entries:
        return 0
    summaries = [e.get("llm_response") or "" for e in ranked_entries]
    n = len(summaries)
    result = _compare_good_deeds(new_summary, summaries[0])
    if result == "A":
        return 0
    count = 1
    if n == 1:
        return 1
    lo, hi = 1, n
    while lo < hi and count < MAX_COMPARISONS:
        mid = (lo + hi) // 2
        result = _compare_good_deeds(new_summary, summaries[mid])
        count += 1
        if result == "A":
            hi = mid
        else:
            lo = mid + 1
    return lo


def get_good_deed_summary(video_path: str) -> str:
    """Upload video to Gemini and return 2-sentence good-deed summary."""
    print(f"[Gemini] Starting: video_path={video_path!r}")
    client = genai.Client(api_key=GEMINI_API_KEY)
    myfile = client.files.upload(file=video_path)
    file_name = getattr(myfile, "name", None) or getattr(myfile, "file_name", None) or str(myfile)
    print(f"[Gemini] File uploaded, name={file_name!r}, waiting for ACTIVE...")
    myfile = _wait_for_file_active(client, file_name)
    print(f"[Gemini] File ACTIVE, calling generate_content (model=gemini-2.5-flash)...")
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=[myfile, GOOD_DEED_PROMPT],
    )
    raw = getattr(response, "text", None)
    print(f"[Gemini] response.text type={type(raw)!r}, value={raw!r}")
    if not raw and getattr(response, "candidates", None):
        for i, c in enumerate(response.candidates):
            fr = getattr(c, "finish_reason", None)
            print(f"[Gemini] candidates[{i}] finish_reason={fr!r}")
            content = getattr(c, "content", None)
            if content and getattr(content, "parts", None):
                for j, p in enumerate(content.parts):
                    pt = getattr(p, "text", None)
                    print(f"[Gemini] candidates[{i}].parts[{j}].text={pt!r}")
                    if pt and not raw:
                        raw = pt
    if not raw:
        print(f"[Gemini] No text in response; full response repr: {response!r}")
    text = (raw or "").strip()
    print(f"[Gemini] Final summary (len={len(text)}): {text!r}")
    return text if text else ""


def _ranked_videos_in_zip(data: dict, zip_val: str) -> list[dict]:
    """All videos in this zip as list of { llm_response, filename, score, user }; score = rank index (0=best). Sorted best first."""
    out = []
    for u in data.get("users", []):
        if u.get("zip") != zip_val:
            continue
        user_name = u.get("name", "")
        for v in u.get("videos", []) or []:
            entry = v if isinstance(v, dict) else {"filename": v, "llm_response": "", "score": 0}
            out.append({
                "filename": entry.get("filename", ""),
                "llm_response": entry.get("llm_response", ""),
                "score": entry.get("score", 0),
                "user": user_name,
            })
    out.sort(key=lambda x: x["score"])  # ascending: 0=best first
    return out


def _rerank_community_videos(
    data: dict,
    zip_val: str,
    new_entry: dict,
    insertion_index: int,
) -> None:
    """
    Re-rank all videos in this zip (community): insert the new video at the given
    rank index, then assign every video (across all users in the zip) its new
    score = its index in the combined list (0=best). Updates data["users"] in place.
    Every user in the zip gets their videos list updated with new scores, not just the uploader.
    """
    ranked = _ranked_videos_in_zip(data, zip_val)
    new_ranked = ranked[:insertion_index] + [new_entry] + ranked[insertion_index:]
    # Build per-user video lists with new scores (so every user in zip is updated)
    videos_by_user: dict[str, list[dict]] = {}
    for i, e in enumerate(new_ranked):
        uname = (e.get("user") or "").strip()
        if uname not in videos_by_user:
            videos_by_user[uname] = []
        videos_by_user[uname].append({
            "filename": e.get("filename", ""),
            "llm_response": e.get("llm_response", ""),
            "score": i,
        })
    # Assign updated videos to every user in this zip (by index so we mutate the right object)
    users = data.get("users", [])
    for i, u in enumerate(users):
        if (u.get("zip") or "").strip() != zip_val:
            continue
        uname = (u.get("name") or "").strip()
        users[i]["videos"] = videos_by_user.get(uname, [])


class UserBody(BaseModel):
    name: str
    zip: str


class SignInBody(BaseModel):
    name: str


class CommunityBody(BaseModel):
    name: str
    zip: str


@app.get("/")
def root():
    return goal_data


def load_json(file_name: str):
    with open(file_name, "r") as file:
        return json.load(file)


# --- Users & communities (info.json) - no auth ---

@app.post("/api/signin")
def signin(body: SignInBody):
    """Look up user by full name only; return user if found."""
    data = load_info()
    name = body.name.strip()
    if not name:
        raise HTTPException(status_code=400, detail="Name is required.")
    for u in data.get("users", []):
        if u.get("name") == name:
            return {"user": {"name": u["name"], "zip": u["zip"]}}
    raise HTTPException(status_code=404, detail="No account found with that name.")


@app.post("/api/user")
def create_user(body: UserBody):
    """Create account: name + zip, stored in info.json."""
    data = load_info()
    name, zip_code = body.name.strip(), body.zip.strip()
    if not name or not zip_code:
        raise HTTPException(status_code=400, detail="Name and zip code are required.")
    users = data.get("users", [])
    for u in users:
        if u.get("name") == name and u.get("zip") == zip_code:
            return {"user": {"name": u["name"], "zip": u["zip"]}}
    users.append({"name": name, "zip": zip_code, "videos": []})
    data["users"] = users
    save_info(data)
    return {"user": {"name": name, "zip": zip_code}}


@app.get("/api/communities")
def get_communities():
    data = load_info()
    return data.get("communities", [])


@app.post("/api/communities")
def add_community(body: CommunityBody):
    data = load_info()
    name, zip_code = body.name.strip(), body.zip.strip()
    if not name or not zip_code:
        raise HTTPException(status_code=400, detail="Name and zip code are required.")
    communities = data.get("communities", [])
    new_id = str(uuid.uuid4())
    new_community = {"id": new_id, "name": name, "zip": zip_code}
    communities.append(new_community)
    data["communities"] = communities
    save_info(data)
    return new_community


# --- Leaderboard (score = rank index 0=best; points = sum of 1000*(1/2^x), higher = better) ---

def _score_to_points(x: float) -> float:
    """Convert rank index x (0=best) to display points: 1000 * (1/2^x)."""
    return 1000 * (0.5 ** x)


def _video_points(videos):
    """Score is rank index (0=best) per video. Total points = sum of 1000*(1/2^score); higher = better."""
    if not isinstance(videos, list):
        return 0
    total = 0.0
    for e in videos:
        if isinstance(e, dict) and "score" in e:
            total += _score_to_points(e.get("score", 0))
        else:
            total += _score_to_points(0)
    return round(total, 1)


def _latest_video_filename(videos):
    """Get filename of the most recent video (last in list)."""
    if not isinstance(videos, list) or not videos:
        return None
    last = videos[-1]
    if isinstance(last, str):
        return last
    return last.get("filename") or None


def _best_video_filename(videos):
    """Get filename of the highest-ranking video (lowest score = best rank)."""
    if not isinstance(videos, list) or not videos:
        return None
    best = min(
        videos,
        key=lambda v: v.get("score", 0) if isinstance(v, dict) else 0,
    )
    if isinstance(best, str):
        return best
    return best.get("filename") or None


@app.get("/api/leaderboard")
def get_leaderboard(zip_code: str = Query("", alias="zip")):
    """Leaderboard for a zip: users in that zip. Points = sum of 1000*(1/2^score); includes best video per user."""
    data = load_info()  # fresh read from disk every time
    zip_val = zip_code.strip()
    entries = []
    for u in data.get("users", []):
        if u.get("zip") != zip_val:
            continue
        videos = u.get("videos", []) or []
        count = len(videos)
        points = _video_points(videos)
        best_video = _best_video_filename(videos)  # highest-ranking (lowest score) video
        entries.append({
            "id": f"{u.get('name', '')}_{u.get('zip', '')}",
            "name": u.get("name", ""),
            "deedCount": count,
            "points": points,
            "latestVideoFilename": best_video,  # API key unchanged; value is now best video
        })
    entries.sort(key=lambda x: x["points"], reverse=True)  # higher points = better
    return JSONResponse(
        content={"leaderboard": entries},
        headers={"Cache-Control": "no-store, no-cache, must-revalidate"},
    )


@app.get("/api/community/videos")
def get_community_videos(zip_code: str = Query("", alias="zip")):
    """All videos from users in this zip, flattened and sorted by score (rank index: 0=best first)."""
    data = load_info()
    zip_val = zip_code.strip()
    flat = []
    for u in data.get("users", []):
        if u.get("zip") != zip_val:
            continue
        name = u.get("name", "")
        for entry in u.get("videos", []) or []:
            if isinstance(entry, str):
                flat.append({"userName": name, "filename": entry, "score": 0, "llm_response": ""})
            else:
                flat.append({
                    "userName": name,
                    "filename": entry.get("filename", ""),
                    "score": entry.get("score", 0),
                    "llm_response": entry.get("llm_response", ""),
                })
    flat.sort(key=lambda x: x["score"])  # ascending: 0=best first
    return {"videos": flat}


# --- User profile videos (stored per user in info.json, files in uploads/) ---

ALLOWED_VIDEO = {"video/mp4", "video/webm", "video/quicktime"}


def _normalize_video_entry(entry):
    """Convert legacy string entry or dict to { filename, llm_response, score }."""
    if isinstance(entry, str):
        return {"filename": entry, "llm_response": "", "score": 0}
    return {
        "filename": entry.get("filename", ""),
        "llm_response": entry.get("llm_response", ""),
        "score": entry.get("score", 0),
    }


@app.get("/api/user/videos")
def get_user_videos(
    name: str = Query(""),
    zip_code: str = Query("", alias="zip"),
):
    """Return list of video entries { filename, llm_response } for the given user."""
    data = load_info()
    name, zip_code = name.strip(), zip_code.strip()
    for u in data.get("users", []):
        if u.get("name") == name and u.get("zip") == zip_code:
            raw = u.get("videos", [])
            videos = [_normalize_video_entry(e) for e in raw]
            return {"videos": videos}
    return {"videos": []}


@app.post("/api/user/videos")
async def upload_user_video(
    name: str = Form(...),
    zip_code: str = Form(..., alias="zip"),
    file: UploadFile = File(...),
):
    """Upload a video for the user; store file in uploads/ and add filename to user's videos in info.json."""
    if file.content_type not in ALLOWED_VIDEO:
        raise HTTPException(
            status_code=400,
            detail="Only video files (e.g. mp4, webm) are allowed.",
        )
    data = load_info()
    name_val, zip_val = name.strip(), zip_code.strip()
    user_index = None
    for i, u in enumerate(data.get("users", [])):
        if u.get("name") == name_val and u.get("zip") == zip_val:
            user_index = i
            break
    if user_index is None:
        raise HTTPException(status_code=404, detail="User not found.")
    ext = os.path.splitext(file.filename or "video")[1] or ".mp4"
    filename = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(UPLOAD_DIR, filename)
    with open(path, "wb") as f:
        content = await file.read()
        f.write(content)
    try:
        print(f"[Upload] Calling get_good_deed_summary for {path!r}")
        llm_response = get_good_deed_summary(path)
        if not llm_response:
            print("[Upload] get_good_deed_summary returned empty string")
            llm_response = ""
        else:
            print(f"[Upload] LLM response received: {llm_response!r}")
    except Exception as e:
        import traceback
        print(f"[Upload] get_good_deed_summary failed: {e!r}")
        traceback.print_exc()
        llm_response = ""
    ranked = _ranked_videos_in_zip(data, zip_val)
    idx = _rank_index_for_new_summary(llm_response, ranked)
    new_entry = {"filename": filename, "llm_response": llm_response, "user": name_val}
    _rerank_community_videos(data, zip_val, new_entry, idx)
    save_info(data)
    score = idx
    return {"filename": filename, "llm_response": llm_response, "score": score}


@app.get("/api/videos/{filename}")
def serve_video(filename: str):
    """Serve a video file by filename (only from uploads/)."""
    path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.isfile(path):
        raise HTTPException(status_code=404, detail="Video not found.")
    return FileResponse(path, media_type="video/mp4")


@app.get("/api/goals")
def get_goals():
    return load_json('goals.json')


@app.post("/api/chat")
def get_message(body: dict):
    message = body.get("message", "")
    chat_response = LLM_chat_response(message)
    return {"response": chat_response}

@app.post("/api/logs")
def get_log(body: dict):
    message = body.get("message", "")
    log_response = LLM_log_response(message)
    return {"response": log_response}

def LLM_chat_response(message: str):
    input = message
    return "LLM chat response"

def LLM_log_response(message: str):
    input = message
    update_goals(input) # LLM updates goals files with new info. if all info is gotten from user, renders the flow page again

    if input == "locked" or input == "unlocked" or input == "complete":
        return "logs updated"

    return "LLM log response"

def update_goals(input: str):
    goals = load_json('goals.json')
    goals['status'] = input
    with open('goals.json', 'w') as file:
        json.dump(goals, file, indent=4)







