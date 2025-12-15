---
name: Create React Component
description: A skill to generate a new, reusable React component file with standard boilerplate.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A new, self-contained piece of UI needs to be developed (e.g., a custom button, a user profile card, a task item).
-   You want to break down a large page into smaller, more manageable components.

## Process Steps

1.  **Receive Input:** The skill receives the desired name for the component (e.g., `UserProfileCard`).
2.  **Create File:** It creates a new `.tsx` file within the `frontend/src/components/` directory. The filename matches the component name (e.g., `frontend/src/components/UserProfileCard.tsx`).
3.  **Generate Boilerplate:** It populates the new file with standard boilerplate for a functional React component. This includes:
    *   Importing React.
    *   Defining the component function.
    *   Defining a `Props` interface for type safety.
    *   Including a basic JSX structure with a root `div`.
    *   Exporting the component.

## Output Format

A new `.tsx` file is created in the `frontend/src/components/` directory, containing a basic, ready-to-use React component structure.

### Example

**Input:**
- Component Name: `UserProfileCard`

**Output:**
- The file `frontend/src/components/UserProfileCard.tsx` is created with the following content:

```typescript
// frontend/src/components/UserProfileCard.tsx

import React from 'react';

interface UserProfileCardProps {
  // Props to be defined, e.g., name: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = (props) => {
  return (
    <div>
      <h2>User Profile Card</h2>
      {/* Component JSX goes here */}
    </div>
  );
};

export default UserProfileCard;
```
