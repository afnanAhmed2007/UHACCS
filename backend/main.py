from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

# command to run the server: python3 -m uvicorn main:app --reload

app = FastAPI()

global INPUT 
global OUTPUT 

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

def load_json(file_name: str):
    with open(file_name, 'r') as file:
        data = json.load(file)
        return data

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







