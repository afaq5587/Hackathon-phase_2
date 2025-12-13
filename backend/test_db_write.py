import sqlite3
import time
import os

db_path = "todo.db"
print(f"Testing write to {os.path.abspath(db_path)}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Check if we can write
    # We'll insert a dummy user with a random ID to avoid collision
    import uuid
    uid = str(uuid.uuid4())
    cursor.execute("INSERT INTO user (id, name, email, emailVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", 
                   (uid, 'Test User', f'test_{uid}@example.com', 0, '2025-01-01', '2025-01-01'))
    conn.commit()
    print("Write SUCCESS")
    
    # Clean up
    cursor.execute("DELETE FROM user WHERE id = ?", (uid,))
    conn.commit()
    print("Cleanup SUCCESS")
    conn.close()
except Exception as e:
    print(f"Write FAILED: {e}")
