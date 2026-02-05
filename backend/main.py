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

@app.get("/")
def root():
    return {"Hello World"}
