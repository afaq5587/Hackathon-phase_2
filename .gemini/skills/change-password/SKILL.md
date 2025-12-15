---
name: Change Password
description: A skill for an authenticated (logged-in) user to change their current password.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user who is already logged in wants to change their password from their account settings or profile page.

## Process Steps

1.  **User Input (Frontend):** In a "Security" or "Profile" section of the application, the user fills out a form providing their `current_password`, a `new_password`, and a confirmation of the new password.
2.  **API Call (Frontend to Backend):** The frontend sends an authenticated `POST` request to a protected endpoint like `/api/v1/users/me/change-password`. The request body includes the `current_password` and `new_password`.
3.  **Current Password Verification (Backend):**
    *   The backend identifies the user via their JWT access token.
    *   It retrieves the user's current hashed password from the database.
    *   It securely compares the provided `current_password` with the stored hash. If they do not match, the request is rejected with a `400 Bad Request` or `401 Unauthorized` error.
4.  **New Password Update (Backend):**
    *   If the current password is correct, the backend validates the strength of the `new_password`.
    *   It securely hashes the `new_password`.
    *   It updates the user's record in the database with the new password hash.
5.  **Invalidate Other Sessions (Backend - Optional):** As a security best practice, the system can be designed to invalidate all other active sessions/tokens for this user upon a password change.
6.  **Response (Backend to Frontend):** The backend returns a `200 OK` response with a success message.

## Output Format

The authenticated user's password is changed. The user will need to use the new password for their next login.

### Example API Request

```http
POST /api/v1/users/me/change-password
Authorization: Bearer <user_jwt_token>
Content-Type: application/json

{
  "current_password": "a-very-strong-password-123!",
  "new_password": "my-new-even-stronger-password-456!"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Your password has been changed successfully."
}
```
