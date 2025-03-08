"use client";
import React, { useContext, useEffect, useState } from "react";
import Whiteboard from "@/lib/components/Whiteboard";
import { useToast } from "@/lib/contexts/toast";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import * as m from "@/paraglide/messages";
import { backend } from "@/lib/backend/clientsideBackend";
import Button from "@/lib/components/Button";

export default function ChairWhiteboard() {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { showToast, toastError } = useToast();

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
        summary: m.whiteboardIsEmpty(),
        detail:
          m.itSeemsLikeTheWhiteboardIsEmptyOrTheMessageCouldNotBeSentPleaseTryAgainLater(),
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
          summary: m.whiteboardSaved(),
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
      <div className="flex h-full w-full flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-end gap-4">
          <Button
            label={m.saveAndPublish()}
            faIcon="paper-plane"
            onClick={() => pushWhiteboardContent()}
            loading={whiteboardButtonLoading}
            // disabled={!whiteboardContentChanged}
          />
          <Button
            label={m.reset()}
            faIcon="arrow-rotate-left"
            severity="danger"
            onClick={() => resetWhiteboardContent()}
          />
        </div>
        <Whiteboard
          value={whiteboardContent}
          setContentFunction={setWhiteboardContent}
          className="h-full max-h-[80vh] flex-1"
        />
      </div>
    </>
  );
}
