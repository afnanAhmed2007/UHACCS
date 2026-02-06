from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# command to run the server: python3 -m uvicorn main:app --reload

app = FastAPI()

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

@app.get("/")
def root():
    return goal_data;
