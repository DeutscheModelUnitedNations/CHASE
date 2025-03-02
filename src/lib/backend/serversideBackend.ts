// import type { Api } from "@/api/api";
// import { treaty } from "@elysiajs/eden";
// import { cookies } from "next/headers";

/**
 * Creates a server-side backend for the API.
 * Cannot be use in client components which are made with "use client"
 */
// export const serversideBackend = treaty<Api>(
//   `${process.env.NEXT_PUBLIC_HOST ?? ""}/api`,
//   {
//     fetch: {
//       credentials: "include",
//     },
//     headers: {
//       Cookie: cookies().toString(),
//     },
//   },
// );
