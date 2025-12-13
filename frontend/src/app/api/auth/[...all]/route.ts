// frontend/src/app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth"; // Corrected import path
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
