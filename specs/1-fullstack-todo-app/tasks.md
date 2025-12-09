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
- [X] T011 Generate and apply initial Alembic migration for User and Task tables in `backend/db/migrations/`.
- [X] T012 Implement JWT token generation and validation logic in `backend/src/services/auth.py`.
- [X] T013 Create reusable dependency for authenticating users on protected endpoints in `backend/src/api/dependencies.py`.
- [X] T014 [P] Build basic signup page UI in `frontend/src/app/signup/page.tsx`.
- [X] T015 [P] Build basic login page UI in `frontend/src/app/login/page.tsx`.
- [X] T016 Implement auth state management (e.g., React Context) in `frontend/src/context/AuthContext.tsx`.

---

## Phase 3: User Story 1 - Basic Task Management (Priority: P1) 🎯 MVP

**Goal**: Allow users to create, view, update, delete, and complete tasks.
**Independent Test**: A user can log in, create a task, see it in a list, edit its title, mark it complete, and delete it.

- [X] T017 [US1] Implement `POST /api/v1/tasks` endpoint for creating tasks in `backend/src/api/tasks.py`.
- [X] T018 [US1] Implement `GET /api/v1/tasks` endpoint for listing tasks in `backend/src/api/tasks.py`.
- [X] T019 [US1] Implement `GET /api/v1/tasks/{id}` endpoint for fetching a single task in `backend/src/api/tasks.py`.
- [X] T020 [US1] Implement `PUT /api/v1/tasks/{id}` endpoint for updating a task in `backend/src/api/tasks.py`.
- [X] T021 [US1] Implement `DELETE /api/v1/tasks/{id}` endpoint for deleting a task in `backend/src/api/tasks.py`.
- [X] T022 [US1] Implement `PATCH /api/v1/tasks/{id}/complete` endpoint for toggling completion status in `backend/src/api/tasks.py`.
- [X] T023 [US1] Apply user_id scoping to all task queries in `backend/src/api/tasks.py` to ensure data isolation.
- [X] T024 [P] [US1] Build main task page layout in `frontend/src/app/tasks/page.tsx`.
- [X] T025 [P] [US1] Create 'Add Task' form component in `frontend/src/components/AddTaskForm.tsx`.
- [X] T026 [US1] Create `TaskList` component to display tasks in `frontend/src/components/TaskList.tsx`.
- [X] T027 [US1] Create `TaskItem` component for a single task's display and actions (edit, delete, complete) in `frontend/src/components/TaskItem.tsx`.
- [X] T028 [US1] Implement API service calls for all task CRUD operations in `frontend/src/services/api.ts`.
- [X] T029 [US1] Make task page UI responsive for mobile and desktop.

---

## Phase 4: User Story 2 - Task Organization & Discovery (Priority: P2)

**Goal**: Allow users to assign priorities and tags, then search, filter, and sort tasks.
**Independent Test**: A user can assign a priority and tags, then use search, filter, and sort controls to organize their list.

- [X] T030 [US2] Extend `Task` model in `backend/src/models/task.py` to include `priority` (Enum) and `tags` (Array of strings).
- [X] T031 [US2] Generate and apply Alembic migration for new Task fields.
- [X] T032 [US2] Add query parameters to `GET /api/v1/tasks` for searching by keyword in `backend/src/api/tasks.py`.
- [X] T033 [US2] Add query parameters to `GET /api/v1/tasks` for filtering by status, priority, and tags in `backend/src/api/tasks.py`.
- [X] T034 [US2] Add query parameters to `GET /api/v1/tasks` for sorting by due date, priority, and title in `backend/src/api/tasks.py`.
- [X] T035 [P] [US2] Add priority dropdown to task creation/edit forms in `frontend/src/components/`.
- [X] T036 [P] [US2] Add tags input field to task creation/edit forms in `frontend/src/components/`.
- [X] T037 [P] [US2] Add search bar component to `frontend/src/app/tasks/page.tsx`.
- [X] T038 [P] [US2] Add filter controls component for status, priority, and tags to `frontend/src/app/tasks/page.tsx`.
- [X] T039 [P] [US2] Add sort dropdown component to `frontend/src/app/tasks/page.tsx`.
- [X] T040 [US2] Update frontend state management and API calls to handle search, filter, and sort parameters in `frontend/src/services/api.ts`.

