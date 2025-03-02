"use client";
import React, { useState, useEffect, useContext } from "react";
import InboxTemplate from "@/lib/components/inbox/inbox_template";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { useClientSideBackendCallPoller } from "@/lib/backend/useClientSideBackendCall";

//TODO we should use a context for message storage

export default function InboxPageResearchService() {
  const conferenceId = useContext(ConferenceIdContext);

  const { value: messages, trigger } = useClientSideBackendCallPoller(
    (backend) =>
      // biome-ignore lint/style/noNonNullAssertion: we assume the conference id is set
      backend.conference({ conferenceId: conferenceId! }).messages
        .researchService.get,
    10000,
  );

  const [selectedMessage, setSelectedMessage] =
    useState<NonNullable<typeof messages>[number]>();

  useEffect(() => {
    setSelectedMessage(messages?.find((m) => m.id === selectedMessage?.id));
  }, [messages]);

  return (
    <>
      <InboxTemplate
        isResearchService
        messages={messages!}
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        selectedMessage={selectedMessage!}
        setSelectedMessage={setSelectedMessage}
        getMessagesFunction={trigger}
      />
    </>
  );
}
