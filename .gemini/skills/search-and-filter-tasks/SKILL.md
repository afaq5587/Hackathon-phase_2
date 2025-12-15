---
name: Search and Filter Tasks
description: A skill for filtering the task list based on various criteria like keywords, status, priority, or tags.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to find specific tasks by typing a keyword into a search bar.
-   A user wants to narrow down their task list by applying filters (e.g., show only "high" priority tasks, or tasks with the "work" tag).

## Process Steps

1.  **User Action (Frontend):** The user interacts with search or filter UI elements. For example, they type "report" into a search box or select "high" from a priority filter dropdown.
2.  **API Call (Frontend to Backend):** The frontend detects the change in search/filter criteria and sends a new, authenticated `GET` request to the `/api/v1/tasks` endpoint. The criteria are appended as URL query parameters (e.g., `?q=report&priority=high&completed=false`).
3.  **Request Reception (Backend):** The FastAPI backend receives the `GET` request and parses the query parameters.
4.  **Authorization & DB Query (Backend):**
    *   The backend identifies the authenticated `user_id`.
    *   It constructs a dynamic database query that filters the user's tasks based on the provided parameters (e.g., using `LIKE` for keyword search, and equality checks for priority, status, etc.).
5.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code with a JSON array containing only the tasks that match the user's criteria.
6.  **UI Rendering (Frontend):** The frontend receives the filtered array of tasks and updates its state, causing the UI to display only the matching tasks.

## Output Format

The task list in the UI is dynamically updated to show only the subset of tasks that match the user's active search and filter criteria.

### Example API Request (Searching for tasks)

```http
GET /api/v1/tasks?q=report&priority=high
Authorization: Bearer <user_jwt_token>
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
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
]
```
