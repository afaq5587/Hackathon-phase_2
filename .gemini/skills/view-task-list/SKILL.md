---
name: View Task List
description: A skill for retrieving and displaying a user's list of tasks.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user navigates to the main task dashboard or view of the application.
-   The application needs to refresh the list of tasks after an operation like adding, updating, or deleting.

## Process Steps

1.  **Page Load/Trigger (Frontend):** The user loads the page dedicated to displaying tasks, or an action triggers a data refresh.
2.  **API Call (Frontend to Backend):** The frontend client sends an authenticated `GET` request to the `/api/v1/tasks` endpoint. This request may include query parameters for filtering, sorting, or pagination in more advanced scenarios.
3.  **Request Reception (Backend):** The FastAPI backend receives the `GET` request.
4.  **Authorization (Backend):** The backend identifies the authenticated `user_id` from the JWT token in the request headers.
5.  **Database Interaction (Backend to DB):** The backend queries the database for all task records where the `user_id` matches the authenticated user's ID.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code with a JSON array of task objects in the response body. If the user has no tasks, it returns an empty array.
7.  **UI Rendering (Frontend):** The frontend receives the array of tasks, stores it in its local state, and iterates through the array to render each task in the UI.

## Output Format

A list of the user's tasks is displayed in the application's UI.

### Example API Request

```http
GET /api/v1/tasks
Authorization: Bearer <user_jwt_token>
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Buy fresh milk",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "due_date": "2025-12-16T10:00:00Z",
    "completed": false,
    "user_id": "user-uuid-123",
    "created_at": "2025-12-15T11:25:00Z",
    "updated_at": "2025-12-15T11:27:00Z"
  },
  {
    "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
    "title": "Finish weekly report",
    "description": "Complete the Q4 sales report.",
    "priority": "medium",
    "due_date": "2025-12-18T17:00:00Z",
    "completed": false,
    "user_id": "user-uuid-123",
    "created_at": "2025-12-14T09:00:00Z",
    "updated_at": "2025-12-14T09:00:00Z"
  }
]
```
