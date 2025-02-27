"use client";
import React, { useContext, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import DashboardHeader from "@/lib/components/dashboard/header";
import { useI18nContext } from "@/i18n/i18n-react";
import TimerWidget from "@/lib/components/dashboard/timer";
import WhiteboardWidget from "@/lib/components/dashboard/whiteboard";
import PresenceWidget from "@/lib/components/attendance/presence_widget";
import WidgetTemplate from "@/lib/components/WidgetTemplate";
import {
  AgendaItemDataProvider,
  ConferenceIdContext,
  CommitteeIdContext,
} from "@/contexts/committee_data";
import AgendaSelection from "@/lib/components/dashboard/chair/agenda_selection";
import SetStatusWidget from "@/lib/components/dashboard/chair/set_status";
import SpeakersListAddingPolicyWidget from "@/lib/components/dashboard/chair/speakers_list_adding_policy";
import Button from "@/lib/components/button";
import ConfigWrapper from "@/lib/components/dashboard/chair/config_wrapper";
import StateOfDebateWidget from "@/lib/components/dashboard/chair/state_of_debate";
import { useSpeakersListMiniature } from "@/contexts/speakers_list_miniature";
import RegionalGroupsLookup from "@/lib/components/dashboard/chair/regional_groups_lookup";

export default function ChairDashboardPage() {
  const { LL } = useI18nContext();
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
                  <h1 className="text-2xl font-bold">
                    {LL.chairs.dashboard.overview.TITLE()}
                  </h1>
                  <WidgetTemplate>
                    <PresenceWidget showExcusedSeperately={true} />
                  </WidgetTemplate>
                  <TimerWidget />
                  <WhiteboardWidget />
                </div>
              </div>
              <div className="flex w-full flex-col justify-stretch gap-4 p-4">
                <h1 className="text-2xl font-bold">
                  {LL.chairs.dashboard.configurations.TITLE()}
                </h1>
                <SetStatusWidget />
                <StateOfDebateWidget />
                <AgendaSelection />
                <SpeakersListAddingPolicyWidget />
                <ConfigWrapper
                  title={LL.chairs.dashboard.configurations.overlay.TITLE()}
                  description={LL.chairs.dashboard.configurations.overlay.DESCRIPTION()}
                >
                  <Button
                    faIcon="podium"
                    label={LL.chairs.dashboard.configurations.overlay.TOGGLE_BUTTON()}
                    keyboardShortcut="O"
                    onClick={() => toggleSpeakersListMiniature()}
                    className="w-full"
                  />
                </ConfigWrapper>
                <ConfigWrapper
                  title={LL.chairs.dashboard.configurations.presentationMode.TITLE()}
                  description={LL.chairs.dashboard.configurations.presentationMode.DESCRIPTION()}
                >
                  <Button
                    faIcon="presentation-screen"
                    label={LL.chairs.dashboard.configurations.presentationMode.BUTTON()}
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
                  title={LL.chairs.dashboard.configurations.regionalGroups.TITLE()}
                  description={LL.chairs.dashboard.configurations.regionalGroups.DESCRIPTION()}
                >
                  <div className="flex w-full gap-2">
                    <Button
                      faIcon="magnifying-glass"
                      label={LL.chairs.dashboard.configurations.regionalGroups.BUTTON_LOOKUP()}
                      onClick={() => setRegionalGroupModalOpen(true)}
                      className="w-full"
                    />
                    <Button
                      faIcon="arrows-rotate"
                      label={LL.chairs.dashboard.configurations.regionalGroups.BUTTON_PRESENTATION()}
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
