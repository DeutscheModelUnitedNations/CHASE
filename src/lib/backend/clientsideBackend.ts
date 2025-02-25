import type { Api } from "@/api/api";
import { treaty } from "@elysiajs/eden";

/**
 * Creates a client-side backend for the API
 * Make sure to set "use client" when you want to use this
 */
export const backend = treaty<Api>(
  `${process.env.NEXT_PUBLIC_HOST ?? ""}/api`,
  {
    fetch: {
      credentials: "include",
    },
  },
);
