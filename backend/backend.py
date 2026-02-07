
# """
# Gemini API boilerplate for video understanding.
# Takes a .MOV file and returns a 2-sentence summary of the good deed in the video.
# Stores each video under a username in a single JSON file, in rank order (best first).
# Ranking uses Groq to compare summaries; at most 5 comparisons then a guess.
# """


# import json
# import os
# import re
# import time
# from pathlib import Path

# from dotenv import load_dotenv

# # Load .env.local / .env from backend dir (no hardcoded API keys)
# _env_local = Path(__file__).resolve().parent / ".env.local"
# _env = Path(__file__).resolve().parent / ".env"
# if _env_local.exists():
#     load_dotenv(_env_local)
# if _env.exists():
#     load_dotenv(_env)

# from google import genai
# from google.genai.types import FileState
# from groq import Groq


# # Where to store users + videos (one JSON file), stored in rank order per user
# DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vids_data.json")

# # API keys from environment only (set in backend/.env.local or env vars)
# GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
# GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "").strip()


# GROQ_MODEL = "llama-3.3-70b-versatile"
# COMPARE_PROMPT = """You are comparing two good deeds (short summaries). Which good deed is better—more impactful, kinder, or more commendable? more=better
# Reply with exactly one word: A or B or SAME.
# A: {summary_a}
# B: {summary_b}"""
# GUESS_INDEX_PROMPT = """These good deed summaries are ranked from best to worst (first = best):
# {ranked_list}
# New summary to place: {new_summary}
# At which index should the new one be inserted? 0 = best, {max_i} = worst. Reply with only a single integer."""


# GOOD_DEED_PROMPT = (
#     "Based on this video create a summary (2 sentence max) of the good deed the user did. "
#     'For example: "They gave 10 meals to 10 different homeless people." or "They recycled 5 metal cans."'
# )




# def _wait_for_file_active(
#     client: genai.Client,
#     file_name: str,
#     poll_interval: float = 2.0,
#     timeout: float = 300.0,
# ):
#     """Poll until the uploaded file is in ACTIVE state (required before generate_content). Returns the file."""
#     deadline = time.monotonic() + timeout
#     while time.monotonic() < deadline:
#         myfile = client.files.get(name=file_name)
#         state = getattr(myfile, "state", None)
#         if state == FileState.ACTIVE:
#             return myfile
#         if state == FileState.FAILED:
#             raise RuntimeError(f"File processing failed: {file_name}")
#         time.sleep(poll_interval)
#     raise TimeoutError(f"File did not become ACTIVE within {timeout}s: {file_name}")




# def _load_data() -> dict:
#     """Load users/videos from the JSON file. Build by_zip so all videos in same zip are ranked together."""
#     if not os.path.exists(DATA_FILE):
#         return {"users": [], "by_zip": {}}
#     with open(DATA_FILE, "r", encoding="utf-8") as f:
#         data = json.load(f)
#     # Migrate old dict format to list format
#     if isinstance(data.get("users"), dict):
#         data["users"] = [
#             {"name": name, "zip": "", "videos": [{"filename": os.path.basename(v.get("video_path", "")), "llm_response": v.get("summary", v.get("llm_response", "")), "score": i} for i, v in enumerate(entries)]}
#             for name, entries in data["users"].items()
#         ]
#     # Ensure videos sorted by score (0 = best)
#     for u in data.get("users", []):
#         u["videos"] = sorted(u.get("videos", []), key=lambda x: x.get("score", 0))
#     # Build by_zip: one list per zip (all videos in that zip). Order: first user's videos in order, then next user's, etc.
#     data["by_zip"] = {}
#     for u in data.get("users", []):
#         z = u.get("zip", "")
#         if z not in data["by_zip"]:
#             data["by_zip"][z] = []
#         for v in u.get("videos", []):
#             data["by_zip"][z].append({
#                 "filename": v.get("filename", ""),
#                 "llm_response": v.get("llm_response", ""),
#                 "user": u["name"],
#             })
#     return data




# def _save_data(data: dict) -> None:
#     """Save users/videos from by_zip. score = index in zip list (0 is best)."""
#     # Rebuild each user's videos from by_zip (only their entries, score = index in zip list)
#     for u in data.get("users", []):
#         z = u.get("zip", "")
#         u["videos"] = []
#         for i, e in enumerate(data.get("by_zip", {}).get(z, [])):
#             if e.get("user") == u["name"]:
#                 u["videos"].append({
#                     "filename": e["filename"],
#                     "llm_response": e["llm_response"],
#                     "score": i,
#                 })
#     out = {"users": []}
#     for u in data.get("users", []):
#         out["users"].append({"name": u["name"], "zip": u.get("zip", ""), "videos": u["videos"]})
#     with open(DATA_FILE, "w", encoding="utf-8") as f:
#         json.dump(out, f, indent=2)




# def _groq_client() -> Groq:
#     return Groq(api_key=GROQ_API_KEY)




