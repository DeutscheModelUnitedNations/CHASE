import type React from "react";
import type { $Enums } from "@prisma/generated/client";
import type { backend } from "@/lib/backend/clientsideBackend";
import { SpeakersListDataProvider } from "@/lib/contexts/speakers_list_data";
import SpeakerBlock from "./speaker_block";
import SpeakerQueueList from "./queue_list";

export type SpeakersListData = Awaited<
  ReturnType<ReturnType<typeof backend["speakersList"]>["get"]>
>["data"];

/**
 * This Component is used in the Speakers List and Comment List on the Speakers List Page.
 * It uses the SpeakerBlock Component to display the list with the adequate options for chairs, participants and observers.
 * If no speakers are in the list, it displays a message.
 * If the list is closed, it displays a border at the bottom, that indicates the closed state of the list.
 */

export default function SpeakersListBlock({
  typeOfList,
  listTitle,
  myCountry,
  chairOptions = false,
  children,
}: {
  typeOfList: $Enums.SpeakersListCategory;
  listTitle: string;
  myCountry?: string;
  chairOptions?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <SpeakersListDataProvider typeOfList={typeOfList}>
      <div className="flex w-full h-full flex-col bg-primary-950 dark:bg-primary-200 rounded-lg p-3 transition-all duration-500">
        <div className="font-bold mb-2 text-lg">{listTitle}</div>
        <SpeakerBlock />
        {children}
        <SpeakerQueueList myCountry={myCountry} chairOptions={chairOptions} />
      </div>
    </SpeakersListDataProvider>
  );
}
