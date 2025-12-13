import sqlite3

def check_tables():
    try:
        conn = sqlite3.connect('todo.db')
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print("Tables found:", [t[0] for t in tables])
        
        # Determine if we have columns for User
        cursor.execute("PRAGMA table_info(user)")
        columns = cursor.fetchall()
        print("User columns:", [c[1] for c in columns])

        cursor.execute("PRAGMA table_info(session)")
        columns = cursor.fetchall()
        print("Session columns:", [c[1] for c in columns])

        cursor.execute("PRAGMA table_info(task)")
        columns = cursor.fetchall()
        print("Task columns:", [c[1] for c in columns])
        
        conn.close()
        
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_tables()
