import React, { useState, useContext, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { ToastContext } from "@/lib/contexts/toast";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import ConfigWrapper from "./config_wrapper";
import SmallInfoCard from "../../SmallInfoCard";
import Button from "../../Button";

export default function StateOfDebateWidget() {
  const { showToast, toastError } = useContext(ToastContext);
  const conferenceId = useContext(ConferenceIdContext);
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
            summary: m.statusXSaved({
              status: stateOfDebate,
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
        title={m.stateOfDebate()}
        description={m.setStateOfDebate()}
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
            <h2 className="text-lg font-bold">{m.noStateSet()}</h2>
          )}
        </SmallInfoCard>
        <div className="mt-4 flex w-full gap-2">
          <InputText
            placeholder={m.stateOfDebate()}
            value={stateOfDebate}
            onChange={(e) => setStateOfDebate(e.target.value)}
            className="w-full flex-1"
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
