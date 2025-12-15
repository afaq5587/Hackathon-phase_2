---
name: Build and Deploy Frontend
description: A skill to execute the necessary scripts to build the Next.js application and deploy it to a hosting environment.
version: 1.0.0
---

## When to Use This Skill

Use this skill when:

-   A new version of the frontend application is ready to be deployed to a staging or production environment.
-   You want to automate the release process for the frontend.

## Process Steps

This skill typically involves executing shell commands within the `frontend` directory of the project. The exact commands depend on the hosting provider (e.g., Vercel, Netlify, AWS).

1.  **Navigate to Directory:** The skill's context is set to the `frontend/` directory.
2.  **Install Dependencies:** It runs `npm install` to ensure all required packages are present and up-to-date based on `package-lock.json`.
3.  **Run Lint and Test (Optional but Recommended):** It can run quality checks like `npm run lint` and `npm run test` to prevent deploying a broken version.
4.  **Execute Build Command:** It runs the production build command, typically `npm run build`. This compiles the Next.js application into an optimized set of static files, serverless functions, and other assets in the `.next` directory.
5.  **Execute Deploy Command:** It uses the hosting provider's CLI to deploy the application. For Vercel (which is used in this project), the command is `vercel --prod`. For other providers, it might involve scripts like the `upload_frontend_assets.py` you provided as inspiration, which would upload the build artifacts to a cloud storage service.

## Output Format

The frontend application is built and deployed to the hosting provider. The provider typically returns a URL for the new live deployment.

### Example (using Vercel CLI)

**Input:**
- A request to deploy the frontend to production.

**Output (sequence of shell commands):**

```bash
# 1. Change to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Build the application for production
npm run build

# 4. Deploy the contents of the .next directory to Vercel
vercel --prod
```

The output in the console would be the result of the `vercel` command, which includes a link to the production deployment.
