---
name: Manage Component State
description: A skill to implement state management within a React component using standard hooks.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A component needs to keep track of data that can change over time (e.g., user input in a form, data fetched from an API, a loading status).
-   The UI needs to react and re-render when a piece of data changes.

## Process Steps

1.  **Identify State:** The skill analyzes the component's requirements to determine what pieces of data need to be tracked as state. Common examples include:
    *   `data`: The primary data for the component (e.g., a list of tasks).
    *   `isLoading`: A boolean to track if an asynchronous operation (like an API call) is in progress.
    *   `error`: A string or object to hold any error messages.
    *   Form inputs: The value of each field in a form.
2.  **Import `useState`:** It ensures the `useState` hook is imported from React: `import { useState } from 'react';`.
3.  **Initialize State Variables:** For each piece of identified state, it calls `useState` within the component to create a state variable and its setter function. It provides a sensible initial value.
4.  **Integrate Setters:** The setter functions are then used in the component's logic (e.g., in event handlers or `useEffect` hooks) to update the state in response to events.
5.  **Use State in JSX:** The state variables are used directly in the component's JSX to render the UI. React automatically re-renders the component whenever a state variable changes.

## Output Format

The target React component is modified to include `useState` hooks for managing its internal state, allowing it to be dynamic and responsive to data changes.

### Example

**Input:**
- Component: `AddTaskForm.tsx`
- Required State: The value of the task title input field.

**Output (Simplified code added to `AddTaskForm.tsx`):**

```typescript
// ... imports
import { useState } from 'react';

// ... component definition

// 1. State variable for the input field is created
const [title, setTitle] = useState('');

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // Logic to submit the 'title' state would go here
  console.log('New Task Title:', title);
  // 2. Clear the input field after submission by updating the state
  setTitle('');
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={title} // 3. The input's value is tied to the state variable
      onChange={(e) => setTitle(e.target.value)} // 4. The state is updated on every keystroke
    />
    <button type="submit">Add Task</button>
  </form>
);
```
