---
name: Delete Task
description: A skill for deleting an existing task from a user's todo list.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to permanently remove a task from their todo list via the application's interface.
-   You need to programmatically remove a task (e.g., for cleanup, testing).

## Process Steps

1.  **User Action (Frontend):** The user identifies a task they wish to delete and triggers the delete action (e.g., clicks a "delete" button or trash icon).
2.  **API Call (Frontend to Backend):** The frontend client constructs and sends an authenticated `DELETE` request to the `/api/v1/tasks/{task_id}` endpoint, where `{task_id}` is the unique identifier of the task to be deleted.
3.  **Request Reception (Backend):** The FastAPI backend receives the `DELETE` request.
4.  **Authorization & Deletion Logic (Backend):**
    *   The backend extracts the `task_id` from the URL path.
    *   It verifies that the authenticated `user_id` (from the JWT token) is authorized to delete this specific task (i.e., the task belongs to the user).
    *   If authorized, the backend removes the corresponding task record from the database.
5.  **Response (Backend to Frontend):** If the deletion is successful, the backend returns a `204 No Content` HTTP status code, indicating that the request was processed successfully and there is no content to return.
6.  **UI Update (Frontend):** The frontend receives the successful `204` response and removes the deleted task's representation from the displayed task list, updating the UI accordingly.

## Output Format

The specified task is successfully removed from the application's database and is no longer displayed in the user's task list in the UI.

### Example API Request (Frontend to Backend)

```http
DELETE /api/v1/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef
Authorization: Bearer <user_jwt_token>
```

### Example API Response (Backend to Frontend)

```http
HTTP/1.1 204 No Content
```
