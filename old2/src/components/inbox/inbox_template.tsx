import React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import type { BackendInstanceType } from "@/contexts/backend";
import { ScrollPanel } from "primereact/scrollpanel";
import NoDataPlaceholder from "@/components/no_data_placeholder";
import MessageCard from "./message_card";
import MessageDetails from "./message_details";
import FAIcon from "../font_awesome_icon";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
    >["messages"]["get"]
  >
>["data"];

export default function InboxTemplate({
  isResearchService,
  messages,
  selectedMessage,
  setSelectedMessage,
  getMessagesFunction,
}: {
  isResearchService: boolean;
  messages: ChairMessages | null;
  selectedMessage: NonNullable<ChairMessages>[number] | null;
  setSelectedMessage: (message: NonNullable<ChairMessages>[number]) => void;
  getMessagesFunction: () => void;
}) {
  const { LL } = useI18nContext();

  return (
    <>
      <div className="flex h-screen w-screen bg-white overflow-hidden">
        <div className="w-1/3 h-full border-r border-gray-200">
          <div className="flex flex-col justify-stretch">
            <div className="p-4 flex gap-3 text-2xl items-center border-b border-gray-200">
              <FAIcon icon="inbox" className="text-primary-500" />
              <h1 className="font-bold">{LL.navbar.INBOX()}</h1>
            </div>
            <ScrollPanel style={{ width: "100%", height: "90vh" }}>
              <div className="h-full flex flex-col gap-2 pt-2 pb-10">
                {messages?.map((message) => (
                  <MessageCard
                    key={message.id}
                    isResearchService={isResearchService}
                    message={message}
                    setSelected={setSelectedMessage}
                    selected={selectedMessage?.id === message.id}
                    getMessagesFunction={getMessagesFunction}
                  />
                ))}
              </div>
            </ScrollPanel>
          </div>
        </div>
        <div className="w-2/3 h-full">
          {selectedMessage ? (
            <>
              <div className="p-4">
                <MessageDetails
                  isResearchService={isResearchService}
                  message={selectedMessage}
                  getMessagesFunction={getMessagesFunction}
                />
              </div>
            </>
          ) : (
            <div className="h-screen w-full flex justify-center items-center">
              <NoDataPlaceholder
                title={LL.messageBoard.NO_MESSAGE_SELECTED()}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
