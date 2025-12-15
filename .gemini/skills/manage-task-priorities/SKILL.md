---
name: Manage Task Priorities
description: A skill for setting and updating a task's priority level.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user assigns or changes the priority level of a task (e.g., "high", "medium", "low").
-   The application needs to visually distinguish tasks based on their importance.

## Process Steps

1.  **User Action (Frontend):** The user interacts with a UI element (e.g., a dropdown menu, a set of buttons) to select a new priority for a task.
2.  **API Call (Frontend to Backend):** The frontend sends an authenticated `PATCH` request to `/api/v1/tasks/{task_id}`. The request body contains the `priority` field with its new value (e.g., `"high"`).
3.  **Request Reception (Backend):** The FastAPI backend receives the `PATCH` request.
4.  **Authorization & Validation (Backend):**
    *   The backend verifies that the authenticated user owns the task.
    *   It validates the incoming data, ensuring the `priority` value is one of the predefined, allowed values (e.g., an Enum of "low", "medium", "high").
5.  **Database Interaction (Backend to DB):** The backend finds the task and updates its `priority` field with the new value.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code along with the full, updated task object.
7.  **UI Update (Frontend):** The frontend receives the updated task and modifies the task's appearance in the UI to reflect its new priority level (e.g., changing the color of a tag or border).

## Output Format

The task's `priority` is updated in the database, and the change is visually represented in the UI.

### Example API Request (Setting priority to "high")

```http
PATCH /api/v1/tasks/f0e9d8c7-b6a5-4321-fedc-ba9876543210
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "priority": "high"
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
  "due_date": "2025-12-18T17:00:00Z",
  "completed": true,
  "user_id": "user-uuid-123",
  "created_at": "2025-12-14T09:00:00Z",
  "updated_at": "2025-12-15T11:29:00Z"
}
```
