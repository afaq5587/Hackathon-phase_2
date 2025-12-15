from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.db import get_session
from src.api import tasks # Import the tasks router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001", "https://fullstack-blue-kappa.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the tasks router
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

# The /token and /register endpoints will be replaced by Better Auth integration
