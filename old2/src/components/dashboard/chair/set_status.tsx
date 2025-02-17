import React, { useState, useContext } from "react";
import { ToastContext } from "@/contexts/toast";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useBackendTime } from "@/contexts/backendTime";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import { Dropdown } from "primereact/dropdown";
import Button from "@/components/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import type { $Enums } from "@prisma/generated/client";
import FAIcon from "@/components/font_awesome_icon";

export default function SetStatusWidget() {
  const { LL, locale } = useI18nContext();
  const { showToast, toastError } = useContext(ToastContext);
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const { currentTime } = useBackendTime();

  const [selectedStatus, setSelectedStatus] =
    useState<$Enums.CommitteeStatus | null>(null);
  const [selectedStatusUntil, setSelectedStatusUntil] = useState<Date | null>(
    null,
  );
  const [selectedStatusCustomText, setSelectedStatusCustomText] = useState<
    string | null
  >("");
  const [selectedStatusButtonLoading, setSelectedStatusButtonLoading] =
    useState(false);

  const TEMPLATE_TIMER_TIMEFRAMES = [
    { label: "5", value: 5 * 60 * 1000 },
    { label: "10", value: 10 * 60 * 1000 },
    { label: "15", value: 15 * 60 * 1000 },
    { label: "20", value: 20 * 60 * 1000 },
    { label: "30", value: 30 * 60 * 1000 },
    { label: "45", value: 45 * 60 * 1000 },
    { label: "60", value: 60 * 60 * 1000 },
  ];

  async function updateStatus() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .patch({
        //TODO
        // @ts-ignore
        status: selectedStatus ?? undefined,
        // @ts-ignore
        statusUntil: selectedStatusUntil?.toISOString() ?? undefined,
        // @ts-ignore
        statusHeadline: selectedStatusCustomText ?? undefined,
      })
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary:
              LL.chairs.dashboard.configurations.statusTimer.TOAST_SUCCESS({
                status: selectedStatusCustomText
                  ? selectedStatusCustomText
                  : selectedStatus || "",
                date: selectedStatusUntil?.toLocaleString(locale) ?? "",
              }),
          });
          setSelectedStatusButtonLoading(false);
        } else {
          throw new Error("Failed to update status");
        }
      })
      .catch((error) => {
        toastError(error);
      });
  }

  return (
    <ConfigWrapper
      title={LL.chairs.dashboard.configurations.statusTimer.TITLE()}
      description={LL.chairs.dashboard.configurations.statusTimer.DESCRIPTION()}
    >
      <div className="flex flex-col items-end gap-2">
        <div className="w-full flex gap-2">
          <Dropdown
            value={selectedStatus || committeeData?.status || null}
            options={[
              {
                label:
                  LL.participants.dashboard.timerWidget.defaultHeadlines.FORMAL(),
                value: "FORMAL",
                icon: "podium",
              },
              {
                label:
                  LL.participants.dashboard.timerWidget.defaultHeadlines.INFORMAL(),
                value: "INFORMAL",
                icon: "comments",
              },
              {
                label:
                  LL.participants.dashboard.timerWidget.defaultHeadlines.PAUSE(),
                value: "PAUSE",
                icon: "mug-hot",
              },
              {
                label:
                  LL.participants.dashboard.timerWidget.defaultHeadlines.SUSPENSION(),
                value: "SUSPENSION",
                icon: "forward-step",
              },
            ]}
            itemTemplate={(option) => (
              <div className="flex flex-gap items-center">
                <FAIcon icon={option.icon} className="w-8 mr-2" />
                {option.label}
              </div>
            )}
            onChange={(e) => {
              setSelectedStatus(e.value);
            }}
            placeholder={LL.chairs.dashboard.configurations.statusTimer.PLACEHOLDER_DROPDOWN()}
            className="flex-1"
          />
          <Calendar
            timeOnly
            value={selectedStatusUntil}
            onChange={(e) => e.value && setSelectedStatusUntil(e.value)}
            placeholder={LL.chairs.dashboard.configurations.statusTimer.PLACEHOLDER_TIME_UNITL()}
            className="flex-1"
          />
        </div>
        <div className="w-full flex gap-2">
          {TEMPLATE_TIMER_TIMEFRAMES.map((timeframe) => (
            <Button
              label={timeframe.label}
              onClick={() => {
                setSelectedStatusUntil(
                  new Date(currentTime.getTime() + timeframe.value),
                );
              }}
              size="small"
              className="flex-1"
              key={timeframe.label}
            />
          ))}
        </div>
        <InputText
          value={selectedStatusCustomText ?? undefined}
          onChange={(e) => setSelectedStatusCustomText(e.target.value)}
          placeholder={LL.chairs.dashboard.configurations.statusTimer.PLACEHOLDER_CUSTOM_TEXT()}
          className="w-full"
        />

        <Button
          faIcon="floppy-disk"
          label={LL.chairs.dashboard.configurations.statusTimer.BUTTON()}
          onClick={() => {
            updateStatus();
            setSelectedStatusCustomText("");
            setSelectedStatusUntil(null);
          }}
          loading={selectedStatusButtonLoading}
        />
      </div>
    </ConfigWrapper>
  );
}
