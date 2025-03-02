"use client";
import {
  CommitteeDataProvider,
  CommitteeIdContext,
} from "@/lib/contexts/committee_data";
import { StatusTimerProvider } from "@/lib/contexts/status_timer";
import type React from "react";
import { useParams } from "next/navigation";
export default function Participant_Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { committeeId } = useParams();
  return committeeId ? (
    <CommitteeIdContext.Provider value={committeeId as string}>
      <CommitteeDataProvider>
        <StatusTimerProvider>{children}</StatusTimerProvider>
      </CommitteeDataProvider>
    </CommitteeIdContext.Provider>
  ) : (
    <div>Loading...</div>
  );
}
