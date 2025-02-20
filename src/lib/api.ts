import type { Api } from "@/api/api";
import { treaty } from "@elysiajs/eden";

export const backend = treaty<Api>("/api", {
  fetch: {
    credentials: "include",
  },
});
