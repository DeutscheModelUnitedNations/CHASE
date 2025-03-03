"use client";
import React, { useEffect, useState, useContext } from "react";
import HeaderTemplate from "@/lib/components/HeaderTemplate";
import { ScrollPanel } from "primereact/scrollpanel";
import { useToast } from "@/lib/contexts/toast";
import { $Enums } from "@prisma/client";
import PresenceWidget from "@/lib/components/attendance/presence_widget";
import AttendanceTable, {
  type DelegationDataType,
} from "@/lib/components/attendance/attendance_table";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { backend } from "@/lib/backend/clientsideBackend";
import { languageTag } from "@/paraglide/runtime";
import Button from "@/lib/components/Button";
import * as m from "@/paraglide/messages";
import getCountryNameByCode from "@/lib/get_country_name_by_code";

export default function ChairAttendees() {
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [delegationData, setDelegationData] = useState<DelegationDataType>([]);
  const [nonStateActorsData, setNonStateActorsData] =
    useState<DelegationDataType>([]);
  const [forcePresenceWidgetUpdate, setForcePresenceWidgetUpdate] =
    useState(false);

  async function getDelegationData() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .delegations.get()
      .then((response) => {
        setDelegationData(
          response.data
            ?.filter(
              (delegation) =>
                delegation.nation.variant === $Enums.NationVariant.NATION,
            )
            .sort((a, b) =>
              getCountryNameByCode(a.nation.alpha3Code).localeCompare(
                getCountryNameByCode(b.nation.alpha3Code),
              ),
            ) || null,
        );
        setNonStateActorsData(
          response.data?.filter(
            (delegation) =>
              delegation.nation.variant ===
              $Enums.NationVariant.NON_STATE_ACTOR,
          ) || null,
        );
      })
      .catch((error) => {
        toastError(error);
      });
  }

  useEffect(() => {
    getDelegationData();
    const intervalAPICall = setInterval(() => {
      getDelegationData();
    }, 5000);
    return () => clearInterval(intervalAPICall);
  }, []);

  async function updatePresence(
    delegationId: string,
    memberId: string,
    presence: $Enums.Presence,
  ) {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .delegation({ delegationId })
      .presence({ memberId })
      .post({
        presence,
      })
      .then(() => {
        setForcePresenceWidgetUpdate(!forcePresenceWidgetUpdate);
        getDelegationData();
      })
      .catch((error) => {
        toastError(error);
      });
  }

  return (
    <>
      <div className="flex flex-1 flex-col">
        <HeaderTemplate>
          <PresenceWidget
            showExcusedSeperately={true}
            forceUpdate={forcePresenceWidgetUpdate}
          />
          <div className="flex flex-1 items-center justify-center gap-2">
            <Button
              faIcon="person-from-portal"
              label={m.allAbsent()}
              onClick={() => {
                if (!conferenceId || !committeeId) return;
                backend
                  .conference({ conferenceId })
                  .committee({ committeeId })
                  .presence.allAbsent.post()
                  .then((res) => {
                    if (res.status !== 200)
                      throw new Error("Failed to set all absent");
                  })
                  .catch((error) => {
                    toastError(error);
                  });
              }}
              severity="danger"
            />
            <Button
              faIcon="person-to-portal"
              label={m.allPresent()}
              onClick={() => {
                if (!conferenceId || !committeeId) return;
                backend
                  .conference({ conferenceId })
                  .committee({ committeeId })
                  .presence.allPresent.post()
                  .then((res) => {
                    if (res.status !== 200)
                      throw new Error("Failed to set all absent");
                  })
                  .catch((error) => {
                    toastError(error);
                  });
              }}
              severity="success"
            />
          </div>
        </HeaderTemplate>
        <ScrollPanel className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="flex flex-1 flex-col items-center gap-4 p-4">
            <div className="flex max-w-[700px] flex-col items-center gap-10">
              <AttendanceTable
                title={m.attendanceOfDelegations()}
                description={m.manageTheAttendanceOfDelegations()}
                delegationData={delegationData}
                updatePresence={updatePresence}
              />
              <AttendanceTable
                title={m.nonStateActors()}
                description={m.manageTheAttendanceOfDelegations()}
                delegationData={nonStateActorsData}
                updatePresence={updatePresence}
              />
            </div>
          </div>
        </ScrollPanel>
      </div>
    </>
  );
}
