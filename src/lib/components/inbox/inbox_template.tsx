import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import MessageCard from "./message_card";
import MessageDetails from "./message_details";
import type { backend } from "@/lib/backend/clientsideBackend";
import FAIcon from "../FAIcon";
import * as m from "@/paraglide/messages";
import NoDataPlaceholder from "../Flag";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<(typeof backend)["conference"]>["committee"]
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
  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-white">
        <div className="h-full w-1/3 border-r border-gray-200">
          <div className="flex flex-col justify-stretch">
            <div className="flex items-center gap-3 border-b border-gray-200 p-4 text-2xl">
              <FAIcon icon="inbox" className="text-primary-500" />
              <h1 className="font-bold">{m.inbox()}</h1>
            </div>
            <ScrollPanel style={{ width: "100%", height: "90vh" }}>
              <div className="flex h-full flex-col gap-2 pt-2 pb-10">
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
        <div className="h-full w-2/3">
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
            <div className="flex h-screen w-full items-center justify-center">
              <NoDataPlaceholder title={m.noMessageSelected()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
