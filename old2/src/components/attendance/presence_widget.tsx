import React, { useState, useEffect, useContext } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { HeaderInfoBox } from "../header_template";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";
import { $Enums } from "@prisma/generated/client";
import {
  ConferenceIdContext,
  CommitteeIdContext,
  CommitteeDataContext,
} from "@/contexts/committee_data";
import FAIcon from "../font_awesome_icon";

type DelegationData = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
    >["delegations"]["get"]
  >
>["data"];

export default function PresenceWidget({
  showExcusedSeperately = false,
  forceUpdate,
}: {
  showExcusedSeperately?: boolean;
  forceUpdate?: boolean;
}) {
  const { LL } = useI18nContext();
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const { backend } = useBackend();

  const [delegationData, setDelegationData] = useState<DelegationData>([]);
  const [presentAttendees, setPresentAttendees] = useState(0);
  const [excusedAttendees, setExcusedAttendees] = useState(0);
  const [absentAttendees, setAbsentAttendees] = useState(0);

  async function getDelegationData() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .delegations.get()
      .then((response) => {
        setDelegationData(
          response.data?.filter(
            (item) => item.nation.variant === $Enums.NationVariant.NATION,
          ) ?? [],
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

  useEffect(() => {
    if (forceUpdate) {
      getDelegationData();
    }
  }, [forceUpdate]);

  const countGroup = (group: $Enums.Presence) => {
    return (
      delegationData?.filter((item) => item.members[0].presence === group)
        .length ?? 0
    );
  };

  useEffect(() => {
    setPresentAttendees(countGroup("PRESENT"));
    setExcusedAttendees(countGroup("EXCUSED"));
    setAbsentAttendees(countGroup("ABSENT"));
  }, [delegationData]);

  const MajorityInfo = ({
    name,
    majorityInPercent: majorityInDecimal,
    staticMajority,
  }: {
    name: string;
    majorityInPercent: number;
    staticMajority?: number;
  }) => {
    const majorityNeeded = (attendees: number) => {
      return Math.ceil(attendees * majorityInDecimal);
    };

    return (
      <HeaderInfoBox>
        <div className="flex items-center">{name}</div>
        <div className="flex items-center mt-2 text-2xl font-bold tabular-nums">
          {staticMajority ? staticMajority : majorityNeeded(presentAttendees)}
        </div>
      </HeaderInfoBox>
    );
  };

  const CounterCell = ({
    count,
    lable,
    icon,
  }: {
    count: number;
    lable: string;
    icon: string;
  }) => {
    return (
      <>
        <div className="flex justify-self-center items-center">
          <FAIcon icon={icon} className="mr-2" />
        </div>
        <div className="flex items-start">{lable}:</div>
        <div className="font-bold justify-self-center items-center ml-3 tabular-nums">
          {count}
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 flex gap-4 h-full justify-center">
      <HeaderInfoBox>
        <div className="grid" style={{ gridTemplateColumns: "auto 1fr auto" }}>
          <CounterCell
            count={presentAttendees}
            lable={LL.chairs.attendance.PRESENT()}
            icon="user-check"
          />
          {showExcusedSeperately && (
            <CounterCell
              count={excusedAttendees}
              lable={LL.chairs.attendance.EXCUSED()}
              icon="user-clock"
            />
          )}
          <CounterCell
            count={
              showExcusedSeperately
                ? absentAttendees
                : absentAttendees + excusedAttendees
            }
            lable={LL.chairs.attendance.ABSENT()}
            icon="user-xmark"
          />
        </div>
      </HeaderInfoBox>
      <MajorityInfo
        name="1/2"
        majorityInPercent={0.50001}
        staticMajority={
          // This handles Security Council [SC / UNSC] (or german Sicherheitsrat [SR]) edge case, where the simple majority is always 9
          // TODO this is probably only a good temporary solution.
          // We should integrate an override option in the backend schema for calculated majorities per committee.
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          ["SR", "SC", "UNSC"].includes(committeeData?.abbreviation!)
            ? 9
            : undefined
        }
      />
      <MajorityInfo name="2/3" majorityInPercent={0.66666} />
    </div>
  );
}
