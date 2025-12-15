import os
from typing import Generator

from sqlmodel import create_engine, Session
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)
else:
    # Postgres configuration
    engine = create_engine(
        DATABASE_URL, 
        echo=False,
        pool_size=10,
        max_overflow=10,
        pool_recycle=3600
    )


def get_session() -> Generator:
    with Session(engine) as session:
        yield session