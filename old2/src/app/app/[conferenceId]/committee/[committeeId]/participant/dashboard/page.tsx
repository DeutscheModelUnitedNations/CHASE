"use client";
import React, { useContext } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import DashboardHeader from "@/components/dashboard/header";
import SpeakersListWidget from "@/components/dashboard/speakers_list";
import TimerWidget from "@/components/dashboard/timer";
import WhiteboardWidget from "@/components/dashboard/whiteboard";
import ActionsWidget from "@/components/dashboard/actions";
import { useUserIdent } from "@/contexts/user_ident";
import {
  AgendaItemDataProvider,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { $Enums } from "@prisma/generated/client";

export default function participant_dashboard() {
  const conferenceId = useContext(ConferenceIdContext);
  const { conferenceMembership } = useUserIdent();

  return (
    <AgendaItemDataProvider>
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        {/* TODO Check why this Scroll Bar is not changing color as the other ones with the custom-scrollbar class */}
        <ScrollPanel className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-5 p-4">
            <div className="flex-1 flex flex-col justify-start items-stretch gap-5">
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
            <div className="flex-1 flex flex-col justify-start items-stretch gap-5 md:col-span-2 lg:col-span-1">
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
