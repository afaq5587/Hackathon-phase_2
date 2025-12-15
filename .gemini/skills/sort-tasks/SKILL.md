---
name: Sort Tasks
description: A skill for sorting the displayed task list based on different fields like due date, priority, or title.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to re-order their list of tasks to view them in a more organized way (e.g., sorting by the soonest due date, by the highest priority, or alphabetically).

## Process Steps

1.  **User Action (Frontend):** The user selects a sorting option from a UI element, such as a dropdown menu (e.g., "Sort by: Due Date"). They might also select the sort direction (ascending/descending).
2.  **API Call (Frontend to Backend):** The frontend sends a new, authenticated `GET` request to the `/api/v1/tasks` endpoint. The sorting preference is included as query parameters (e.g., `?sort_by=due_date&order=asc`).
3.  **Request Reception (Backend):** The FastAPI backend receives the request and parses the sorting parameters.
4.  **Authorization & DB Query (Backend):**
    *   The backend identifies the authenticated `user_id`.
    *   It constructs a database query for the user's tasks, adding an `ORDER BY` clause based on the `sort_by` and `order` parameters. It includes default sorting (e.g., by creation date) if no parameters are provided.
5.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code with a JSON array containing the tasks, now ordered according to the user's preference.
6.  **UI Rendering (Frontend):** The frontend receives the sorted array and updates its state, causing the UI to re-render the task list in the new order.

## Output Format

The user's task list is re-ordered in the UI based on the selected sorting criteria.

### Example API Request (Sorting by priority, descending)

```http
GET /api/v1/tasks?sort_by=priority&order=desc
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
    "priority": "high",
    ...
  },
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Buy fresh milk",
    "priority": "medium",
    ...
  }
]
```
