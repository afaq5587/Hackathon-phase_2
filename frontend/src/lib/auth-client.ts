// frontend/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react"; // Use react adapter for client

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL // Optional: if auth server is at a different base URL
});

export const { signIn, signUp, useSession } = authClient;
