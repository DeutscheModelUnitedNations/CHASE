"use client";

import { BackendTime } from "@/lib/contexts/backendTime";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BackendTime>{children}</BackendTime>;
}
