---
name: Mark Task as Complete
description: A skill for toggling the completion status of a task.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user checks or unchecks a task to mark it as complete or incomplete.
-   You need to programmatically change the completion status of a task.

## Process Steps

1.  **User Action (Frontend):** The user interacts with a UI element (e.g., a checkbox) to toggle the task's completion status.
2.  **API Call (Frontend to Backend):** The frontend determines the new completion state (e.g., `true` if it was `false`). It then sends an authenticated `PATCH` request to `/api/v1/tasks/{task_id}`. The request body contains only the `completed` field with its new value.
3.  **Request Reception (Backend):** The FastAPI backend receives the `PATCH` request.
4.  **Authorization & Validation (Backend):**
    *   The backend verifies that the authenticated user owns the task.
    *   It validates the incoming data, ensuring the `completed` field is a boolean.
5.  **Database Interaction (Backend to DB):** The backend finds the task and updates only the `completed` column with the new boolean value.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code along with the full, updated task object.
7.  **UI Update (Frontend):** The frontend receives the updated task and modifies the task's appearance in the UI to reflect its new completion status (e.g., adding a strikethrough, changing color).

## Output Format

The task's `completed` status is updated in the database and the change is visually represented in the user's task list.

### Example API Request (Marking a task as complete)

```http
PATCH /api/v1/tasks/f0e9d8c7-b6a5-4321-fedc-ba9876543210
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "completed": true
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
  "priority": "medium",
  "due_date": "2025-12-18T17:00:00Z",
  "completed": true,
  "user_id": "user-uuid-123",
  "created_at": "2025-12-14T09:00:00Z",
  "updated_at": "2025-12-15T11:28:00Z"
}
```