# def _compare_good_deeds(summary_a: str, summary_b: str) -> str:
#     """Returns 'A' if first is better, 'B' if second, 'SAME' if equal."""
#     client = _groq_client()
#     prompt = COMPARE_PROMPT.format(
#         summary_a=summary_a.strip(), summary_b=summary_b.strip()
#     )
#     r = client.chat.completions.create(
#         messages=[{"role": "user", "content": prompt}],
#         model=GROQ_MODEL,
#         max_tokens=10,
#     )
#     raw = (r.choices[0].message.content or "").strip().upper()
#     if "A" in raw and "B" not in raw[:2]:
#         return "A"
#     if "B" in raw:
#         return "B"
#     return "SAME"




# def _rank_index_for_new_summary(new_summary: str, ranked_entries: list[dict]) -> int:
#     """
#     Find insertion index (0 = best). Compare with throne first; if not beat,
#     binary-search the rest. Max 5 comparisons total, then use current position.
#     """
#     MAX_COMPARISONS = 5
#     if not ranked_entries:
#         print("[rank] No existing entries -> final index: 0")
#         return 0
#     summaries = [e.get("llm_response") or e.get("summary") or "" for e in ranked_entries]
#     n = len(summaries)


#     # 1. Compare with throne (rank 0)
#     result = _compare_good_deeds(new_summary, summaries[0])
#     print(f"[rank] Compare 1: NEW vs throne (rank 1) -> {result}")
#     if result == "A":
#         print(f"[rank] Final index: 0 (new #1)")
#         return 0
#     count = 1
#     if n == 1:
#         print(f"[rank] Final index: 1 (only throne above)")
#         return 1


#     # 2. Binary search in [1, n) for insertion point (smallest i s.t. NEW beats rank i+1, or n)
#     lo, hi = 1, n
#     while lo < hi and count < MAX_COMPARISONS:
#         mid = (lo + hi) // 2
#         result = _compare_good_deeds(new_summary, summaries[mid])
#         count += 1
#         print(f"[rank] Compare {count}: NEW vs middle rank {mid + 1} -> {result}")
#         if result == "A":
#             hi = mid  # NEW beats this one, could be higher
#         else:
#             lo = mid + 1  # NEW doesn't beat this one, must be lower
#     idx = lo
#     if count >= MAX_COMPARISONS and lo < hi:
#         print(f"[rank] Hit {MAX_COMPARISONS} max comparisons -> using index {idx}")
#     print(f"[rank] Final index: {idx}")
#     return idx




# def _get_or_create_user(data: dict, name: str, zip_code: str) -> dict:
#     """Get user by name from users list, or append new one. Updates zip if provided."""
#     if "users" not in data:
#         data["users"] = []
#     for u in data["users"]:
#         if u["name"] == name:
#             if zip_code:
#                 u["zip"] = zip_code
#             return u
#     u = {"name": name, "zip": zip_code or "", "videos": []}
#     data["users"].append(u)
#     return u




# def summarize_good_deed(video_path: str, username: str | None = None, zip_code: str | None = None) -> str:
#     """
#     Upload a .MOV (or other video) to Gemini and get a 2-sentence max
#     summary of the good deed shown in the video.
#     If username is given, the video is stored under that user (with optional zip) in vids_data.json.
#     """
#     client = genai.Client(api_key=GEMINI_API_KEY)
#     myfile = client.files.upload(file=video_path)
#     file_name = (
#         myfile.name if hasattr(myfile, "name") else getattr(myfile, "file_name", None)
#     )
#     if not file_name:
#         file_name = str(myfile)  # fallback
#     myfile = _wait_for_file_active(client, file_name)
#     response = client.models.generate_content(
#         model="gemini-2.5-flash",
#         contents=[myfile, GOOD_DEED_PROMPT],
#     )
#     text = response.text or ""
#     print(text)


#     if username:
#         data = _load_data()
#         user = _get_or_create_user(data, username, zip_code or "")
#         z = user.get("zip", "")
#         if "by_zip" not in data:
#             data["by_zip"] = {}
#         if z not in data["by_zip"]:
#             data["by_zip"][z] = []
#         ranked = data["by_zip"][z]  # all videos in this zip (any user), rank order
#         filename = os.path.basename(video_path)
#         entry = {"filename": filename, "llm_response": text, "user": username}
#         if not ranked:
#             ranked.append(entry)
#             print("[rank] First video in this zip -> final index: 0")
#         else:
#             idx = _rank_index_for_new_summary(text, ranked)
#             ranked.insert(idx, entry)
#         _save_data(data)
#         print(f"[rank] Rankings for zip {z!r}:")
#         for r, e in enumerate(data["by_zip"][z], start=1):
#             print(f"  {r}. {e['filename']} ({e['user']}) (score={r - 1})")
#             print(f"     {e['llm_response']}")


#     return text




# if __name__ == "__main__":
#     import sys


#     if len(sys.argv) < 2:
#         print("Usage: python vids.py <path/to/video.MOV> [username] [zip]")
#         sys.exit(1)
#     path = sys.argv[1]
#     user = sys.argv[2] if len(sys.argv) > 2 else None
#     zip_code = sys.argv[3] if len(sys.argv) > 3 else None
#     summarize_good_deed(path, user, zip_code)
