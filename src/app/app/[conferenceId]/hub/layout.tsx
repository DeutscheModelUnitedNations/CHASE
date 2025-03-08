"use client";
import { MessageCountProvider } from "@/lib/contexts/messages";
import type React from "react";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessageCountProvider>{children}</MessageCountProvider>;
}
