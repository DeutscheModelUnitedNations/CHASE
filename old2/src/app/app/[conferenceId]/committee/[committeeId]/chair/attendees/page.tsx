"use client";
import React, { useEffect, useState, useContext } from "react";
import HeaderTemplate from "@/components/header_template";
import { ScrollPanel } from "primereact/scrollpanel";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";
import { $Enums } from "@prisma/generated/client";
import PresenceWidget from "@/components/attendance/presence_widget";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import AttendanceTable, {
  type DelegationDataType,
} from "@/components/attendance/attendance_table";
import Button from "@/components/button";
import getCountryNameByCode from "@/misc/get_country_name_by_code";

export default function ChairAttendees() {
  const { LL, locale } = useI18nContext();
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { backend } = useBackend();

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
              getCountryNameByCode(a.nation.alpha3Code, locale).localeCompare(
                getCountryNameByCode(b.nation.alpha3Code, locale),
                locale,
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
      <div className="flex-1 flex flex-col">
        <HeaderTemplate>
          <PresenceWidget
            showExcusedSeperately={true}
            forceUpdate={forcePresenceWidgetUpdate}
          />
          <div className="flex-1 flex gap-2 items-center justify-center">
            <Button
              faIcon="person-from-portal"
              label={LL.chairs.attendance.SET_ALL_ABSENT()}
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
              label={LL.chairs.attendance.SET_ALL_PRESENT()}
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
        <ScrollPanel className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex-1 flex p-4 gap-4 flex-col items-center">
            <div className="flex gap-10 flex-col items-center max-w-[700px]">
              <AttendanceTable
                title={LL.chairs.attendance.nations.TITLE()}
                description={LL.chairs.attendance.nations.DESCRIPTION()}
                delegationData={delegationData}
                updatePresence={updatePresence}
              />
              <AttendanceTable
                title={LL.chairs.attendance.nsa.TITLE()}
                description={LL.chairs.attendance.nsa.DESCRIPTION()}
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
