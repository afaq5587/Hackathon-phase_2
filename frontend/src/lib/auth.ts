// frontend/src/lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg"; // Assuming 'pg' package is installed for PostgreSQL client
import { type BetterAuthSession } from "better-auth";

// Initialize PostgreSQL Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Assuming DATABASE_URL from .env
});

export const auth = betterAuth<BetterAuthSession>({
  secret: process.env.BETTER_AUTH_SECRET as string,
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  jwt: { // Assuming 'jwt' option exists for token issuance
    secret: process.env.BETTER_AUTH_SECRET as string, // Use the same secret as the backend
    expiresIn: '1h', // Example expiration time
  },
  // Other configurations as needed
});
