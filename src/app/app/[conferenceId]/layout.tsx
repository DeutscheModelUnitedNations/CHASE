"use client";

import { ConferenceIdContext } from "@/lib/contexts/committee_data";

export default function MyDelegationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { conferenceId: string };
}) {
  return (
    <ConferenceIdContext.Provider value={params.conferenceId}>
      {children}
    </ConferenceIdContext.Provider>
  );
}
