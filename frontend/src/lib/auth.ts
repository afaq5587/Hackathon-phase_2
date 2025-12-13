// frontend/src/lib/auth.ts
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

console.log("Initializing Better Auth...");

// Construct absolute path to the database
// We assume we are in frontend/ (root of Next.js project)
// Backend is in ../backend/
const dbPath = path.join(process.cwd(), "..", "backend", "todo.db");
console.log("Using Database Path for Auth:", dbPath);

const databaseAdapter = new Database(dbPath, { verbose: console.log });

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: "http://localhost:3000",
  database: databaseAdapter,
  emailAndPassword: {
    enabled: true,
  },
});

console.log("Better Auth Initialized.");
