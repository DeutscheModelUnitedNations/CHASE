"use client";
import { UserIdentProvider } from "@/contexts/user_ident";
import type React from "react";

export default function UserIdentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserIdentProvider>{children}</UserIdentProvider>;
}
