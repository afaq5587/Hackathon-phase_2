// frontend/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react"; // Use react adapter for client

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
});

export const { signIn, signUp, useSession, signOut } = authClient;
