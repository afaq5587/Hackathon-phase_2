# Tasks: Full-Stack Todo Application

**Input**: Design documents from `specs/1-fullstack-todo-app/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

- [X] T001 [P] Initialize FastAPI backend project in `backend/`.
- [X] T002 [P] Initialize Next.js (App Router) project in `frontend/`.
- [X] T003 Configure Neon PostgreSQL connection details in `backend/.env`.
- [X] T004 [P] Set up SQLModel for ORM in `backend/src/models/`.
- [X] T005 [P] Install and configure Alembic for migrations in `backend/db/`.
- [X] T006 [P] Integrate Better Auth for email/password auth in `backend/src/services/auth.py`.
- [X] T007 [P] Create shared `.env` structure for frontend and backend.
- [X] T008 [P] Establish clean folder structure for `backend/`, `frontend/`, and `db/` as per `plan.md`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [X] T009 Define `User` model in `backend/src/models/user.py`.
- [X] T010 Define base `Task` model in `backend/src/models/task.py`.
- [ ] T011 Generate and apply initial Alembic migration for User and Task tables in `backend/db/migrations/`.
- [X] T012 Implement JWT token generation and validation logic in `backend/src/services/auth.py`.
- [X] T013 Create reusable dependency for authenticating users on protected endpoints in `backend/src/api/dependencies.py`.
- [ ] T014 [P] Build basic signup page UI in `frontend/src/app/signup/page.tsx`.
- [ ] T015 [P] Build basic login page UI in `frontend/src/app/login/page.tsx`.
- [ ] T016 Implement auth state management (e.g., React Context) in `frontend/src/context/AuthContext.tsx`.

---

## Phase 3: User Story 1 - Basic Task Management (Priority: P1) 🎯 MVP

**Goal**: Allow users to create, view, update, delete, and complete tasks.
**Independent Test**: A user can log in, create a task, see it in a list, edit its title, mark it complete, and delete it.

- [ ] T017 [US1] Implement `POST /api/v1/tasks` endpoint for creating tasks in `backend/src/api/tasks.py`.
- [ ] T018 [US1] Implement `GET /api/v1/tasks` endpoint for listing tasks in `backend/src/api/tasks.py`.
- [ ] T019 [US1] Implement `GET /api/v1/tasks/{id}` endpoint for fetching a single task in `backend/src/api/tasks.py`.
- [ ] T020 [US1] Implement `PUT /api/v1/tasks/{id}` endpoint for updating a task in `backend/src/api/tasks.py`.
- [ ] T021 [US1] Implement `DELETE /api/v1/tasks/{id}` endpoint for deleting a task in `backend/src/api/tasks.py`.
- [ ] T022 [US1] Implement `PATCH /api/v1/tasks/{id}/complete` endpoint for toggling completion status in `backend/src/api/tasks.py`.
- [ ] T023 [US1] Apply user_id scoping to all task queries in `backend/src/api/tasks.py` to ensure data isolation.
- [ ] T024 [P] [US1] Build main task page layout in `frontend/src/app/tasks/page.tsx`.
- [ ] T025 [P] [US1] Create 'Add Task' form component in `frontend/src/components/AddTaskForm.tsx`.
- [ ] T026 [US1] Create `TaskList` component to display tasks in `frontend/src/components/TaskList.tsx`.
- [ ] T027 [US1] Create `TaskItem` component for a single task's display and actions (edit, delete, complete) in `frontend/src/components/TaskItem.tsx`.
- [ ] T028 [US1] Implement API service calls for all task CRUD operations in `frontend/src/services/api.ts`.
- [ ] T029 [US1] Make task page UI responsive for mobile and desktop.

---

## Phase 4: User Story 2 - Task Organization & Discovery (Priority: P2)

**Goal**: Allow users to assign priorities and tags, then search, filter, and sort tasks.
**Independent Test**: A user can assign a priority and tags, then use search, filter, and sort controls to organize their list.

- [ ] T030 [US2] Extend `Task` model in `backend/src/models/task.py` to include `priority` (Enum) and `tags` (Array of strings).
- [ ] T031 [US2] Generate and apply Alembic migration for new Task fields.
- [ ] T032 [US2] Add query parameters to `GET /api/v1/tasks` for searching by keyword in `backend/src/api/tasks.py`.
- [ ] T033 [US2] Add query parameters to `GET /api/v1/tasks` for filtering by status, priority, and tags in `backend/src/api/tasks.py`.
- [ ] T034 [US2] Add query parameters to `GET /api/v1/tasks` for sorting by due date, priority, and title in `backend/src/api/tasks.py`.
- [ ] T035 [P] [US2] Add priority dropdown to task creation/edit forms in `frontend/src/components/`.
- [ ] T036 [P] [US2] Add tags input field to task creation/edit forms in `frontend/src/components/`.
- [ ] T037 [P] [US2] Add search bar component to `frontend/src/app/tasks/page.tsx`.
- [ ] T038 [P] [US2] Add filter controls component for status, priority, and tags to `frontend/src/app/tasks/page.tsx`.
- [ ] T039 [P] [US2] Add sort dropdown component to `frontend/src/app/tasks/page.tsx`.
- [ ] T040 [US2] Update frontend state management and API calls to handle search, filter, and sort parameters in `frontend/src/services/api.ts`.

---

## Phase 5: User Story 3 - Advanced Task Scheduling (Priority: P3)

**Goal**: Allow users to set due dates, create recurring tasks, and receive reminders.
**Independent Test**: A user can set a due date and a weekly recurrence for a task, and receive a browser notification at a specified time.

- [ ] T041 [US3] Extend `Task` model in `backend/src/models/task.py` to include `due_date` (DateTime) and `repeat_interval` (Enum).
- [ ] T042 [US3] Generate and apply Alembic migration for new Task fields.
- [ ] T043 [US3] Implement logic for recurring tasks (e.g., a background job or a post-completion hook) in `backend/src/services/tasks.py`.
- [ ] T044 [P] [US3] Add date-time picker component to task creation/edit forms in `frontend/src/components/`.
- [ ] T045 [P] [US3] Add recurrence selection UI (e.g., dropdown for daily/weekly) to task forms in `frontend/src/components/`.
- [ ] T046 [P] [US3] Add reminder setup UI (e.g., time input) to task forms in `frontend/src/components/`.
- [ ] T047 [US3] Implement frontend logic to trigger browser notifications using the Web Notifications API in `frontend/src/services/notifications.ts`.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T048 [P] API testing for all CRUD, search, filter, and sort endpoints.
- [ ] T049 [P] UI testing for responsive design and component interactions.
- [ ] T050 [P] Validate user isolation by writing tests that attempt to access another user's data.
- [ ] T051 Enable and configure Neon connection pooling in `backend/src/main.py`.
- [ ] T052 Review and optimize critical API database queries.
- [ ] T053 [P] Deploy backend to a hosting service (e.g., Vercel, Railway).
- [ ] T054 [P] Deploy frontend to a hosting service (e.g., Vercel).
- [ ] T055 Configure all production environment variables.
- [ ] T056 Final review of the deployed application against the Constitution and `spec.md`.

## Dependencies & Execution Order

- **Setup (Phase 1) & Foundational (Phase 2)**: Must be completed before any user story work begins.
- **User Stories (Phase 3-5)**: Can be implemented sequentially (P1 → P2 → P3). US1 is the MVP.
- **Polish (Phase 6)**: Can begin after the MVP (US1) is complete and can run in parallel with other feature work.
