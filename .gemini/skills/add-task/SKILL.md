---
name: Add Task
description: A skill for creating a new task for a user in the full-stack todo application.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to add a new item to their personal todo list via the application's interface.
-   You need to programmatically create a task for a user (e.g., for testing, data seeding).

## Process Steps

1.  **User Input (Frontend):** The user provides the task details (e.g., title, description) through the application's UI.
2.  **API Call (Frontend to Backend):** The frontend client constructs and sends an authenticated `POST` request to the `/api/v1/tasks` endpoint. The request body includes the task's `title` and any other relevant fields (e.g., `description`, `due_date`, `priority`), and implicitly includes the `user_id` from the authentication token.
3.  **Request Reception (Backend):** The FastAPI backend receives the `POST` request.
4.  **Data Validation & Processing (Backend):** The backend validates the incoming task data against its defined `TaskCreate` schema (e.g., Pydantic model). It extracts the authenticated `user_id` from the request context.
5.  **Database Interaction (Backend to DB):** The backend uses SQLModel to create a new `Task` record in the database, associating it with the authenticated `user_id`.
6.  **Response (Backend to Frontend):** The backend returns a `201 Created` HTTP status code along with the newly created task object (including its generated `id` and other default fields) in the response body.
7.  **UI Update (Frontend):** The frontend receives the successful response, adds the new task object to its local state, and updates the displayed task list to include the newly added task.

## Output Format

A new task is successfully created in the application's database and is reflected in the user's task list in the UI.

### Example API Request (Frontend to Backend)

```http
POST /api/v1/tasks
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "due_date": "2025-12-16T10:00:00Z"
}
```

### Example API Response (Backend to Frontend)

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "due_date": "2025-12-16T10:00:00Z",
  "completed": false,
  "user_id": "user-uuid-123",
  "created_at": "2025-12-15T11:25:00Z",
  "updated_at": "2025-12-15T11:25:00Z"
}
```
