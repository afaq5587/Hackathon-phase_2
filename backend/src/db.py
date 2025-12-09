import os
from typing import Generator

from sqlmodel import create_engine, Session
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Configure connection pooling
# These values are examples and might need tuning based on Neon's recommendations
# and application load.
# Neon often handles pooling externally with PgBouncer, but for direct connections,
# SQLAlchemy's internal pooling can be configured.
engine = create_engine(
    DATABASE_URL, 
    echo=True,
    pool_size=10,        # Max number of connections in the pool
    max_overflow=10,     # Max number of connections that can be opened beyond pool_size
    pool_recycle=3600    # Recycle connections after 1 hour to prevent stale connections
)


def get_session() -> Generator:
    with Session(engine) as session:
        yield session