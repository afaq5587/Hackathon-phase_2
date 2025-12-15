import sqlite3
import datetime

def list_sessions():
    conn = sqlite3.connect('todo.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM session")
    rows = cursor.fetchall()
    print("Sessions:")
    for row in rows:
        print(row)
        # Assuming expiresAt is one of the columns, let's try to identify it
        # Based on schema check, we can guess.
    
    # Also get column names
    cursor.execute("PRAGMA table_info(session)")
    cols = cursor.fetchall()
    print("Columns:", [c[1] for c in cols])
    conn.close()

if __name__ == "__main__":
    list_sessions()
