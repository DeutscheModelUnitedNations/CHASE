import React, { useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import { $Enums } from "@prisma/client";
import { backend } from "@/lib/backend/clientsideBackend";
import { useToast } from "@/lib/contexts/toast";
import Button from "../Button";
import * as m from "@/paraglide/messages";
import FAIcon from "../FAIcon";
import SmallInfoCard from "../SmallInfoCard";
import { languageTag } from "@/paraglide/runtime";
import { messageCategoryTranslation } from "@/lib/translationUtils";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import { LargeFlag } from "../Flag";
import PrintMessageDocument from "./print_message";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<(typeof backend)["conference"]>["committee"]
    >["messages"]["get"]
  >
>["data"];

export default function MessageDetails({
  isResearchService,
  message,
  getMessagesFunction,
}: {
  isResearchService: boolean;
  message: NonNullable<ChairMessages>[number];
  getMessagesFunction: () => void;
}) {
  const { toastError, showToast } = useToast();

  const [showPrintDialog, setShowPrintDialog] = useState<boolean>(false);

  const getMessageCategoryIcon = () => {
    switch (message.category) {
      case $Enums.MessageCategory.TO_CHAIR:
        return "inbox-full";
      case $Enums.MessageCategory.GUEST_SPEAKER:
        return "podium";
      case $Enums.MessageCategory.FACT_CHECK:
        return "comment-exclamation";
      case $Enums.MessageCategory.INFORMATION:
        return "circle-question";
      case $Enums.MessageCategory.GENERAL_SECRETARY:
        return "user-tie";
      case $Enums.MessageCategory.OTHER:
        return "paper-plane";
    }
  };

  const getMessageCategoryClassNames = () => {
    switch (message.category) {
      case $Enums.MessageCategory.TO_CHAIR:
        return undefined;
      case $Enums.MessageCategory.GUEST_SPEAKER:
        return ["bg-red-500 text-red-500 border-red-500", "bg-red-500"];
      case $Enums.MessageCategory.FACT_CHECK:
        return [
          "bg-secondary-500 text-secondary-400 border-secondary-400",
          "bg-secondary-500",
        ];
      case $Enums.MessageCategory.INFORMATION:
        return [
          "bg-secondary-500 text-secondary-400 border-secondary-400",
          "bg-secondary-500",
        ];
      case $Enums.MessageCategory.GENERAL_SECRETARY:
        return ["bg-red-500 text-red-500 border-red-500", "bg-red-500"];
      case $Enums.MessageCategory.OTHER:
        return undefined;
    }
  };

  const startContent = (
    <div className="flex gap-2">
      <Button
        faIcon={
          message?.status.includes($Enums.MessageStatus.UNREAD)
            ? "eye-slash"
            : "eye"
        }
        tooltip={m.markAsUnread()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
        onClick={async () => {
          if (message.status.includes($Enums.MessageStatus.UNREAD)) {
            await backend
              .message({ messageId: message.id })
              .removeStatus.post({
                status: "UNREAD",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          } else {
            await backend
              .message({ messageId: message.id })
              .setStatus.post({
                status: "UNREAD",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          }
          getMessagesFunction();
        }}
      />
      <Button
        faIcon="exclamation-circle"
        tooltip={m.markAsPriority()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
        severity={
          message?.status.includes($Enums.MessageStatus.PRIORITY)
            ? "danger"
            : "info"
        }
        onClick={async () => {
          if (message.status.includes($Enums.MessageStatus.PRIORITY)) {
            await backend
              .message({ messageId: message.id })
              .removeStatus.post({
                status: "PRIORITY",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          } else {
            await backend
              .message({ messageId: message.id })
              .setStatus.post({
                status: "PRIORITY",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          }
          getMessagesFunction();
        }}
      />
      <Button
        tooltip={m.markAsAssigned()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
        faIcon={
          message?.status.includes($Enums.MessageStatus.ASSIGNED)
            ? "user-xmark"
            : "user-check"
        }
        severity={
          message?.status.includes($Enums.MessageStatus.ASSIGNED)
            ? "success"
            : "info"
        }
        onClick={async () => {
          if (message.status.includes($Enums.MessageStatus.ASSIGNED)) {
            await backend
              .message({ messageId: message.id })
              .removeStatus.post({
                status: "ASSIGNED",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          } else {
            await backend
              .message({ messageId: message.id })
              .setStatus.post({
                status: "ASSIGNED",
              })
              .then((res) => {
                if (res.status !== 200) throw res.error;
                getMessagesFunction();
              })
              .catch((err) => {
                toastError(err);
              });
          }
          getMessagesFunction();
        }}
      />
      <Button
        faIcon="trash"
        severity="danger"
        tooltip={m.delete_()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
        onClick={async () => {
          await backend
            .message({ messageId: message.id })
            .setStatus.post({
              status: "ARCHIVED",
            })
            .then((res) => {
              if (res.status !== 200) throw res.error;
              showToast({
                severity: "warn",
                summary: m.messageArchived(),
                detail: m.thisMessageHasBeenArchived(),
              });
              getMessagesFunction();
            })
            .catch((err) => {
              toastError(err);
            });
          getMessagesFunction();
        }}
      />
    </div>
  );

  const centerContent = (
    <div className="flex gap-2">
      <Button
        faIcon="mail-forward"
        label={m.sendToResearchService()}
        severity="warning"
        onClick={async () => {
          await backend
            .message({ messageId: message.id })
            .forwardToResearchService.post()
            .then((res) => {
              if (res.status !== 200) throw res.error;
              showToast({
                severity: "success",
                summary: m.messageForwarded(),
                detail: m.thisMessageHasBeenForwardedToResearchService(),
              });
              getMessagesFunction();
            })
            .catch((err) => {
              toastError(err);
            });
          getMessagesFunction();
        }}
      />
    </div>
  );

  const endContent = (
    <div className="flex gap-2">
      <Button
        faIcon="print"
        onClick={() => setShowPrintDialog(true)}
        tooltip={m.printMessage()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
      />
      <Button
        faIcon="mail-reply"
        tooltip={m.replyViaEmail()}
        tooltipOptions={{ showDelay: 800, hideDelay: 300, position: "bottom" }}
        onClick={() => window.open(`mailto:${message?.metaEmail}`)}
      />
    </div>
  );

  return (
    <ScrollPanel className="h-screen w-full">
      <Toolbar
        className="mb-6 w-full"
        start={startContent}
        center={centerContent}
        end={endContent}
      />
      <div className="flex flex-col gap-2">
        <div className="flex h-8 items-center justify-between">
          <div className="flex items-center gap-2">
            {message.status.includes($Enums.MessageStatus.UNREAD) && (
              <Tag
                value={m.unread()}
                severity="info"
                className="w-max"
                icon={<FAIcon icon="envelope" className="mr-2" />}
              />
            )}
            {message.category !== $Enums.MessageCategory.TO_CHAIR &&
              !isResearchService && (
                <Tag
                  value={m.RS()}
                  severity="warning"
                  className="w-max"
                  icon={<FAIcon icon="microscope" className="mr-2" />}
                />
              )}
            {message.status.includes($Enums.MessageStatus.PRIORITY) && (
              <Tag
                value={m.priority()}
                severity="danger"
                className="w-max"
                icon={<FAIcon icon="circle-exclamation" className="mr-2" />}
              />
            )}
            {message.status.includes($Enums.MessageStatus.ASSIGNED) && (
              <Tag
                value={m.assigned()}
                severity="success"
                className="w-max"
                icon={<FAIcon icon="user-check" className="mr-2" />}
              />
            )}
          </div>
          <h3 className="text-md truncate">
            {m.onDateAtTime({
              date: new Date(message.timestamp).toLocaleDateString(
                languageTag(),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              ),
              time: new Date(message.timestamp).toLocaleTimeString(
                languageTag(),
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              ),
            })}
          </h3>
        </div>
        <SmallInfoCard
          //@ts-ignore
          icon={getMessageCategoryIcon()}
          classNameForIconBox={getMessageCategoryClassNames()?.[0]}
          classNameForContentBox={getMessageCategoryClassNames()?.[1]}
          className="font-bold"
        >
          {messageCategoryTranslation(message.category)}
        </SmallInfoCard>

        <h1 className="my-4 text-2xl font-bold">{message.subject}</h1>
        <p>{message.message}</p>

        <div className="my-4 flex items-center gap-4 rounded-xl bg-primary-950 p-4">
          <LargeFlag countryCode={message.metaDelegation ?? "xxx"} />
          <div className="flex flex-1 flex-col">
            <h2 className="text-lg font-bold">
              {getFullTranslatedCountryNameFromISO3Code(
                message.metaDelegation ?? "",
              )}
            </h2>
            <h2 className="text-md">{message.metaCommittee}</h2>
          </div>
        </div>
      </div>
      <PrintMessageDocument
        message={message}
        showDialog={showPrintDialog}
        setShowDialog={setShowPrintDialog}
      />
    </ScrollPanel>
  );
}
