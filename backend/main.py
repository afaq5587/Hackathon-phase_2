from datetime import timedelta
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.db import get_session
from src.models.user import User, UserCreate, UserResponse # Updated import
from src.services.auth import get_password_hash
from src.services.auth_service import authenticate_user, create_user_access_token
from src.api import tasks # Import the tasks router

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

# Include the tasks router
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_session)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_user_access_token(user)
    return {"access_token": access_token, "token_type": "bearer", "user": {"email": user.email, "id": user.id}} # Updated response

@app.post("/register", response_model=UserResponse) # Updated response model
def register_user(user_create: UserCreate, db: Session = Depends(get_session)): # Updated parameter
    existing_user = db.exec(select(User).where(User.email == user_create.email)).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    hashed_password = get_password_hash(user_create.password) # Use password from UserCreate
    db_user = User(email=user_create.email, hashed_password=hashed_password) # Create User object
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user