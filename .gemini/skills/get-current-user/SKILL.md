---
name: Get Current User
description: A skill for retrieving the profile of the currently authenticated user based on their access token.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   An application loads and needs to fetch the profile information (e.g., name, email) of the signed-in user to display in the UI.
-   The frontend needs to verify that the stored access token is still valid and corresponds to an active user.

## Process Steps

1.  **Trigger (Frontend):** This is typically triggered when the main application shell or a protected page loads.
2.  **API Call (Frontend to Backend):** The frontend sends an authenticated `GET` request to a dedicated endpoint, commonly `/api/v1/users/me`. The stored JWT is included in the `Authorization: Bearer <token>` header.
3.  **Token Verification (Backend):**
    *   The backend receives the request and extracts the JWT from the header.
    *   An authentication dependency validates the token's signature and expiration. If invalid, it returns a `401 Unauthorized` error.
    *   If valid, the dependency decodes the token and extracts the `user_id` from the payload (usually from the `sub` claim).
4.  **Database Interaction (Backend to DB):** The endpoint logic uses the extracted `user_id` to query the database and retrieve the corresponding user's full profile.
5.  **Response (Backend to Frontend):** The backend returns a `200 OK` HTTP status code. The response body contains a JSON object representing the user's profile. **Crucially, sensitive information like the password hash must be excluded from this response.**
6.  **State Update (Frontend):** The frontend receives the user data and stores it in a global state (e.g., in a React Context). This makes the user information available throughout the application for personalization.

## Output Format

The frontend receives a JSON object with the authenticated user's public profile information.

### Example API Request

```http
GET /api/v1/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLXV1aWQtNDU2IiwiZXhwIjoxNzM0Mzg0NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Example API Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "user-uuid-456",
  "email": "new.user@example.com"
}
```
