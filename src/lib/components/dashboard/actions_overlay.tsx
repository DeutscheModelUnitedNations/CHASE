import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import type { $Enums } from "@prisma/client";
import {
  AgendaItemContext,
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { MyDelegationContext, useUserIdent } from "@/lib/contexts/user_ident";
import { useToast } from "@/lib/contexts/toast";
import * as m from "@/paraglide/messages";
import { backend } from "@/lib/backend/clientsideBackend";
import FAIcon from "../FAIcon";

interface DropdownOptions {
  label: string;
  value: $Enums.MessageCategory;
  icon: string;
}

export function ActionsOverlayChairMessage({
  showOverlay,
  setShowOverlay,
}: {
  showOverlay: boolean;
  setShowOverlay: (arg: boolean) => void;
}) {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const myDelegationData = useContext(MyDelegationContext);
  const { userIdent } = useUserIdent();
  const { showToast } = useToast();

  const [subjectLine, setSubjectLine] = React.useState("");
  const [message, setMessage] = React.useState("");

  const footerContent = ({ sendFunction }: { sendFunction: VoidFunction }) => {
    return (
      <div>
        <Button
          label={m.cancel()}
          icon="pi pi-times"
          onClick={() => closeAndResetDialog()}
          className="p-button-text"
        />
        <Button
          label={m.send()}
          icon="pi pi-check"
          onClick={() => sendFunction()}
          autoFocus
          disabled={subjectLine === "" || message === ""}
        />
      </div>
    );
  };

  const closeAndResetDialog = () => {
    setShowOverlay(false);
    setSubjectLine("");
    setMessage("");
  };

  async function sendChairMessage() {
    if (!conferenceId || !committeeId || !userIdent?.id) {
      showToast({
        severity: "error",
        summary: m.errorWhileSending(),
        detail: m.theMessageCouldNotBeSentPleaseTryAgainLater(),
      });
      return;
    }
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .messages.post({
        category: "TO_CHAIR",
        subject: subjectLine,
        message: message,
        metaEmail: userIdent?.email,
        metaDelegation: myDelegationData.delegation?.nation.alpha3Code,
        metaCommittee: committeeData?.name,
        author: {
          connect: {
            id: userIdent.id,
          },
        },
      })
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary: m.messageSentSuccessfully(),
            detail: m.theChairsWillContactYouSoon(),
          });
          closeAndResetDialog();
        }
      })
      .catch((err) => {
        showToast({
          severity: "error",
          summary: m.errorWhileSending(),
          detail: m.theMessageCouldNotBeSentPleaseTryAgainLater(),
        });
        console.error(err);
      });
  }

  return (
    <>
      <Dialog
        header={m.sendAMessageToTheChair()}
        visible={showOverlay}
        style={{ width: "50vw" }}
        footer={footerContent({ sendFunction: sendChairMessage })}
        onHide={() => setShowOverlay(false)}
      >
        <div className="mt-1 flex flex-col gap-2">
          <InputText
            placeholder={m.subject()}
            value={subjectLine}
            onChange={(e) => setSubjectLine(e.target.value)}
          />
          <InputTextarea
            rows={5}
            autoResize
            placeholder={m.message()}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* TODO File Upload */}
        </div>
      </Dialog>
    </>
  );
}

