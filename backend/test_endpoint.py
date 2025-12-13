import requests

# Test the backend endpoint
try:
    response = requests.get("http://127.0.0.1:8000/api/v1/tasks/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
