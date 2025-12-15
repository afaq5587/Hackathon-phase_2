---
name: Manage Recurring Tasks
description: A skill for creating and managing tasks that repeat on a schedule.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user wants to create a task that automatically re-appears on their list after completion, based on a schedule (e.g., "Take out trash" every Tuesday, "Pay rent" on the 1st of every month).

## Process Steps

This is a complex skill involving both user-facing changes and significant backend logic.

1.  **User Action (Frontend):** When creating or editing a task, the user sets a recurrence rule (e.g., selects "Repeats weekly" from a dropdown).
2.  **API Call (Frontend to Backend):** The frontend sends the recurrence rule along with other task data in a `POST` (create) or `PATCH` (update) request. The rule can be stored in a standard format like iCalendar's RRULE (`"recurrence_rule": "FREQ=WEEKLY;BYDAY=TU"`).
3.  **Store Rule (Backend):** The backend saves this recurrence rule in a dedicated field on the task model in the database.
4.  **Completion & Regeneration (Backend Logic):** When a user marks a recurring task as complete, one of two main patterns can be used:
    *   **Pattern A (Immediate Regeneration):** The API endpoint for completing a task detects that the task has a recurrence rule. In addition to marking the current task complete, it immediately calculates the next due date and creates a *new*, separate task with that future due date.
    *   **Pattern B (Scheduled Job):** A background worker (e.g., a cron job running nightly) scans the database for recently completed tasks that have a recurrence rule. For each one, it generates the next task instance in the sequence.
5.  **UI Update (Frontend):** In Pattern A, the UI would show the original task as completed, and the new, future task would appear in the list. In Pattern B, the new task would appear after the background job has run.

## Output Format

When a recurring task is completed, a new instance of that task with a future due date is automatically generated and eventually appears on the user's task list.

### Example API Request (Creating a weekly recurring task)

```http
POST /api/v1/tasks
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "title": "Take out recycling",
  "due_date": "2025-12-16T09:00:00Z",
  "recurrence_rule": "FREQ=WEEKLY;INTERVAL=1"
}
```
