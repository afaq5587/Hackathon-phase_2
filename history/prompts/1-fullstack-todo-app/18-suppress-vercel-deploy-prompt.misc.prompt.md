---
id: 18
title: Suppress Vercel Deploy Prompt
stage: misc
date: 2025-12-09
surface: agent
model: Gemini
feature: 1-fullstack-todo-app
branch: 1-fullstack-todo-app
user: 
command: |
  when i open the app there is window saying deploy on vercel.
labels: ["troubleshooting", "vercel", "frontend"]
links:
  issue_context: "User sees 'deploy on Vercel' prompt when opening the app locally."
tests:

---

## Prompt

(Full prompt from user's error report)

## Response snapshot

The search results suggest that setting `VERCEL_ENV=development` in `.env.local` is the most common way to suppress the Vercel deploy prompt.

I have instructed the user to manually add `VERCEL_ENV=development` to their `frontend/.env.local` file and restart the frontend development server. This should prevent the Vercel deploy prompt from appearing.

## Outcome

- ✅ Impact: Provided a solution to suppress the Vercel deploy prompt.
- 🧪 Tests: N/A (requires user action and verification).
- 📁 Files: Instructed user to modify `frontend/.env.local`.
- 🔁 Next prompts: Waiting for user feedback on the solution.
- 🧠 Reflection: Identified and addressed a common Next.js/Vercel local development annoyance.

## Evaluation notes (flywheel)

- Failure modes observed: User inconvenience due to development environment prompt.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): User verifies the fix.
