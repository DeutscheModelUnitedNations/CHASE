"use client";

import { BackendTime } from "@/lib/contexts/backendTime";
import { UserIdentProvider } from "@/lib/contexts/user_ident";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BackendTime>
      <UserIdentProvider>{children}</UserIdentProvider>
    </BackendTime>
  );
}
