---
name: Send Task Reminders
description: A skill for sending notifications to users about upcoming or overdue tasks.
version: 1.0.0
---

## When to Use This Skill

This skill is typically triggered automatically by the system, not directly by a user. It runs when:

-   A task's due date is approaching (e.g., 1 hour away).
-   A task's due date has just passed.

## Process Steps

This skill is a backend-driven process that runs on a schedule.

1.  **Scheduled Job (Backend):** A background worker or cron job is configured to run at regular intervals (e.g., every 5 minutes).
2.  **Query for Tasks (Backend to DB):** When the job runs, it queries the database for tasks that meet the reminder criteria. For example:
    *   `due_date` is in the near future (e.g., between now and 1 hour from now).
    *   `reminder_sent` is `false`.
    *   `completed` is `false`.
3.  **Identify User & Preferences (Backend):** For each task found, the system retrieves the associated user's details, including their email address or push notification token, and their notification preferences.
4.  **Dispatch Notification (Backend):** The system formats a reminder message (e.g., "Reminder: Your task 'Finish weekly report' is due in 1 hour.") and sends it to the user via a notification service:
    *   **Email:** Using a service like SendGrid or AWS SES.
    *   **Push Notification:** Using a service like Firebase Cloud Messaging (FCM) or Apple Push Notification Service (APNS).
5.  **Update Status (Backend to DB):** After successfully sending the notification, the system updates the task record in the database, setting `reminder_sent = true` to prevent sending duplicate reminders for the same due date.

## Output Format

The user receives a notification on their device (email or push notification) reminding them about an upcoming or overdue task. There is no direct API call initiated by the user for this skill.

### Example Notification Payload (for a push notification service)

```json
{
  "to": "<user_push_notification_token>",
  "notification": {
    "title": "Task Reminder",
    "body": "Your task 'Finish weekly report' is due soon.",
    "sound": "default"
  },
  "data": {
    "taskId": "f0e9d8c7-b6a5-4321-fedc-ba9876543210"
  }
}
```
