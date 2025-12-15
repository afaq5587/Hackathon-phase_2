---
name: Setup New Page
description: A skill to create the necessary files and boilerplate for a new page (route) in the Next.js application.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A new top-level page or a new nested route needs to be added to the frontend application.

## Process Steps

This skill automates the creation of the standard file structure for a new route in a Next.js App Router project.

1.  **Receive Input:** The skill receives the desired route name (e.g., `profile`).
2.  **Create Directory:** It creates a new directory under `frontend/src/app/`. For a route named `profile`, it would create `frontend/src/app/profile/`.
3.  **Create Page File:** Inside the new directory, it creates the main page file, `page.tsx`.
4.  **Generate Boilerplate:** It populates `page.tsx` with standard boilerplate code for a basic React page component, including necessary imports and a placeholder JSX structure.
5.  **Create Supporting Files (Optional):** The skill can also create associated files like `loading.tsx` for loading UI or `error.tsx` for error boundaries within the same directory.

## Output Format

A new directory and corresponding `page.tsx` file are created within the `frontend/src/app/` directory, establishing a new, accessible route in the application.

### Example

**Input:**
- Page Name: `settings`

**Output:**
- The directory `frontend/src/app/settings/` is created.
- The file `frontend/src/app/settings/page.tsx` is created with the following content:

```typescript
// frontend/src/app/settings/page.tsx

import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <p>This is the settings page. Content to be added.</p>
    </div>
  );
}
```
