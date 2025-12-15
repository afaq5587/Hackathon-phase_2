---
name: User Signup
description: A skill for registering a new user account with an email and password.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A new visitor to the application wants to create a personal account.

## Process Steps

1.  **User Input (Frontend):** A user fills out a registration form, providing their email address and a password. The frontend may perform initial validation (e.g., checking for valid email format, password complexity).
2.  **API Call (Frontend to Backend):** The frontend sends a `POST` request to the `/api/v1/auth/signup` endpoint. The request body contains the user's `email` and `password`.
3.  **Validation (Backend):** The FastAPI backend receives the request and performs critical validation:
    *   Ensures the email is a valid format.
    *   Checks if a user with that email address already exists in the database to prevent duplicates.
    *   Enforces password strength requirements.
4.  **Password Hashing (Backend):** The backend securely hashes the plaintext password using a strong, one-way hashing algorithm like bcrypt or Argon2. **Plaintext passwords must never be stored.**
5.  **Database Interaction (Backend to DB):** A new `User` record is created in the database, storing the user's email and the *hashed password*.
6.  **Response (Backend to Frontend):** Upon successful creation, the backend returns a `201 Created` HTTP status code. The response body typically contains the newly created user object (excluding the password hash). The system may also automatically log the new user in by including an access token in the response.

## Output Format

A new user account is created in the database. The user is typically informed of their successful registration and may be redirected to the login page or automatically logged in.

### Example API Request

```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "new.user@example.com",
  "password": "a-very-strong-password-123!"
}
```

### Example API Response

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "user-uuid-456",
  "email": "new.user@example.com"
}
```
