---
name: Manage Task Tags
description: A skill for adding, removing, and viewing tags on a task for categorization.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to categorize a task by applying one or more descriptive tags (e.g., "work", "home", "urgent").
-   The application needs to display the tags associated with a task.

## Process Steps

1.  **User Action (Frontend):** The user interacts with a UI element to add a new tag, or remove an existing one from a task.
2.  **API Call (Frontend to Backend):** The frontend sends an authenticated `PATCH` request to `/api/v1/tasks/{task_id}`. The request body contains the `tags` field with the complete, updated array of tag strings.
3.  **Request Reception (Backend):** The FastAPI backend receives the `PATCH` request.
4.  **Authorization & Validation (Backend):**
    *   The backend verifies that the authenticated user owns the task.
    *   It validates that the `tags` field in the request is a list of strings.
5.  **Database Interaction (Backend to DB):** The backend finds the task and updates its `tags` field. This might be a JSON field or a related table in the database.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code along with the full, updated task object, including the new array of tags.
7.  **UI Update (Frontend):** The frontend receives the updated task and re-renders the UI to display the new set of tags on the task.

## Output Format

The task's `tags` are updated in the database, and the changes are displayed as part of the task in the UI.

### Example API Request (Setting tags for a task)

```http
PATCH /api/v1/tasks/f0e9d8c7-b6a5-4321-fedc-ba9876543210
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "tags": ["work", "reporting"]
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
  "title": "Finish weekly report",
  "description": "Complete the Q4 sales report.",
  "priority": "high",
  "tags": ["work", "reporting"],
  "due_date": "2025-12-18T17:00:00Z",
  "completed": true,
  "user_id": "user-uuid-123",
  "created_at": "2025-12-14T09:00:00Z",
  "updated_at": "2025-12-15T11:30:00Z"
}
```
