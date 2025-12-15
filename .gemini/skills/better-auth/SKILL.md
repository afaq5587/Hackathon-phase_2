---
name: Reusable Intelligence Definition
description: A skill for creating structured, reusable intelligence for a new feature or agent within the Spec-Driven Development (SDD) framework.
version: 1.0.0
---

## When to Use This Skill

Use this skill when you need to:

-   Begin a new, significant feature or component (e.g., "better-auth").
-   Formally document a component's purpose, architecture, and implementation plan before coding.
-   Create a centralized, reusable knowledge base for a specific domain within the project.
-   Onboard a new "agent" or "skill" into the project's structured SDD process.

## Process Steps

1.  **Identify Feature:** The user states their intent to define a new feature, component, or "agent."
2.  **Create Directory:** A dedicated directory is created for the feature under `specs/` (e.g., `specs/2-better-auth/`). This isolates all related intelligence artifacts.
3.  **Generate Core Artifacts:** The directory is populated with standard SDD files, typically using the project's templates found in `.specify/templates/`:
    *   **`spec.md`**: Defines the *what* and *why*. Captures goals, user stories, and acceptance criteria.
    *   **`plan.md`**: Describes the *how*. Outlines the architectural approach, key technical decisions, and data models.
    *   **`tasks.md`**: Lists the concrete, actionable *steps* required for implementation.
4.  **Establish Knowledge Base:** A `skills.md` file is created within the feature directory to act as a living document for:
    *   Storing domain-specific knowledge.
    *   Collecting relevant code snippets and patterns.
    *   Documenting best practices related to the feature.

## Output Format

The skill's primary output is a new directory within the `specs/` folder containing a set of Markdown files that structure the "intelligence" for the given feature.

## Example

**Input:**

> "create agent and it's skills reuseable intelligence for betterauth"

**Output:**

A new directory structure is created and populated with foundational documents:

```
specs/
└── 2-better-auth/
    ├── plan.md       # Describes HOW the feature is architected.
    ├── skills.md     # Contains reusable KNOWLEDGE and code patterns for auth.
    ├── spec.md       # Defines WHAT the feature does and WHY.
    └── tasks.md      # Lists the concrete STEPS to build the feature.
```
