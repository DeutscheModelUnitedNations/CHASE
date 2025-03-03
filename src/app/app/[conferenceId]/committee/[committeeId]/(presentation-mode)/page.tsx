"use client";
import React, { useState, useEffect, useContext } from "react";
import PresenceWidget from "@/lib/components/attendance/presence_widget";
import TimerWidget from "@/lib/components/dashboard/timer";
import SpeakersListBlock from "@/lib/components/speakers_list/speakers_list_block";
import WidgetTemplate from "@/lib/components/WidgetTemplate";
import { Skeleton } from "primereact/skeleton";
import { useToast } from "@/lib/contexts/toast";
import WhiteboardWidget from "@/lib/components/dashboard/whiteboard";
import { useMediaQuery } from "react-responsive";
import SpeakersListWidget from "@/lib/components/dashboard/speakers_list";
import { StatusTimer } from "@/lib/contexts/status_timer";
import { useClientSideBackendCallPoller } from "@/lib/backend/useClientSideBackendCall";
import * as m from "@/paraglide/messages";
import FAIcon from "@/lib/components/FAIcon";

export default function CommitteePresentationMode({
  params,
}: {
  params: Promise<{ conferenceId: string; committeeId: string }>;
}) {
  const { disableToastsOnCurrentPage } = useToast();
  const { category } = useContext(StatusTimer);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { value: committeeData } = useClientSideBackendCallPoller(
    async (backend) =>
      backend
        .conference({ conferenceId: (await params).conferenceId })
        .committee({ committeeId: (await params).committeeId })
        .get(),
  );
  const { value: agendaItem } = useClientSideBackendCallPoller(
    async (backend) =>
      backend
        .conference({ conferenceId: (await params).conferenceId })
        .committee({ committeeId: (await params).committeeId })
        .agendaItem.get(),
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
      <div className="h-screen w-full bg-primary-900 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex h-[calc(100vh-2rem)] flex-1 flex-col gap-4">
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
              <div className="mt-2 flex items-center gap-2">
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
              <WidgetTemplate cardTitle={m.majorityRatios()}>
                <PresenceWidget />
              </WidgetTemplate>
            </div>
            <TimerWidget showOnFormalDebate={isDesktopOrLaptop} />
          </div>
          {category === "FORMAL" ? (
            <div className="flex flex-1 flex-col gap-4 xl:contents">
              <div className="medium:h-[calc(100vh-2rem)] flex h-1/2 flex-1 justify-center">
                <SpeakersListBlock
                  listTitle={m.speakersList()}
                  typeOfList="SPEAKERS_LIST"
                />
              </div>
              <div className="medium:h-[calc(100vh-2rem)] flex h-1/2 flex-1 justify-center">
                <SpeakersListBlock
                  listTitle={m.questionsAndComments()}
                  typeOfList="COMMENT_LIST"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-[calc(100vh-2rem)] flex-1 flex-col justify-center gap-4">
              <SpeakersListWidget />
              <div className="h-full w-full flex-1">
                <WhiteboardWidget />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-opacity-50 absolute right-[10px] bottom-[10px] flex gap-[10px] rounded-full bg-white p-[10px]">
        <FAIcon
          icon="arrow-rotate-left"
          className="cursor-pointer text-[20px] text-black transition-transform duration-300 ease-in-out hover:scale-125"
          onClick={() => setRemSize(16)}
        />
        <FAIcon
          icon="minus"
          className="cursor-pointer text-[20px] text-black transition-transform duration-300 ease-in-out hover:scale-125"
          onClick={() => setRemSize(remSize - 1)}
        />
        <FAIcon
          icon="plus"
          className="cursor-pointer text-[20px] text-black transition-transform duration-300 ease-in-out hover:scale-125"
          onClick={() => setRemSize(remSize + 1)}
        />
      </div>
    </>
  );
}
