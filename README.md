# R U Kind

A community app for sharing and celebrating good deeds. Users upload short videos of their actions (e.g. recycling, helping others, using public transport), and AI analyzes each video to summarize the deed and rank impact. Communities and leaderboards encourage local participation.

**Tagline:** *Best deeds in your community: sustainability and kindness, together.*

---

## Features

- **Onboarding** – Enter your name and zip to join; you’re matched with communities by location.
- **Communities** – Browse and join communities by zip. Each community has a leaderboard and a feed of good deeds.
- **Profile** – Upload good-deed videos. Each video gets an **AI Analysis** summary and an **Impact Score** (AI-ranked). Your best video is used for the leaderboard.
- **Leaderboard** See top contributors in a community by overall points. Tap a user to view their best video and impact description (no per-video score in the modal).
- **Deed feed** – Scroll through recent good deeds from the community.

---

## Tech stack

| Part      | Stack |
|----------|--------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| Backend  | FastAPI (Python), Uvicorn |
| AI       | Google Gemini (video understanding), Groq (comparing good deeds for ranking) |

Data is stored in JSON files under the backend (`info.json` for users/communities/videos, `goals.json` for optional goals). Video files are stored in `backend/uploads/` (excluded from git via `.gitignore`).

---

## Setup

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # or: .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Create `backend/.env.local` (or set environment variables) with:

- `GEMINI_API_KEY` – Google AI (Gemini) API key for video analysis.
- `GROQ_API_KEY` – Groq API key for the comparison model used in ranking.

Run the API:

```bash
cd backend
python3 -m uvicorn main:app --reload
```

API base: `http://localhost:8000` (CORS is set for `http://localhost:3000`).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:3000`.

### 3. From repo root

```bash
npm run dev    # runs frontend dev server
# Run backend separately in another terminal (see above).
```

---

## Project layout

```
UHACCS/
├── README.md           # This file
├── package.json        # Root scripts (dev, build, start, lint)
├── backend/
│   ├── main.py         # FastAPI app: users, communities, videos, Gemini/Groq pipeline
│   ├── info.json       # Users, communities, video metadata (created if missing)
│   ├── goals.json      # Optional goals data
│   ├── requirements.txt
│   └── uploads/        # Uploaded videos (gitignored)
└── frontend/
    ├── app/            # Next.js App Router
    │   ├── page.tsx    # Home → user form or communities
    │   ├── user-form.tsx
    │   ├── communities.tsx
    │   ├── profile.tsx
    │   ├── Leaderboard.tsx
    │   ├── deedFeed.tsx
    │   └── layout.tsx, globals.css, etc.
    ├── lib/            # api.ts, storage.ts
    └── package.json
```

---

## License

Private / unlicensed unless otherwise specified.
