import os
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from sqlmodel import Session, select, SQLModel, Field

from src.models.user import User
from src.db import get_session # This will be created later

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token") # Updated tokenUrl

BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET") # Get secret from environment

from datetime import datetime, timezone

# Define a minimal Session model to map to the existing 'session' table
class SessionModel(SQLModel, table=True):
    __tablename__ = "session"
    id: str = Field(primary_key=True)
    token: str
    userId: str
    expiresAt: datetime

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # 1. Lookup session in DB
    # Note: Use 'expiresAt' check.
    session_record = db.exec(select(SessionModel).where(SessionModel.token == token)).first()
    
    if not session_record:
        # Debugging: Print received token if needed, or just fail
        print(f"DEBUG: Token not found in DB: {token}")
        raise credentials_exception

    # 2. Check Expiry
    # Ensure robust comparison by converting to timestamps (floats)
    current_time = datetime.now(timezone.utc).timestamp()
    expiry_time = session_record.expiresAt.timestamp()
    
    if expiry_time < current_time:
        print(f"DEBUG: Session expired. Expiry: {session_record.expiresAt} ({expiry_time}), Now: {current_time}")
        raise credentials_exception

    # 3. Fetch User
    user = db.exec(select(User).where(User.id == session_record.userId)).first()
    if user is None:
        raise credentials_exception
        
    return user