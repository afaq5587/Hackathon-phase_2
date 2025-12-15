---
name: Confirm Password Reset
description: A skill for setting a new password using a valid, time-limited reset token.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user has followed a password reset link from their email and is submitting a new password.

## Process Steps

1.  **Page Load (Frontend):** The user arrives at the reset password page via the link in their email. The frontend extracts the `token` from the URL query parameters.
2.  **User Input (Frontend):** The user enters their `new_password` into a form (usually with a confirmation field).
3.  **API Call (Frontend to Backend):** The frontend sends a `POST` request to `/api/v1/auth/confirm-password-reset`. The request body includes the `token` from the URL and the `new_password`.
4.  **Token Verification (Backend):**
    *   The backend receives the request. It hashes the provided `token` to compare it against the stored hashes in the database.
    *   It searches for a user associated with a matching, non-expired token hash. If no valid token is found, the request is rejected with a `400 Bad Request` error.
5.  **Password Update (Backend):**
    *   If the token is valid, the backend securely hashes the `new_password`.
    *   It updates the user's record in the database with the new password hash.
    *   It invalidates the password reset token (e.g., by deleting the hash from the database or marking it as used) to ensure it cannot be used again.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` response with a success message.

## Output Format

The user's password is changed in the database. The user can now log in with their new password.

### Example API Request

```http
POST /api/v1/auth/confirm-password-reset
Content-Type: application/json

{
  "token": "a1b2c3d4e5f6...",
  "new_password": "my-new-secure-password-456!"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Your password has been successfully reset. You can now log in."
}
```
