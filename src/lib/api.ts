import type { Api } from "@/api/api";
import { treaty } from "@elysiajs/eden";

export const backend = treaty<Api>(`${process.env.NEXT_PUBLIC_HOST}/api`, {
  fetch: {
    credentials: "include",
  },
});
