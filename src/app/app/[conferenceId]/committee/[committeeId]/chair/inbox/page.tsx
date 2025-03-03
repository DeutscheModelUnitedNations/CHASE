"use client";
import React, { useState, useEffect, useContext } from "react";
import InboxTemplate from "@/lib/components/inbox/inbox_template";
import { ActionsOverlayResearchService } from "@/lib/components/dashboard/actions_overlay";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCallPoller } from "@/lib/backend/useClientSideBackendCall";
import Button from "@/lib/components/Button";

export default function InboxPage() {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const { value: messages, trigger: triggerMessages } =
    useClientSideBackendCallPoller(
      (backend) =>
        backend
          //TODO
          // biome-ignore lint/style/noNonNullAssertion:
          .conference({ conferenceId: conferenceId! })
          //TODO
          // biome-ignore lint/style/noNonNullAssertion:
          .committee({ committeeId: committeeId! })
          .messages.get(),
      10000,
    );
  const [selectedMessage, setSelectedMessage] = useState<
    NonNullable<typeof messages>[number] | null
  >(null);
  const [displayResearchDialog, setDisplayResearchDialog] = useState(false);

  useEffect(() => {
    setSelectedMessage(
      messages?.find((m) => m.id === selectedMessage?.id) ?? null,
    );
  }, [messages]);

  return (
    <>
      <ActionsOverlayResearchService
        showOverlay={displayResearchDialog}
        setShowOverlay={setDisplayResearchDialog}
        isChair
      />
      <InboxTemplate
        isResearchService={false}
        messages={messages!}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        getMessagesFunction={triggerMessages}
      />
      <div className="absolute right-5 bottom-5">
        <Button
          faIcon="plus"
          className="z-50"
          raised
          onClick={() => setDisplayResearchDialog(true)}
        />
      </div>
    </>
  );
}
