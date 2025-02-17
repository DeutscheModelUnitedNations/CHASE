import React, { useState, useContext, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import Button from "@/components/button";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { ToastContext } from "@/contexts/toast";
import { InputText } from "primereact/inputtext";
import SmallInfoCard from "@/components/small_info_card";

export default function StateOfDebateWidget() {
  const { LL } = useI18nContext();
  const { showToast, toastError } = useContext(ToastContext);
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);

  const [stateOfDebate, setStateOfDebate] = useState<string>("");

  async function saveStateOfDebate() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .patch({ stateOfDebate })
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary:
              LL.chairs.dashboard.configurations.stateOfDebate.TOAST_SUCCESS({
                state: stateOfDebate,
              }),
          });
        } else throw new Error();
      })
      .catch((e) => {
        toastError(e);
      });
  }

  useEffect(() => {
    if (stateOfDebate !== "") return;
    setStateOfDebate(committeeData?.stateOfDebate || "");
  }, [committeeData?.stateOfDebate]);

  return (
    <>
      <ConfigWrapper
        title={LL.chairs.dashboard.configurations.stateOfDebate.TITLE()}
        description={LL.chairs.dashboard.configurations.stateOfDebate.DESCRIPTION()}
      >
        <SmallInfoCard
          icon="diagram-subtask"
          classNameForIconBox={
            committeeData?.stateOfDebate == null ||
            committeeData?.stateOfDebate === ""
              ? "bg-red-500 border-red-500 text-red-500"
              : undefined
          }
        >
          {committeeData?.stateOfDebate != null &&
          committeeData?.stateOfDebate !== "" ? (
            <h2 className="text-lg font-bold">{committeeData.stateOfDebate}</h2>
          ) : (
            <h2 className="text-lg font-bold">
              {LL.chairs.dashboard.configurations.stateOfDebate.CURRENTLY_NO_STATUS()}
            </h2>
          )}
        </SmallInfoCard>
        <div className="flex gap-2 w-full mt-4">
          <InputText
            placeholder={LL.chairs.dashboard.configurations.stateOfDebate.PLACEHOLDER_TEXT()}
            value={stateOfDebate}
            onChange={(e) => setStateOfDebate(e.target.value)}
            className="flex-1 w-full"
          />
          <Button
            faIcon="save"
            onClick={() => {
              saveStateOfDebate();
            }}
          />
        </div>
      </ConfigWrapper>
    </>
  );
}
