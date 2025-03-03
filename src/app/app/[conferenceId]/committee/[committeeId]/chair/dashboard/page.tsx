"use client";
import React, { useContext, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import DashboardHeader from "@/lib/components/dashboard/header";
import TimerWidget from "@/lib/components/dashboard/timer";
import WhiteboardWidget from "@/lib/components/dashboard/whiteboard";
import PresenceWidget from "@/lib/components/attendance/presence_widget";
import WidgetTemplate from "@/lib/components/WidgetTemplate";
import AgendaSelection from "@/lib/components/dashboard/chair/agenda_selection";
import SetStatusWidget from "@/lib/components/dashboard/chair/set_status";
import SpeakersListAddingPolicyWidget from "@/lib/components/dashboard/chair/speakers_list_adding_policy";
import ConfigWrapper from "@/lib/components/dashboard/chair/config_wrapper";
import StateOfDebateWidget from "@/lib/components/dashboard/chair/state_of_debate";
import RegionalGroupsLookup from "@/lib/components/dashboard/chair/regional_groups_lookup";
import {
  AgendaItemDataProvider,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useSpeakersListMiniature } from "@/lib/contexts/speakers_list_miniature";
import Button from "@/lib/components/Button";
import * as m from "@/paraglide/messages";

export default function ChairDashboardPage() {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [regionalGroupModalOpen, setRegionalGroupModalOpen] = useState(false);

  const { toggleSpeakersListMiniature } = useSpeakersListMiniature();

  return (
    <>
      <AgendaItemDataProvider>
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          {/* TODO Check why this Scroll Bar is not changing color as the other ones with the custom-scrollbar class */}
          <ScrollPanel className="custom-scrollbar flex-1 overflow-y-auto">
            <div className="m-4 grid grid-cols-1 xl:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-col justify-stretch gap-4 p-4">
                  <h1 className="text-2xl font-bold">{m.overview()}</h1>
                  <WidgetTemplate>
                    <PresenceWidget showExcusedSeperately={true} />
                  </WidgetTemplate>
                  <TimerWidget />
                  <WhiteboardWidget />
                </div>
              </div>
              <div className="flex w-full flex-col justify-stretch gap-4 p-4">
                <h1 className="text-2xl font-bold">{m.configurations()}</h1>
                <SetStatusWidget />
                <StateOfDebateWidget />
                <AgendaSelection />
                <SpeakersListAddingPolicyWidget />
                <ConfigWrapper
                  title={m.speakersListOverlay()}
                  description={m.opensTheSpeakersListOverlay()}
                >
                  <Button
                    faIcon="podium"
                    label={m.openOrCloseOverlay()}
                    keyboardShortcut="O"
                    onClick={() => toggleSpeakersListMiniature()}
                    className="w-full"
                  />
                </ConfigWrapper>
                <ConfigWrapper
                  title={m.openPresentationMode()}
                  description={m.openANewWindowInPresentationMode()}
                >
                  <Button
                    faIcon="presentation-screen"
                    label={m.presentationMode()}
                    onClick={() => {
                      window.open(
                        `/app/${conferenceId}/committee/${committeeId}`,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className="w-full"
                  />
                </ConfigWrapper>
                <ConfigWrapper
                  title={m.regionalGroups()}
                  description={m.openAOverviewOfRegionalGroupsAndAssignDelegations()}
                >
                  <div className="flex w-full gap-2">
                    <Button
                      faIcon="magnifying-glass"
                      label={m.lookupRegionalGroups()}
                      onClick={() => setRegionalGroupModalOpen(true)}
                      className="w-full"
                    />
                    <Button
                      faIcon="arrows-rotate"
                      label={m.presentationLoop()}
                      onClick={() => {
                        window.open(
                          `/app/${conferenceId}/committee/${committeeId}/regional_groups`,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                      className="w-full"
                    />
                  </div>
                </ConfigWrapper>
              </div>
            </div>
          </ScrollPanel>
        </div>
      </AgendaItemDataProvider>
      <RegionalGroupsLookup
        lookupVisible={regionalGroupModalOpen}
        setLookupVisible={setRegionalGroupModalOpen}
      />
    </>
  );
}
