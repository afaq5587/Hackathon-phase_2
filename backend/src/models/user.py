from typing import List, Optional
from datetime import datetime

from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)


class UserCreate(UserBase):
    password: str


class User(UserBase, table=True):
    id: str = Field(primary_key=True)
    name: Optional[str] = None
    emailVerified: bool = False
    image: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    
    tasks: List["Task"] = Relationship(back_populates="user")

# For responses, exclude hashed_password (no longer applicable)
class UserResponse(UserBase):
    id: str
