"use client";
import React, { useState, useEffect, useContext } from "react";
import { useBackend } from "@/contexts/backend";
import {
	CommitteeIdContext,
	ConferenceIdContext,
} from "@/contexts/committee_data";
import InboxTemplate from "@/components/inbox/inbox_template";
import Button from "@/components/button";
import { ActionsOverlayResearchService } from "@/components/dashboard/actions_overlay";
import { usePollBackendCall } from "@/hooks/pollBackendCall";

export default function InboxPage() {
	const conferenceId = useContext(ConferenceIdContext);
	const committeeId = useContext(CommitteeIdContext);
	const { backend } = useBackend();

	const [messages, triggerMessages] = usePollBackendCall(
		backend
			//TODO
			// biome-ignore lint/style/noNonNullAssertion:
			.conference({ conferenceId: conferenceId! })
			//TODO
			// biome-ignore lint/style/noNonNullAssertion:
			.committee({ committeeId: committeeId! }).messages.get,
		10000,
	);
	const [selectedMessage, setSelectedMessage] = useState<
		(typeof messages)[number] | null
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
				messages={messages}
				selectedMessage={selectedMessage}
				setSelectedMessage={setSelectedMessage}
				getMessagesFunction={triggerMessages}
			/>
			<div className="absolute bottom-5 right-5">
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
