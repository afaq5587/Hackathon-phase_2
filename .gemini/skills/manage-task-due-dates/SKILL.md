---
name: Manage Task Due Dates
description: A skill for setting, updating, and viewing a task's due date and time.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to assign a specific deadline to a task.
-   The application needs to display how much time is left for a task, or highlight overdue tasks.

## Process Steps

1.  **User Action (Frontend):** The user interacts with a "due date" field for a task, which typically opens a calendar or date-time picker widget. The user selects a date and optionally a time.
2.  **API Call (Frontend to Backend):** The frontend formats the selected date/time into a standard format (e.g., ISO 8601 UTC string). It then sends an authenticated `PATCH` request to `/api/v1/tasks/{task_id}` with the `due_date` field.
3.  **Request Reception (Backend):** The FastAPI backend receives the `PATCH` request.
4.  **Authorization & Validation (Backend):**
    *   The backend verifies that the authenticated user owns the task.
    *   It validates that the `due_date` string is a valid date-time format.
5.  **Database Interaction (Backend to DB):** The backend finds the task and updates its `due_date` field with the new value.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code along with the full, updated task object.
7.  **UI Update (Frontend):** The frontend receives the updated task and displays the formatted due date in the UI. It may also apply conditional styling, such as coloring the date red if it's past due.

## Output Format

The task's `due_date` is updated in the database, and the deadline is displayed clearly in the UI.

### Example API Request (Setting a due date)

```http
PATCH /api/v1/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "due_date": "2025-12-24T18:00:00Z"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Buy fresh milk",
  "due_date": "2025-12-24T18:00:00Z",
  ...
  "updated_at": "2025-12-15T11:33:00Z"
}
```
