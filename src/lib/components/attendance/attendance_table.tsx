import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { $Enums } from "@prisma/client";
import type { backend } from "@/lib/backend/clientsideBackend";
import FAIcon from "../FAIcon";
import ConfigWrapper from "../dashboard/chair/config_wrapper";
import WidgetBoxTemplate from "../WidgetBoxTemplate";
import { NormalFlag } from "../Flag";
import * as m from "@/paraglide/messages";
import getCountryNameByCode from "@/lib/get_country_name_by_code";

export type DelegationDataType = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<(typeof backend)["conference"]>["committee"]
    >["delegations"]["get"]
  >
>["data"];

interface AttendanceButtonOptions {
  icon: string;
  label: string;
  value: $Enums.Presence;
}

export default function AttendanceTable({
  title,
  description,
  delegationData,
  updatePresence,
}: {
  title: string;
  description?: string;
  delegationData: DelegationDataType;
  updatePresence: (
    delegationId: string,
    memberId: string,
    presence: $Enums.Presence,
  ) => void;
}) {
  const attendanceOptions: AttendanceButtonOptions[] = [
    {
      icon: "user-check",
      label: m.present(),
      value: $Enums.Presence.PRESENT,
    },
    {
      icon: "user-clock",
      label: m.excused(),
      value: $Enums.Presence.EXCUSED,
    },
    {
      icon: "user-xmark",
      label: m.absent(),
      value: $Enums.Presence.ABSENT,
    },
  ];

  const justifyTemplate = (option: AttendanceButtonOptions) => {
    return (
      <>
        <FAIcon icon={option.icon} />
        {/* <FAIcon icon={option.icon} className="mr-2" />  Option with icon and lable
        {option.label} */}
      </>
    );
  };

  return (
    <>
      <ConfigWrapper title={title} description={description}>
        {delegationData?.map((attendee) => (
          <WidgetBoxTemplate key={attendee.id}>
            <NormalFlag countryCode={attendee.nation.alpha3Code} />
            <div className="flex flex-col justify-center">
              <div className="text-gray-text text-sm font-bold dark:text-primary-800">
                <span className="mr-2 truncate">
                  {getCountryNameByCode(attendee.nation.alpha3Code)}
                </span>
              </div>
            </div>
            <div className="flex-1" />
            <SelectButton
              value={attendee.members[0].presence}
              onChange={(e) =>
                updatePresence(attendee.id, attendee.members[0].id, e.value)
              }
              options={attendanceOptions}
              itemTemplate={justifyTemplate}
              allowEmpty={false}
            />
          </WidgetBoxTemplate>
        ))}
      </ConfigWrapper>
    </>
  );
}