export function ActionsOverlayResearchService({
  showOverlay,
  setShowOverlay,
  isChair = false,
}: {
  showOverlay: boolean;
  setShowOverlay: (arg: boolean) => void;
  isChair?: boolean;
}) {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const myDelegationData = useContext(MyDelegationContext);
  const agendaItem = useContext(AgendaItemContext);
  const { userIdent } = useUserIdent();
  const { showToast } = useToast();

  const [category, setCategory] = React.useState<
    $Enums.MessageCategory | undefined
  >(undefined);
  const categoryOption: DropdownOptions[] = [
    {
      label: m.requestGuestSpeaker(),
      value: "GUEST_SPEAKER",
      icon: "podium",
    },
    {
      label: m.factCheck(),
      value: "FACT_CHECK",
      icon: "exclamation-triangle",
    },
    {
      label: m.informationRequest(),
      value: "INFORMATION",
      icon: "question-circle",
    },
    {
      label: m.generalSecretaryRequest(),
      value: "GENERAL_SECRETARY",
      icon: "user-tie",
    },
    {
      label: m.other(),
      value: "OTHER",
      icon: "paper-plane",
    },
  ];
  const [subjectLine, setSubjectLine] = React.useState("");
  const [message, setMessage] = React.useState("");

  const categoryOptionTemplate = (option: DropdownOptions) => {
    return (
      <div className="flex items-center gap-4">
        <FAIcon icon={option.icon} />
        <span>{option.label}</span>
      </div>
    );
  };

  // @ts-ignore
  const categoryOptionSelectedTemplate = (option: DropdownOptions, props) => {
    // TODO type "props" correctly
    if (option) {
      return categoryOptionTemplate(option);
    }
    return props.placeholder;
  };

  const footerContent = ({ sendFunction }: { sendFunction: VoidFunction }) => {
    return (
      <div>
        <Button
          label={m.cancel()}
          icon="pi pi-times"
          onClick={() => closeAndResetDialog()}
          className="p-button-text"
        />
        <Button
          label={m.send()}
          icon="pi pi-check"
          onClick={() => sendFunction()}
          autoFocus
          disabled={subjectLine === "" || message === ""}
        />
      </div>
    );
  };

  const closeAndResetDialog = () => {
    setShowOverlay(false);
    setCategory(undefined);
    setSubjectLine("");
    setMessage("");
  };

  async function sendResearchMessage() {
    if (!conferenceId || !userIdent?.id || !committeeId || !category) {
      showToast({
        severity: "error",
        summary: m.errorWhileSending(),
        detail: m.theMessageCouldNotBeSentPleaseTryAgainLater(),
      });
      console.error("Missing data to send message");
      return;
    }

    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .messages.post({
        category: category,
        subject: subjectLine,
        message: message,
        author: {
          connect: {
            id: userIdent.id,
          },
        },
        metaEmail: userIdent?.email,
        metaDelegation:
          (isChair ? "uno" : myDelegationData.delegation?.nation.alpha3Code) ??
          null,
        metaCommittee: committeeData?.name ?? null,
        metaAgendaItem: agendaItem?.title ?? null,
      })
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary: m.messageSentSuccessfully(),
            detail: m.researchServiceWillContactYouSoon(),
          });
          closeAndResetDialog();
        }
      })
      .catch((err) => {
        showToast({
          severity: "error",
          summary: m.errorWhileSending(),
          detail: m.theMessageCouldNotBeSentPleaseTryAgainLater(),
        });
        console.error(err);
      });
  }

  return (
    <>
      <Dialog
        header={m.sendAMessageToTheResearchService()}
        visible={showOverlay}
        style={{ width: "50vw" }}
        footer={footerContent({ sendFunction: sendResearchMessage })}
        onHide={() => setShowOverlay(false)}
      >
        <div className="mt-1 flex flex-col gap-2">
          <Dropdown
            value={category}
            onChange={(e) => setCategory(e.value)}
            options={categoryOption}
            optionLabel={m.category()}
            placeholder={m.selectACategory()}
            itemTemplate={categoryOptionTemplate}
            valueTemplate={categoryOptionSelectedTemplate}
            className="md:w-14rem w-full"
          />
          <InputText
            placeholder={m.subject()}
            value={subjectLine}
            onChange={(e) => setSubjectLine(e.target.value)}
          />
          <InputTextarea
            rows={5}
            autoResize
            placeholder={m.message()}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <p>
            <FAIcon icon="info-circle" />{" "}
            <small>{m.thisRequestWillBeFirstCheckedByTheChair()}</small>
          </p>
        </div>
      </Dialog>
    </>
  );
}
