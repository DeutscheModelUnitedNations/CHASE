"use client";
import { CommitteeDataProvider, CommitteeIdContext } from "@/lib/contexts/committee_data";
import { StatusTimerProvider } from "@/lib/contexts/status_timer";
import type React from "react";

export default function Participant_Pages_Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { conferenceId: string; committeeId: string };
}) {
  return (
    <CommitteeIdContext.Provider value={params.committeeId}>
      <CommitteeDataProvider>
        <StatusTimerProvider>{children}</StatusTimerProvider>
      </CommitteeDataProvider>
    </CommitteeIdContext.Provider>
  );
}
