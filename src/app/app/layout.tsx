"use client";

import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import { BackendTime } from "@/lib/contexts/backendTime";
import { UserIdentProvider } from "@/lib/contexts/user_ident";

export default function Layout({ children }: { children: React.ReactNode }) {
  useClientSideBackendCall((backend) => backend.auth["upsert-self"].post());
  return (
    <BackendTime>
      <UserIdentProvider>{children}</UserIdentProvider>
    </BackendTime>
  );
}
