---
name: Update Task
description: A skill for modifying an existing task in the full-stack todo application.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to edit the details of an existing task (e.g., changing its title, description, due date, or priority).
-   You need to programmatically update a task's properties.

## Process Steps

1.  **User Action (Frontend):** The user selects a task and enters an "edit mode" to change its properties.
2.  **API Call (Frontend to Backend):** The frontend client constructs and sends an authenticated `PUT` or `PATCH` request to the `/api/v1/tasks/{task_id}` endpoint, where `{task_id}` is the identifier of the task being modified. The request body contains a JSON object with the fields to be updated.
3.  **Request Reception (Backend):** The FastAPI backend receives the request.
4.  **Authorization & Validation (Backend):**
    *   The backend verifies that the authenticated user is the owner of the task.
    *   The incoming data is validated against the appropriate schema (e.g., `TaskUpdate`).
5.  **Database Interaction (Backend to DB):** The backend finds the corresponding task in the database and updates its fields with the new values provided in the request.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code along with the full, updated task object.
7.  **UI Update (Frontend):** The frontend receives the updated task object and updates its local state, causing the UI to re-render with the new task information.

## Output Format

The specified task is successfully updated in the application's database, and the changes are reflected in the UI.

### Example API Request (PATCH to update only the title)

```http
PATCH /api/v1/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "title": "Buy fresh milk"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

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
}
```
