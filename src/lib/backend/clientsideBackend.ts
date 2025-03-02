import type { Api } from "@/api/api";
import { treaty } from "@elysiajs/eden";

/**
 * Creates a client-side backend for the API
 * Make sure to set "use client" when you want to use this
 */
export const backend = treaty<Api>("/api", {
  fetch: {
    credentials: "include",
  },
  keepDomain: true,
});
