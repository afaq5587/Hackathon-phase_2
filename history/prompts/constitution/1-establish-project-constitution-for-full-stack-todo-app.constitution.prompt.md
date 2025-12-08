---
id: 1
title: Establish Project Constitution for Full-Stack Todo App
stage: constitution
date: 2025-12-08
surface: agent
model: Gemini
feature: none
branch: main
user: 
command: /sp.constitution Establish project principles for a Full-Stack Todo Application built with Next.js, FastAPI, SQLModel, and Neon PostgreSQL, using Spec-Kit Plus and Claude Code.
labels: ["constitution", "setup"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:

---

## Prompt

/sp.constitution Establish project principles for a Full-Stack Todo Application built with Next.js, FastAPI, SQLModel, and Neon PostgreSQL, using Spec-Kit Plus and Claude Code.

Project Overview

A full-stack, spec-driven Todo Application designed with clean architecture, type-safety, and efficient development workflows. Backend exposes REST APIs, frontend built with Next.js App Router, authentication handled via Better Auth, and all data stored in Neon Serverless PostgreSQL.

Core Principles

Spec-Driven Development

All features, endpoints, data models, and UI workflows must originate from explicit specifications.

No coding begins until a complete spec is approved.

All agents must follow the Constitution strictly.

Clarity & Modularity

Keep backend, frontend, DB models, and auth flows strictly separated.

Use clean folder structures for scalability.

Type Safety & Validation

Use SQLModel for typed models.

Use Zod or TypeScript interfaces for frontend validation.

Consistency

Prefer standard naming conventions for endpoints, components, files, DB fields.

Use RESTful API principles.

Security

Mandatory authentication using Better Auth (email/password).

Protect all user-specific routes.

Performance

Use Neon serverless PostgreSQL with connection pooling.

Cache lists when possible.

Feature Progression
Basic Level (Required for MVP)

Add Task

Delete Task

Update Task

View Task List

Mark as Complete

These features must be implemented fully in both backend APIs and frontend UI.

Intermediate Level

Priorities (high/medium/low)

Tags/Categories

Search & Filter (keyword, status, priority, category)

Sort Tasks (due date, priority, alphabetical)

Advanced Level

Recurring Tasks

Due Dates with datetime pickers

Reminder & Notification system (browser notifications or email)

Technology Stack

Frontend: Next.js 16+ (App Router, Server Actions optional)

Backend: FastAPI (Python)

ORM: SQLModel

Database: Neon Serverless PostgreSQL

Auth: Better Auth

Infra: REST API with clear resource scoping: /api/{user_id}/tasks

REST API Specification
Method	Endpoint	Description
GET	/api/{user_id}/tasks	List all tasks
POST	/api/{user_id}/tasks	Create new task
GET	/api/{user_id}/tasks/{id}	Get task details
PUT	/api/{user_id}/tasks/{id}	Update task
DELETE	/api/{user_id}/tasks/{id}	Delete task
PATCH	/api/{user_id}/tasks/{id}/complete	Toggle completion
Acceptance Rules

MVP must include all Basic Level features, fully functional.

Code must follow the Constitution at every stage.

All specs generated must reference these principles.

Agents should break tasks into small, clear specs suitable for Spec-Kit Plus.

No hidden decisions—everything must be documented through specs.

Output Format Rule

Claude must always output structured specs compatible with Spec-Kit Plus and avoid adding unnecessary commentary unless asked.

## Response snapshot

I have successfully updated the project constitution at `.specify/memory/constitution.md` to version 1.0.0. The new constitution incorporates the principles for the Full-Stack Todo Application as provided. I also verified that the existing templates for plans, specs, and tasks are flexible and do not require modification.

## Outcome

- ✅ Impact: The project constitution is now established.
- 🧪 Tests: No tests were run.
- 📁 Files: `.specify/memory/constitution.md` was created/updated.
- 🔁 Next prompts: The user can now proceed with other commands, like `/sp.specify` or `/sp.plan`.
- 🧠 Reflection: The `create-phr.sh` script failed, so I had to create the PHR file manually. This indicates a potential issue with the shell environment.

## Evaluation notes (flywheel)

- Failure modes observed: Shell script execution failure.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
