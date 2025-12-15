---
name: Request Password Reset
description: A skill for initiating the forgotten password flow by sending the user a reset link via email.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user has forgotten their password and clicks a "Forgot Password?" link on the login page.

## Process Steps

1.  **User Input (Frontend):** The user enters their email address into a designated form.
2.  **API Call (Frontend to Backend):** The frontend sends a `POST` request to `/api/v1/auth/request-password-reset` containing the user's `email`.
3.  **Token Generation (Backend):**
    *   The backend receives the email. It looks up the user in the database.
    *   It generates a secure, unique, and time-limited password reset token.
    *   A hash of this token is stored in the database, associated with the user's account and given an expiration time (e.g., 1 hour).
4.  **Email Dispatch (Backend):**
    *   The backend constructs a password reset URL that includes the plaintext token (e.g., `https://yourapp.com/reset-password?token=...`).
    *   It uses an email service (e.g., SendGrid) to send an email to the user's address containing this unique link.
5.  **Response (Backend to Frontend):** The backend returns a generic success response (e.g., `200 OK` with a message like "If an account with this email exists, a password reset link has been sent."). This is a security measure to prevent user enumeration (i.e., attackers checking if an email is registered).

## Output Format

The user receives an email containing a unique link to a page where they can set a new password.

### Example API Request

```http
POST /api/v1/auth/request-password-reset
Content-Type: application/json

{
  "email": "existing.user@example.com"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "If an account with this email exists, a password reset link has been sent."
}
```

### Example Email Content

> **Subject: Reset Your Password**
>
> You are receiving this email because a password reset was requested for your account. Click the link below to set a new password. This link is valid for 1 hour.
>
> `https://yourapp.com/reset-password?token=a1b2c3d4e5f6...`
>
> If you did not request this, please ignore this email.
