import { betterAuth } from "better-auth";
import { Pool } from "pg";

console.log("Initializing Better Auth with PostgreSQL...");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  }),
  emailAndPassword: {
    enabled: true,
  },
});

console.log("Better Auth Initialized.");

console.log("Better Auth Initialized.");
