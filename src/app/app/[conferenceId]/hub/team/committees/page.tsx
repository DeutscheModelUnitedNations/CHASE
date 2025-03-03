"use client";
import React, { useContext } from "react";
import CommitteeGrid from "@/lib/components/navigation-hub/committee_grid";
import HeaderTemplate from "@/lib/components/HeaderTemplate";
import { ScrollPanel } from "primereact/scrollpanel";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { useUserIdent } from "@/lib/contexts/user_ident";
import { useBackendTime } from "@/lib/contexts/backendTime";
import FAIcon from "@/lib/components/FAIcon";
import { conferenceRoleTranslation } from "@/lib/translationUtils";
import { languageTag } from "@/paraglide/runtime";
import { LargeFlag } from "@/lib/components/Flag";
import * as m from "@/paraglide/messages";

export default function ChairHub() {
  const conferenceId = useContext(ConferenceIdContext);
  const { conferenceMembership } = useUserIdent();
  const { currentTime } = useBackendTime();

  return (
    <>
      <div className="flex flex-1 flex-col">
        <HeaderTemplate>
          <FAIcon
            icon="rocket-launch"
            className="mr-8 ml-6 text-4xl text-primary"
          />
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-2xl font-bold">{m.missionControl()}</h1>
            <h2 className="my-1 text-lg">
              {conferenceRoleTranslation(
                conferenceMembership
                  ? conferenceMembership(conferenceId)?.role
                  : undefined,
              )}
            </h2>
          </div>
          <div className="flex-1" />
          <div className="mr-10 font-mono text-5xl text-primary-300 dark:text-primary-700">
            {currentTime.toLocaleTimeString(languageTag(), {
              hour: "2-digit",
              minute: "numeric",
              second: "numeric",
            })}
          </div>
          <LargeFlag countryCode={"uno"} />
        </HeaderTemplate>
        <ScrollPanel style={{ width: "100%", height: "90vh" }}>
          {conferenceId && (
            <CommitteeGrid conferenceId={conferenceId} isChair />
          )}
          {!conferenceId && <div>Loading...</div>}
        </ScrollPanel>
      </div>
    </>
  );
}