---

## Phase 5: User Story 3 - Advanced Task Scheduling (Priority: P3)

**Goal**: Allow users to set due dates, create recurring tasks, and receive reminders.
**Independent Test**: A user can set a due date and a weekly recurrence for a task, and receive a browser notification at a specified time.

- [X] T041 [US3] Extend `Task` model in `backend/src/models/task.py` to include `due_date` (DateTime) and `repeat_interval` (Enum).
- [X] T042 [US3] Generate and apply Alembic migration for new Task fields.
- [X] T043 [US3] Implement logic for recurring tasks (e.g., a background job or a post-completion hook) in `backend/src/services/tasks.py`.
- [X] T044 [P] [US3] Add date-time picker component to task creation/edit forms in `frontend/src/components/`.
- [X] T045 [P] [US3] Add recurrence selection UI (e.g., dropdown for daily/weekly) to task forms in `frontend/src/components/`.
- [X] T046 [P] [US3] Add reminder setup UI (e.g., time input) to task forms in `frontend/src/components/`.
- [X] T047 [US3] Implement frontend logic to trigger browser notifications using the Web Notifications API in `frontend/src/services/notifications.ts`.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T048 [P] API testing for all CRUD, search, filter, and sort endpoints.
- [X] T049 [P] UI testing for responsive design and component interactions.
- [X] T050 [P] Validate user isolation by writing tests that attempt to access another user's data.
- [X] T051 Enable and configure Neon connection pooling in `backend/src/main.py`.
- [X] T052 Review and optimize critical API database queries.
- [X] T053 [P] Deploy backend to a hosting service (e.g., Vercel, Railway).
- [X] T054 [P] Deploy frontend to a hosting service (e.g., Vercel).
- [X] T055 Configure production environment variables.
- [X] T056 Final review of the deployed application against the Constitution and `spec.md`.

## Refactor Phase: Better Auth Integration (JWT Approach)

**Goal**: Integrate Better Auth by configuring it to issue JWT tokens from the frontend, and update the FastAPI backend to validate these tokens for API request authorization.

**Backend Tasks (FastAPI):**

- [X] T057 Remove `backend/src/services/auth.py`.
- [X] T058 Remove `backend/src/services/auth_service.py`.
- [X] T059 Modify `backend/main.py` to remove custom auth imports, `/token`, and `/register` endpoints.
- [X] T060 Update `backend/src/models/user.py` to remove `hashed_password` and adjust for Better Auth's user ID (if applicable, change `id` to `str`).
- [X] T061 Generate new Alembic migration for `User` model changes.
- [X] T062 (New) Update `backend/src/api/dependencies.py` to:
    -   Import `jwt` from `jose` and `BETTER_AUTH_SECRET` from environment.
    -   Implement `get_current_user` to decode and verify Better Auth's JWT token.
    -   Extract user ID from the validated token and use it to fetch the `User` from the database.
- [X] T063 (New) Update `backend/main.py` if necessary for any new global dependencies or startup events related to Better Auth JWT. (Likely not needed, dependency handles it).

**Frontend Tasks (Next.js):**

- [X] T064 (New) Install Better Auth SDK: `npm install better-auth`.
- [X] T065 (New) Configure Better Auth in `frontend/src/lib/auth.ts` (or similar path) to:
    -   Use the database (e.g., PostgreSQL client).
    -   Enable `emailAndPassword`.
    -   Configure JWT token issuance.
- [X] T066 (New) Mount Better Auth handler: Create `frontend/src/app/api/auth/[...all]/route.ts` using `toNextJsHandler`.
- [X] T067 (New) Create Better Auth client: `frontend/src/lib/auth-client.ts` using `createAuthClient`.
- [X] T068 (New) Modify `frontend/src/services/api.ts` to use Better Auth client for `loginUser` and `registerUser`.
- [X] T069 (New) Modify `frontend/src/context/AuthContext.tsx` to integrate with Better Auth client's session management.
- [X] T070 (New) Modify `frontend/src/app/signup/page.tsx` to use Better Auth client registration.
- [X] T071 (New) Modify `frontend/src/app/login/page.tsx` to use Better Auth client login.