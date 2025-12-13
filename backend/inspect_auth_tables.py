from sqlalchemy import create_engine, inspect, text
import os

db_path = "todo.db"
engine = create_engine(f"sqlite:///{db_path}")

# Check all tables and their schemas
inspector = inspect(engine)
tables = ['user', 'account', 'session']

for table in tables:
    if table in inspector.get_table_names():
        print(f"\n=== {table.upper()} TABLE ===")
        print("Columns:")
        for col in inspector.get_columns(table):
            nullable = "NULL" if col['nullable'] else "NOT NULL"
            print(f"  - {col['name']:20s} {str(col['type']):15s} {nullable}")
        
        # Count rows
        with engine.connect() as conn:
            result = conn.execute(text(f"SELECT COUNT(*) FROM {table}"))
            count = result.scalar()
            print(f"Row count: {count}")
            
            # Show sample rows if any
            if count > 0 and count < 5:
                result = conn.execute(text(f"SELECT * FROM {table} LIMIT 5"))
                print("Sample rows:")
                for row in result:
                    print(f"  {dict(row._mapping)}")
    else:
        print(f"\n{table.upper()} table not found")
