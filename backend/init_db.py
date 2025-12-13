from sqlmodel import SQLModel
from src.db import engine
from src.models import user, task  # Import models to register them

def init_db():
    print("Creating tables...")
    SQLModel.metadata.create_all(engine)
    print("Tables created.")

if __name__ == "__main__":
    init_db()
