import sqlite3
from datetime import datetime, timezone

db_path = "todo.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get the most recent user
cursor.execute("SELECT id, email, name, createdAt FROM user ORDER BY createdAt DESC LIMIT 5")
users = cursor.fetchall()

print("Recent users:")
for user in users:
    print(f"  ID: {user[0]}, Email: {user[1]}, Name: {user[2]}, Created: {user[3]}")

# Check if there's an account for the first user
if users:
    user_id = users[0][0]
    cursor.execute("SELECT id, providerId, password FROM account WHERE userId = ? LIMIT 1", (user_id,))
    account = cursor.fetchone()
    if account:
        print(f"\nAccount found for user {user_id}:")
        print(f"  Account ID: {account[0]}, Provider: {account[1]}, Has Password: {account[2] is not None}")
    else:
        print(f"\nNo account found for user {user_id}")
    
    # Check sessions
    cursor.execute("SELECT id, token, expiresAt FROM session WHERE userId = ? ORDER BY expiresAt DESC LIMIT 3", (user_id,))
    sessions = cursor.fetchall()
    if sessions:
        print(f"\nSessions for user {user_id}:")
        for sess in sessions:
            print(f"  Session ID: {sess[0]}, Token: {sess[1][:20]}..., Expires: {sess[2]}")
    else:
        print(f"\nNo sessions found for user {user_id}")

conn.close()
