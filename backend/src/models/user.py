from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)


class UserCreate(UserBase):
    password: str


class User(UserBase, table=True):
    id: str = Field(primary_key=True) # Changed to String for Better Auth compatibility
    # hashed_password: str # Removed as Better Auth will handle this externally

    tasks: List["Task"] = Relationship(back_populates="user")

# For responses, exclude hashed_password (no longer applicable)
class UserResponse(UserBase):
    id: str
