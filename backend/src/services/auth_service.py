from datetime import timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from src.db import get_session
from src.models.user import User
from src.services.auth import verify_password, create_access_token

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Should be loaded from .env


def authenticate_user(db: Session, email: str, password: str):
    user = db.exec(select(User).where(User.email == email)).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_user_access_token(user: User):
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return access_token
