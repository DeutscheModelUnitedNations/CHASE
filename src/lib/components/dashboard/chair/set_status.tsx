import React, { useState, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import type { $Enums } from "@prisma/generated/client";
import { ToastContext } from "@/lib/contexts/toast";
import { CommitteeDataContext, CommitteeIdContext, ConferenceIdContext } from "@/lib/contexts/committee_data";
import { useBackendTime } from "@/lib/contexts/backendTime";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";
import ConfigWrapper from "./config_wrapper";
import FAIcon from "../../FAIcon";
import Button from "../../Button";

export default function SetStatusWidget() {
  const { showToast, toastError } = useContext(ToastContext);
  const conferenceId = useContext(ConferenceIdContext);
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
              m.statusTillXSaved({
                status: selectedStatusCustomText
                  ? selectedStatusCustomText
                  : selectedStatus || "",
                date: selectedStatusUntil?.toLocaleString(languageTag()) ?? "",
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
      title={m.statusTimer()}
      description={m.setTheStatusTimer()}
    >
      <div className="flex flex-col items-end gap-2">
        <div className="w-full flex gap-2">
          <Dropdown
            value={selectedStatus || committeeData?.status || null}
            options={[
              {
                label:
                  m.formal(),
                value: "FORMAL",
                icon: "podium",
              },
              {
                label:
                  m.informal(),
                value: "INFORMAL",
                icon: "comments",
              },
              {
                label:
                  m.pause(),
                value: "PAUSE",
                icon: "mug-hot",
              },
              {
                label:
                  m.suspension(),
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
            placeholder={m.selectAStatus()}
            className="flex-1"
          />
          <Calendar
            timeOnly
            value={selectedStatusUntil}
            onChange={(e) => e.value && setSelectedStatusUntil(e.value)}
            placeholder={m.until()}
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
          placeholder={m.customNameOptional()}
          className="w-full"
        />

        <Button
          faIcon="floppy-disk"
          label={m.saveStatus()}
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
