---
name: User Login
description: A skill for authenticating a user with their credentials and issuing a JSON Web Token (JWT).
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   An existing user wants to sign in to the application to access their private data and features.

## Process Steps

1.  **User Input (Frontend):** A user enters their registered `email` and `password` into a login form.
2.  **API Call (Frontend to Backend):** The frontend sends a `POST` request to the `/api/v1/auth/login` endpoint. The request body contains the user's `email` and `password`.
3.  **Credential Verification (Backend):**
    *   The backend retrieves the user record from the database based on the provided `email`. If no user is found, the login fails.
    *   It securely compares the provided `password` with the stored *hashed password* using the appropriate hashing algorithm's verification function (e.g., `bcrypt.checkpw`). If they do not match, the login fails.
4.  **Token Generation (Backend):** If the credentials are valid, the backend generates a JSON Web Token (JWT). This token contains a payload with claims, such as the `user_id` (`sub` claim) and an expiration time (`exp` claim). The token is signed with a secret key known only to the backend.
5.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code. The response body contains the signed JWT `access_token`.
6.  **Token Storage (Frontend):** The frontend securely stores the `access_token` (e.g., in an HttpOnly cookie or local storage). This token is then included in the `Authorization: Bearer <token>` header of all subsequent requests to protected API endpoints.

## Output Format

The user is successfully authenticated, and the frontend client receives a JWT access token, enabling access to protected resources.

### Example API Request

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "new.user@example.com",
  "password": "a-very-strong-password-123!"
}
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLXV1aWQtNDU2IiwiZXhwIjoxNzM0Mzg0NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "bearer"
}
```
