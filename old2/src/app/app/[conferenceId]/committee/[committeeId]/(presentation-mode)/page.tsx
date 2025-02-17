"use client";
import React, { useState, useEffect, useContext } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import PresenceWidget from "@/components/attendance/presence_widget";
import TimerWidget from "@/components/dashboard/timer";
import SpeakersListBlock from "@/components/speakers_list/speakers_list_block";
import WidgetTemplate from "@/components/widget_template";
import { useBackend } from "@/contexts/backend";
import { Skeleton } from "primereact/skeleton";
import { useToast } from "@/contexts/toast";
import WhiteboardWidget from "@/components/dashboard/whiteboard";
import { StatusTimer } from "@/contexts/status_timer";
import { useMediaQuery } from "react-responsive";
import { usePollBackendCall } from "@/hooks/pollBackendCall";
import SpeakersListWidget from "@/components/dashboard/speakers_list";
import FAIcon from "@/components/font_awesome_icon";

export default function CommitteePresentationMode({
	params,
}: {
	params: { conferenceId: string; committeeId: string };
}) {
	const { LL } = useI18nContext();
	const { disableToastsOnCurrentPage } = useToast();
	const { backend } = useBackend();
	const { category } = useContext(StatusTimer);

	const isDesktopOrLaptop = useMediaQuery({
		query: "(min-width: 768px)",
	});

	const [committeeData, _triggerCommitteedata] = usePollBackendCall(
		backend
			.conference({ conferenceId: params.conferenceId })
			.committee({ committeeId: params.committeeId }).get,
	);
	const [agendaItem, _triggerAgendaItem] = usePollBackendCall(
		backend
			.conference({ conferenceId: params.conferenceId })
			.committee({ committeeId: params.committeeId }).agendaItem.get,
	);

	const [remSize, setRemSize] = useState<number>(16);

	useEffect(() => {
		const presentationRem = localStorage.getItem("presentationRem");

		if (presentationRem) {
			setRemSize(Number.parseFloat(presentationRem));
		} else {
			const bodyRem = Number.parseFloat(
				getComputedStyle(document.body).fontSize,
			);
			setRemSize(bodyRem);
		}
	}, []);

	useEffect(() => {
		document.documentElement.style.fontSize = `${remSize}px`;
		localStorage.setItem("presentationRem", remSize.toString());
	}, [remSize]);

	useEffect(() => {
		disableToastsOnCurrentPage();
	}, []);

	return (
		<>
			<div className="bg-primary-900 p-4 h-screen">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1 flex flex-col gap-4 h-[calc(100vh-2rem)]">
						<WidgetTemplate>
							<h1 className="text-2xl font-bold">
								{committeeData?.name ?? (
									<Skeleton
										width="5rem"
										height="2rem"
										className="!bg-primary-900"
									/>
								)}
							</h1>
							<div className="flex gap-2 items-center mt-2">
								<FAIcon className="mx-2" icon="podium" />
								<h2 className="text-lg">
									{agendaItem?.find((item) => item.isActive)?.title ?? (
										<Skeleton
											width="5rem"
											height="1.75rem"
											className="!bg-primary-900"
										/>
									)}
								</h2>
							</div>
						</WidgetTemplate>
						<div className="hidden md:contents">
							<WidgetTemplate
								cardTitle={LL.participants.dashboard.widgetHeadlines.PRESENCE()}
							>
								<PresenceWidget />
							</WidgetTemplate>
						</div>
						<TimerWidget showOnFormalDebate={isDesktopOrLaptop} />
					</div>
					{category === "FORMAL" ? (
						<div className="flex-1 flex flex-col xl:contents gap-4">
							<div className="flex-1 flex justify-center h-1/2 medium:h-[calc(100vh-2rem)]">
								<SpeakersListBlock
									listTitle={LL.participants.speakersList.SPEAKERS_LIST()}
									typeOfList="SPEAKERS_LIST"
								/>
							</div>
							<div className="flex-1 flex justify-center h-1/2 medium:h-[calc(100vh-2rem)]">
								<SpeakersListBlock
									listTitle={LL.participants.speakersList.COMMENT_LIST()}
									typeOfList="COMMENT_LIST"
								/>
							</div>
						</div>
					) : (
						<div className="flex-1 flex flex-col gap-4 justify-center h-[calc(100vh-2rem)]">
							<SpeakersListWidget />
							<div className="flex-1 h-full w-full">
								<WhiteboardWidget />
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="absolute flex bottom-[10px] right-[10px] bg-white bg-opacity-50 rounded-full p-[10px] gap-[10px]">
				<FAIcon
					icon="arrow-rotate-left"
					className="text-black text-[20px] cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out"
					onClick={() => setRemSize(16)}
				/>
				<FAIcon
					icon="minus"
					className="text-black text-[20px] cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out"
					onClick={() => setRemSize(remSize - 1)}
				/>
				<FAIcon
					icon="plus"
					className="text-black text-[20px] cursor-pointer hover:scale-125 transition-transform duration-300 ease-in-out"
					onClick={() => setRemSize(remSize + 1)}
				/>
			</div>
		</>
	);
}
