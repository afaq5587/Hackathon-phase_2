<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- Added principles:
  - Spec-Driven Development
  - Clarity & Modularity
  - Type Safety & Validation
  - Consistency
  - Security
  - Performance
- Removed sections:
  - PRINCIPLE_6_NAME
  - SECTION_2_NAME
  - SECTION_3_NAME
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
-->
# Full-Stack Todo Application Constitution

## Core Principles

### Spec-Driven Development
All features, endpoints, data models, and UI workflows must originate from explicit specifications.
No coding begins until a complete spec is approved.
All agents must follow the Constitution strictly.

### Clarity & Modularity
Keep backend, frontend, DB models, and auth flows strictly separated.
Use clean folder structures for scalability.

### Type Safety & Validation
Use SQLModel for typed models.
Use Zod or TypeScript interfaces for frontend validation.

### Consistency
Prefer standard naming conventions for endpoints, components, files, DB fields.
Use RESTful API principles.

### Security
Mandatory authentication using Better Auth (email/password).
Protect all user-specific routes.

### Performance
Use Neon serverless PostgreSQL with connection pooling.
Cache lists when possible.

## Feature Progression
Basic Level (Required for MVP)

- Add Task
- Delete Task
- Update Task
- View Task List
- Mark as Complete

These features must be implemented fully in both backend APIs and frontend UI.

Intermediate Level

- Priorities (high/medium/low)
- Tags/Categories
- Search & Filter (keyword, status, priority, category)
- Sort Tasks (due date, priority, alphabetical)

Advanced Level

- Recurring Tasks
- Due Dates with datetime pickers
- Reminder & Notification system (browser notifications or email)

## Technology Stack
- Frontend: Next.js 16+ (App Router, Server Actions optional)
- Backend: FastAPI (Python)
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Auth: Better Auth
- Infra: REST API with clear resource scoping: /api/{user_id}/tasks

## Governance
All PRs/reviews must verify compliance. Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: 2025-12-08 | **Last Amended**: 2025-12-08