import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { useI18nContext } from "@/i18n/i18n-react";
import {
  CommitteeIdContext,
  CommitteeDataContext,
  AgendaItemContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { MyDelegationContext, useUserIdent } from "@/contexts/user_ident";
import { useToast } from "@/contexts/toast";
import type { $Enums } from "@prisma/generated/client";
import { useBackend } from "@/contexts/backend";
import FAIcon from "../font_awesome_icon";

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
  const { LL } = useI18nContext();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const myDelegationData = useContext(MyDelegationContext);
  const { userIdent } = useUserIdent();
  const { showToast } = useToast();
  const { backend } = useBackend();

  const [subjectLine, setSubjectLine] = React.useState("");
  const [message, setMessage] = React.useState("");

  const footerContent = ({ sendFunction }: { sendFunction: VoidFunction }) => {
    return (
      <div>
        <Button
          label={LL.participants.dashboard.actionsWidget.contactForm.CANCEL_BUTTON()}
          icon="pi pi-times"
          onClick={() => closeAndResetDialog()}
          className="p-button-text"
        />
        <Button
          label={LL.participants.dashboard.actionsWidget.contactForm.SEND_BUTTON()}
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
        summary: LL.participants.dashboard.actionsWidget.toast.ERROR_SUMMARY(),
        detail: LL.participants.dashboard.actionsWidget.toast.ERROR_DETAIL(),
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
        metaEmail: userIdent?.emails[0]?.email,
        metaDelegation: myDelegationData.delegation?.nation.alpha3Code,
        metaCommittee: committeeData?.name,
        author: {
          connect: {
            id: userIdent.id
          }
        }
      })
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary:
              LL.participants.dashboard.actionsWidget.toast.SUCCESS_CHAIR_SUMMARY(),
            detail:
              LL.participants.dashboard.actionsWidget.toast.SUCCESS_CHAIR_DETAIL(),
          });
          closeAndResetDialog();
        }
      })
      .catch((err) => {
        showToast({
          severity: "error",
          summary:
            LL.participants.dashboard.actionsWidget.toast.ERROR_SUMMARY(),
          detail: LL.participants.dashboard.actionsWidget.toast.ERROR_DETAIL(),
        });
        console.error(err);
      });
  }

  return (
    <>
      <Dialog
        header={LL.participants.dashboard.actionsWidget.contactForm.HEADLINE_CHAIR()}
        visible={showOverlay}
        style={{ width: "50vw" }}
        footer={footerContent({ sendFunction: sendChairMessage })}
        onHide={() => setShowOverlay(false)}
      >
        <div className="flex flex-col gap-2 mt-1">
          <InputText
            placeholder={LL.participants.dashboard.actionsWidget.contactForm.SUBJECT_PLACEHOLDER()}
            value={subjectLine}
            onChange={(e) => setSubjectLine(e.target.value)}
          />
          <InputTextarea
            rows={5}
            autoResize
            placeholder={LL.participants.dashboard.actionsWidget.contactForm.MESSAGE_PLACEHOLDER()}
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
  const { LL } = useI18nContext();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);
  const myDelegationData = useContext(MyDelegationContext);
  const agendaItem = useContext(AgendaItemContext);
  const { userIdent } = useUserIdent();
  const { showToast } = useToast();
  const { backend } = useBackend();

  const [category, setCategory] = React.useState<
    $Enums.MessageCategory | undefined
  >(undefined);
  const categoryOption: DropdownOptions[] = [
    {
      label:
        LL.participants.dashboard.actionsWidget.contactForm.categoryOptions.GUEST_SPEAKER(),
      value: "GUEST_SPEAKER",
      icon: "podium",
    },
    {
      label:
        LL.participants.dashboard.actionsWidget.contactForm.categoryOptions.FACT_CHECK(),
      value: "FACT_CHECK",
      icon: "exclamation-triangle",
    },
    {
      label:
        LL.participants.dashboard.actionsWidget.contactForm.categoryOptions.INFORMATION(),
      value: "INFORMATION",
      icon: "question-circle",
    },
    {
      label:
        LL.participants.dashboard.actionsWidget.contactForm.categoryOptions.GENERAL_SECRETARY(),
      value: "GENERAL_SECRETARY",
      icon: "user-tie",
    },
    {
      label:
        LL.participants.dashboard.actionsWidget.contactForm.categoryOptions.OTHER(),
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
          label={LL.participants.dashboard.actionsWidget.contactForm.CANCEL_BUTTON()}
          icon="pi pi-times"
          onClick={() => closeAndResetDialog()}
          className="p-button-text"
        />
        <Button
          label={LL.participants.dashboard.actionsWidget.contactForm.SEND_BUTTON()}
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
        summary: LL.participants.dashboard.actionsWidget.toast.ERROR_SUMMARY(),
        detail: LL.participants.dashboard.actionsWidget.toast.ERROR_DETAIL(),
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
            id: userIdent.id
          }
        },
        metaEmail: userIdent?.emails[0]?.email,
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
            summary:
              LL.participants.dashboard.actionsWidget.toast.SUCCESS_RESEARCH_SUMMARY(),
            detail:
              LL.participants.dashboard.actionsWidget.toast.SUCCESS_RESEARCH_DETAIL(),
          });
          closeAndResetDialog();
        }
      })
      .catch((err) => {
        showToast({
          severity: "error",
          summary:
            LL.participants.dashboard.actionsWidget.toast.ERROR_SUMMARY(),
          detail: LL.participants.dashboard.actionsWidget.toast.ERROR_DETAIL(),
        });
        console.error(err);
      });
  }

  return (
    <>
      <Dialog
        header={LL.participants.dashboard.actionsWidget.contactForm.HEADLINE_RESEARCH_SERVICE()}
        visible={showOverlay}
        style={{ width: "50vw" }}
        footer={footerContent({ sendFunction: sendResearchMessage })}
        onHide={() => setShowOverlay(false)}
      >
        <div className="flex flex-col gap-2 mt-1">
          <Dropdown
            value={category}
            onChange={(e) => setCategory(e.value)}
            options={categoryOption}
            optionLabel={LL.participants.dashboard.actionsWidget.contactForm.CATEGORY_LABEL()}
            placeholder={LL.participants.dashboard.actionsWidget.contactForm.CATEGORY_PLACEHOLDER()}
            itemTemplate={categoryOptionTemplate}
            valueTemplate={categoryOptionSelectedTemplate}
            className="w-full md:w-14rem"
          />
          <InputText
            placeholder={LL.participants.dashboard.actionsWidget.contactForm.SUBJECT_PLACEHOLDER()}
            value={subjectLine}
            onChange={(e) => setSubjectLine(e.target.value)}
          />
          <InputTextarea
            rows={5}
            autoResize
            placeholder={LL.participants.dashboard.actionsWidget.contactForm.MESSAGE_PLACEHOLDER()}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <p>
            <FAIcon icon="info-circle" />{" "}
            <small>
              {LL.participants.dashboard.actionsWidget.contactForm.INFO_MESSAGE()}
            </small>
          </p>
        </div>
      </Dialog>
    </>
  );
}
