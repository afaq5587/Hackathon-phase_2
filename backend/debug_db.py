from sqlalchemy import create_engine, inspect
import os

db_path = "todo.db"
output_file = "db_schema.txt"

with open(output_file, "w") as f:
    if not os.path.exists(db_path):
        f.write(f"Database file {db_path} not found!")
    else:
        engine = create_engine(f"sqlite:///{db_path}")
        inspector = inspect(engine)
        if 'user' in inspector.get_table_names():
            f.write("User table columns and types:\n")
            for col in inspector.get_columns('user'):
                f.write(f"- {col['name']} ({col['type']}) Nullable: {col['nullable']}\n")
        else:
            f.write("User table DOES NOT exist")
