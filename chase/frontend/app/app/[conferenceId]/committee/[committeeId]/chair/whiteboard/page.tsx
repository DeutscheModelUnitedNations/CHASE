"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import Whiteboard from "@/components/whiteboard/whiteboard";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";

export default function ChairWhiteboard() {
  const { LL } = useI18nContext();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { showToast, toastError } = useToast();
  const { backend } = useBackend();

  const [whiteboardContent, setWhiteboardContent] = useState<
    string | null | undefined
  >(undefined);
  const [whiteboardButtonLoading, setWhiteboardButtonLoading] =
    useState<boolean>(false);
  const committeeData = useContext(CommitteeDataContext);

  useEffect(() => {
    setWhiteboardContent(committeeData?.whiteboardContent ?? "");
  }, []);

  useEffect(() => {
    if (whiteboardContent != null) return;
    committeeData?.whiteboardContent ?? "";
  }, [committeeData]);

  async function pushWhiteboardContent() {
    setWhiteboardButtonLoading(true);
    if (
      whiteboardContent === null ||
      whiteboardContent === undefined ||
      whiteboardContent === ""
    ) {
      showToast({
        severity: "warn",
        summary: LL.chairs.whiteboard.NO_CONTENT_TOAST(),
        detail: LL.chairs.whiteboard.NO_CONTENT_TOAST_DETAILS(),
        life: 3000,
      });
      setWhiteboardButtonLoading(false);
      return;
    }
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .patch({
        whiteboardContent: whiteboardContent,
      })
      .then((res) => {
        if (res.status >= 400)
          throw new Error("Failed to push whiteboard content");
        setWhiteboardButtonLoading(false);
        showToast({
          severity: "success",
          summary: LL.chairs.whiteboard.SUCCESS_TOAST(),
          life: 3000,
        });
      })
      .catch((error) => {
        toastError(error);
      });
  }

  const resetWhiteboardContent = () => {
    setWhiteboardContent(committeeData?.whiteboardContent ?? "");
  };

  return (
    <>
      <div className="flex-1 flex flex-col w-full h-full gap-4 p-4">
        <div className="flex justify-end items-center gap-4">
          <Button
            label={LL.chairs.whiteboard.SAVE_BUTTON()}
            faIcon="paper-plane"
            onClick={() => pushWhiteboardContent()}
            loading={whiteboardButtonLoading}
            // disabled={!whiteboardContentChanged}
          />
          <Button
            label={LL.chairs.whiteboard.RESET_BUTTON()}
            faIcon="arrow-rotate-left"
            severity="danger"
            onClick={() => resetWhiteboardContent()}
          />
        </div>
        <Whiteboard
          value="whiteboard-content"
          setContentFunction={setWhiteboardContent}
          className="flex-1 h-full max-h-[80vh]"
        />
      </div>
    </>
  );
}
