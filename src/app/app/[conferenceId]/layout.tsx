"use client";

import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { useParams } from "next/navigation";

export default function MyDelegationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { conferenceId } = useParams();
  return conferenceId ? (
    <ConferenceIdContext.Provider value={conferenceId as string}>
      {children}
    </ConferenceIdContext.Provider>
  ) : (
    <div>Loading...</div>
  );
}
