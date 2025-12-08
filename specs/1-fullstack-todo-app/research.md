# Research: Testing Frameworks

**Prerequisite**: `plan.md` identified a need to clarify the testing strategy.

## Decision

- **Backend (FastAPI)**: We will use `pytest` for all backend testing, including unit, integration, and contract tests.
- **Frontend (Next.js)**: We will use `Jest` as the test runner, with `React Testing Library` for component testing.

## Rationale

- **`pytest`**: It is the de-facto standard for testing in the Python ecosystem. It has a rich plugin ecosystem, provides clear and concise syntax, and integrates seamlessly with FastAPI. Its fixtures system is powerful for managing test state and dependencies.

- **`Jest` & `React Testing Library` (RTL)**:
    - `Jest` is a popular, zero-config testing framework for JavaScript that works well with React and Next.js. It includes a test runner, assertion library, and mocking capabilities out of the box.
    - `React Testing Library` encourages testing components in a way that resembles how users interact with them. This approach leads to more resilient tests that focus on behavior rather than implementation details, which aligns well with our spec-driven development principle.

## Alternatives Considered

- **`unittest` (Backend)**: While part of the Python standard library, `unittest` is more verbose and less flexible than `pytest`.
- **`Cypress` or `Playwright` (Frontend)**: These are excellent for end-to-end (E2E) testing. While we may adopt them later for full E2E test suites, they are not a replacement for component-level testing with Jest and RTL, which is faster and more focused for unit-level verification. We will start with Jest/RTL for component and integration tests.
