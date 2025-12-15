---
name: Connect Component to API
description: A skill to implement the logic within a React component to fetch data from or send data to a backend API endpoint.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A component needs to display data that lives in the backend database (e.g., fetching a list of tasks).
-   A user action within a component needs to trigger a change in the backend (e.g., submitting a new task).

## Process Steps

1.  **Identify Target:** The skill identifies the target component file (e.g., `UserProfileCard.tsx`) and the target backend skill (e.g., `get-current-user`, which defines the API endpoint and data shape).
2.  **Import Hooks and Services:** It ensures that necessary React hooks (`useState`, `useEffect`) and any custom API service modules (e.g., a shared `api.ts` file with a configured `fetch` instance) are imported.
3.  **Implement State:** It uses the `manage-component-state` skill to add state variables to hold the API data, loading status, and any potential errors (e.g., `const [data, setData] = useState(null);`).
4.  **Implement Data Fetching Logic:**
    *   For **data fetching (`GET`)**, it wraps the API call in a `useEffect` hook to trigger it when the component mounts.
    *   For **data submission (`POST`, `PATCH`, `DELETE`)**, it creates an asynchronous handler function (e.g., `handleAddTask`) that will be called by a user interaction like a button click.
5.  **Update State:** The logic updates the component's state based on the API call's progress: sets loading to `true` before the call, and upon response, sets the data or error state and resets loading to `false`.

## Output Format

The target React component is modified to include all the necessary logic for interacting with a specific backend endpoint and managing the state of that interaction.

### Example

**Input:**
- Component: `TaskList.tsx`
- Target Backend Skill: `view-task-list` (which uses `GET /api/v1/tasks`)

**Output (Simplified code added to `TaskList.tsx`):**

```typescript
// ... imports
import { useEffect, useState } from 'react';
import { api } from '../services/api'; // Assume a configured api service
import { Task } from '../services/types'; // Assume a Task type definition

// ... component definition

const [tasks, setTasks] = useState<Task[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/v1/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchTasks();
}, []); // Empty dependency array means this runs once on mount

// ... JSX would then use these state variables to render the list, a loading spinner, or an error message.
```
