// frontend/src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react"; // Use react adapter for client

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000" // Hardcoded to ensure client knows where auth server is
});

export const { signIn, signUp, useSession, signOut } = authClient;
