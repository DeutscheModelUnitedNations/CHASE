import React from "react";
import { Tag } from "primereact/tag";
import { $Enums } from "@prisma/generated/client";
import { backend } from "@/lib/backend/clientsideBackend";
import { useToast } from "@/lib/contexts/toast";
import { useBackendTime } from "@/lib/contexts/backendTime";
import FAIcon from "../FAIcon";
import { languageTag } from "@/paraglide/runtime";
import { SmallFlag } from "../Flag";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<(typeof backend)["conference"]>["committee"]
    >["messages"]["get"]
  >
>["data"];

export default function MessageCard({
  isResearchService,
  message,
  selected,
  setSelected,
  getMessagesFunction,
}: {
  isResearchService: boolean;
  message: NonNullable<ChairMessages>[number];
  selected?: boolean;
  setSelected: (message: NonNullable<ChairMessages>[number]) => void;
  getMessagesFunction: () => void;
}) {
  const { toastError } = useToast();
  const { currentTime } = useBackendTime();

  async function selectMessage() {
    setSelected(message);
    if (message.status.includes($Enums.MessageStatus.UNREAD)) {
      await backend
        .message({ messageId: message.id })
        .removeStatus.post({
          status: "UNREAD",
        })
        .then((res) => {
          if (res.status !== 200) throw res.error;
        })
        .catch((err) => {
          toastError(err);
        });
      getMessagesFunction();
    }
  }

  return (
    <div
      key={message.id}
      className={`mx-2 flex flex-col justify-start rounded-md p-4 ${
        selected
          ? "bg-primary-500 text-white"
          : "bg-primary-950 hover:bg-primary-900 text-black hover:cursor-pointer"
      } pophover`}
      onClick={() => selectMessage()}
      onKeyUp={() => selectMessage()}
    >
      <div className="mb-2 flex h-8 w-full items-center justify-between gap-2">
        {message.status.includes($Enums.MessageStatus.UNREAD) && (
          <Tag
            severity="info"
            className="h-7 w-8"
            icon={<FAIcon icon="envelope" />}
          />
        )}
        {message.category !== $Enums.MessageCategory.TO_CHAIR &&
          !isResearchService && (
            <Tag
              severity="warning"
              className="h-7 w-8"
              icon={<FAIcon icon="microscope" />}
            />
          )}
        {message.status.includes($Enums.MessageStatus.PRIORITY) && (
          <Tag
            severity="danger"
            className="h-7 w-8"
            icon={<FAIcon icon="circle-exclamation" />}
          />
        )}
        {message.status.includes($Enums.MessageStatus.ASSIGNED) && (
          <Tag
            severity="success"
            className="h-7 w-8"
            icon={<FAIcon icon="user-check" />}
          />
        )}
        <div className="flex-1" />
        <h3 className="truncate text-sm">
          {new Date(message.timestamp).toLocaleTimeString(languageTag(), {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          {new Date(message.timestamp).getDay() !== currentTime.getDay() &&
            `(${new Date(message.timestamp).toLocaleDateString(languageTag(), {
              month: "numeric",
              day: "numeric",
            })})`}
        </h3>
      </div>
      <h2 className="text-lg font-bold">{message.subject}</h2>
      <p className="truncate text-sm">{message.message}</p>
      <div
        className={`flex gap-2 p-2 ${
          selected ? "bg-primary-700" : "bg-white"
        } tramsition-all mt-4 items-center rounded-md duration-300`}
      >
        <div className="w-max">
          <SmallFlag countryCode={message.metaDelegation ?? "xxx"} />
        </div>
        <h3 className="truncate text-sm font-bold text-black">
          {getFullTranslatedCountryNameFromISO3Code(
            message.metaDelegation ?? "",
          )}{" "}
          / {message.metaCommittee}
        </h3>
      </div>
    </div>
  );
}
