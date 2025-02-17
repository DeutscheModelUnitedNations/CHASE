"use client";
import type React from "react";
import { MessageCountProvider } from "@/contexts/messages";

export default function NavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessageCountProvider>{children}</MessageCountProvider>;
}
