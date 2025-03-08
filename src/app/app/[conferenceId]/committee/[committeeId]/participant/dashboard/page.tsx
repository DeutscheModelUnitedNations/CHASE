"use client";
import React, { useContext } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import DashboardHeader from "@/lib/components/dashboard/header";
import SpeakersListWidget from "@/lib/components/dashboard/speakers_list";
import TimerWidget from "@/lib/components/dashboard/timer";
import WhiteboardWidget from "@/lib/components/dashboard/whiteboard";
import ActionsWidget from "@/lib/components/dashboard/actions";
import { $Enums } from "@prisma/client";
import {
  AgendaItemDataProvider,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useUserIdent } from "@/lib/contexts/user_ident";

export default function participant_dashboard() {
  const conferenceId = useContext(ConferenceIdContext);
  const { conferenceMembership } = useUserIdent();

  return (
    <AgendaItemDataProvider>
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        {/* TODO Check why this Scroll Bar is not changing color as the other ones with the custom-scrollbar class */}
        <ScrollPanel className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="grid flex-1 grid-cols-1 gap-5 p-4 md:grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-1 flex-col items-stretch justify-start gap-5">
              <SpeakersListWidget />
              <TimerWidget />
            </div>
            {/* <div className="flex-1 flex flex-col justify-start items-stretch gap-5">
                <CommitteeStatusWidget
                  currentDebateStep={data.committeeStatus.currentDebateStep}
                  nextDebateStep={data.committeeStatus.nextDebateStep}
                />
                <DocumentsWidget documents={data.documents} />
              </div> */}
            <div className="flex flex-1 flex-col items-stretch justify-start gap-5 md:col-span-2 lg:col-span-1">
              <WhiteboardWidget />
              {conferenceMembership(conferenceId)?.role !==
                $Enums.ConferenceRole.GUEST && <ActionsWidget />}
            </div>
          </div>
        </ScrollPanel>
      </div>
    </AgendaItemDataProvider>
  );
}
