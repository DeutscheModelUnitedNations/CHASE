"use client";
import React, { useState, useEffect, useContext } from "react";
import { useBackend } from "@/contexts/backend";
import { ConferenceIdContext } from "@/contexts/committee_data";
import InboxTemplate from "@/components/inbox/inbox_template";
import { usePollBackendCall } from "@/hooks/pollBackendCall";

//TODO we should use a context for message storage

export default function InboxPageResearchService() {
	const conferenceId = useContext(ConferenceIdContext);
	const { backend } = useBackend();

	const [messages, trigger] = usePollBackendCall(
		// biome-ignore lint/style/noNonNullAssertion: we assume the conference id is set
		backend.conference({ conferenceId: conferenceId! }).messages.researchService
			.get,
		10000,
	);

	const [selectedMessage, setSelectedMessage] =
		useState<(typeof messages)[number]>();

	useEffect(() => {
		setSelectedMessage(messages?.find((m) => m.id === selectedMessage?.id));
	}, [messages]);

	return (
		<>
			<InboxTemplate
				isResearchService
				messages={messages}
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				selectedMessage={selectedMessage!}
				setSelectedMessage={setSelectedMessage}
				getMessagesFunction={trigger}
			/>
		</>
	);
}
