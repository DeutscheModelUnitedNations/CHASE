"use client";

import { backend } from "@/lib/api";
import { useEffect, type ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  useEffect(() => {
    backend.auth["upsert-self"].post();
  }, []);

  return <>{children}</>;
}
