---
name: User Logout
description: A skill for terminating a user's authenticated session.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A user clicks a "Logout" button to securely sign out of their account.

## Process Steps

The core of a stateless logout process happens on the client-side. A server-side component can be added for more robust security (token blocklisting).

1.  **User Action (Frontend):** The user clicks the "Logout" button in the application's UI.
2.  **Token Deletion (Frontend):** The frontend's primary responsibility is to securely delete the JWT `access_token` from its storage (e.g., removing it from Local Storage or clearing the session cookie). Once the token is gone, the client can no longer make authenticated requests.
3.  **API Call (Frontend to Backend - Optional):** For enhanced security, the frontend can send an authenticated `POST` request to an `/api/v1/auth/logout` endpoint.
4.  **Token Invalidation (Backend - Optional):** If the optional logout endpoint exists, the backend receives the token and adds its unique identifier (`jti` claim) or signature to a "blocklist" (e.g., stored in a fast database like Redis). This ensures the token cannot be used again, even if it was stolen before it expired. The backend would then return a `200 OK` or `204 No Content` response.
5.  **Redirection (Frontend):** After deleting the token, the frontend redirects the user to a public page, such as the login screen or the application's homepage.

## Output Format

The user's session is terminated on the client. The user is redirected to a public page and must log in again to access protected routes.

### Example (Frontend Logic)

```javascript
// A simplified example of the logout function in a frontend application

function logout() {
  // 1. Remove the token from local storage
  localStorage.removeItem('accessToken');

  // 2. (Optional) Notify the backend to blacklist the token
  // fetch('/api/v1/auth/logout', { method: 'POST', headers: { ... } });

  // 3. Redirect the user to the login page
  window.location.href = '/login';
}
```
