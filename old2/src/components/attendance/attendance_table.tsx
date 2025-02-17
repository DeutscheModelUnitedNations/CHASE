import React from "react";
import WidgetBoxTemplate from "@/components/widget_box_template";
import { SelectButton } from "primereact/selectbutton";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { NormalFlag as Flag } from "@/components/flag_templates";
import { useI18nContext } from "@/i18n/i18n-react";
import type { BackendInstanceType } from "@/contexts/backend";
import { $Enums } from "@prisma/generated/client";
import FAIcon from "../font_awesome_icon";

export type DelegationDataType = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
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
  const { LL, locale } = useI18nContext();

  const attendanceOptions: AttendanceButtonOptions[] = [
    {
      icon: "user-check",
      label: LL.chairs.attendance.PRESENT(),
      value: $Enums.Presence.PRESENT,
    },
    {
      icon: "user-clock",
      label: LL.chairs.attendance.EXCUSED(),
      value: $Enums.Presence.EXCUSED,
    },
    {
      icon: "user-xmark",
      label: LL.chairs.attendance.ABSENT(),
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
            <Flag countryCode={attendee.nation.alpha3Code} />
            <div className="flex flex-col justify-center">
              <div className="text-sm font-bold text-gray-text dark:text-primary-800">
                <span className="mr-2 truncate">
                  {getCountryNameByCode(attendee.nation.alpha3Code, locale)}
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
