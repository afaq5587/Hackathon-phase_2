import os
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt # Import jwt from jose
from sqlmodel import Session, select

from src.models.user import User
from src.db import get_session # This will be created later

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token") # Updated tokenUrl

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET") # Get secret from environment

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not BETTER_AUTH_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Better Auth secret not configured",
        )
    try:
        payload = jwt.decode(token, BETTER_AUTH_SECRET, algorithms=["HS256"]) # Use Better Auth secret and algorithm
        user_id: str = payload.get("sub") # Assuming 'sub' contains the user ID
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.exec(select(User).where(User.id == int(user_id))).first() # Assuming user ID is integer in DB
    if user is None:
        raise credentials_exception
    return user