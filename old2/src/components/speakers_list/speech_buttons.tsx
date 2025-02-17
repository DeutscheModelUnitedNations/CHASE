import React, { useEffect, useState, useContext } from "react";
import Button from "@components/button";
import { SplitButton } from "primereact/splitbutton";
import { Dialog } from "primereact/dialog";
import { useI18nContext } from "@/i18n/i18n-react";
import AddSpeakerOverlay from "./add_speaker";
import ChangeSpeechTimeOverlay from "./change_speech_time";
import useMousetrap from "mousetrap-react";
import { useBackend } from "@/contexts/backend";
import { $Enums } from "@prisma/generated/client";
import { useToast } from "@/contexts/toast";
import {
  ConferenceIdContext,
  CommitteeIdContext,
} from "@/contexts/committee_data";
import { SpeakersListDataContext } from "@/contexts/speakers_list_data";
import { useUserIdent } from "@/contexts/user_ident";
import { ConfirmDialog } from "primereact/confirmdialog";
import type { MenuItem } from "primereact/menuitem";
import { useBackendCall } from "@/hooks/useBackendCall";
import FAIcon from "../font_awesome_icon";

/**
 * This component is used to display the buttons for the Speakers List and Comment List on the Speakers List Page for participants.
 * It uses the Button Component from PrimeReact.
 * The buttons are different depending on whether the participant is on the list or not.
 * If the list is closed, the button to add a participant to the list is disabled.
 * If the participant is on the list, the button to remove the participant from the list is displayed.
 * If the participant is not on the list, the button to add the participant to the list is displayed.
 */

export function ParticipantSpeechButtons() {
  const { LL } = useI18nContext();
  const { showToast } = useToast();

  const { backend } = useBackend();
  const speakersListData = useContext(SpeakersListDataContext);
  const { userIdent } = useUserIdent();
  const [userOnSpeakersList, setUserOnSpeakersList] = useState(false);

  useEffect(() => {
    if (!speakersListData || !userIdent?.id) return;
    setUserOnSpeakersList(
      speakersListData.speakers.some(
        (speaker) => speaker.committeeMember.userId === userIdent?.id,
      ),
    );
  }, [speakersListData, userIdent]);

  async function addToSpeakersList() {
    if (!speakersListData || !userIdent?.id) return;
    backend
      .speakersList({ speakersListId: speakersListData.id })
      .addSpeaker.user({ userId: userIdent.id })
      .post()
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary: LL.participants.speakersList.toast.ADDED_SUCCESS_SUMMARY(),
            detail: LL.participants.speakersList.toast.ADDED_SUCCESS_DETAIL(
              speakersListData.type,
            ),
          });
        } else if (res.status === 403) {
          showToast({
            severity: "warn",
            summary:
              LL.participants.speakersList.toast.ADDED_FORBIDDEN_SUMMARY(),
            detail: LL.participants.speakersList.toast.ADDED_FORBIDDEN_DETAIL(),
          });
        } else if (res.status === 409) {
          showToast({
            severity: "error",
            summary:
              LL.participants.speakersList.toast.ADDED_ALREADY_ON_LIST_SUMMARY(),
            detail:
              LL.participants.speakersList.toast.ADDED_ALREADY_ON_LIST_DETAIL(),
          });
        } else {
          showToast({
            severity: "error",
            summary: LL.participants.speakersList.toast.ADDED_ERROR_SUMMARY(),
            detail: LL.participants.speakersList.toast.ADDED_ERROR_DETAIL(),
          });
        }
      });
  }

  async function removeFromSpeakersList() {
    if (!speakersListData || !userIdent?.id) return;
    backend
      .speakersList({ speakersListId: speakersListData.id })
      .removeSpeaker.user({ userId: userIdent.id })
      .delete()
      .then((res) => {
        if (res.status === 200) {
          showToast({
            severity: "success",
            summary:
              LL.participants.speakersList.toast.REMOVED_SUCCESS_SUMMARY(),
            detail: LL.participants.speakersList.toast.REMOVED_SUCCESS_DETAIL(
              speakersListData.type,
            ),
          });
        } else {
          showToast({
            severity: "error",
            summary: LL.participants.speakersList.toast.REMOVED_ERROR_SUMMARY(),
            detail: LL.participants.speakersList.toast.REMOVED_ERROR_DETAIL(),
          });
        }
      });
  }

  return (
    speakersListData?.agendaItem.committee
      .allowDelegationsToAddThemselvesToSpeakersList && (
      <div className="flex flex-col gap-2 items-start justify-center mt-3">
        {userOnSpeakersList ? (
          <Button
            label={LL.participants.speakersList.REMOVE_FROM_LIST_BUTTON()}
            faIcon="trash-can-xmark"
            size="small"
            severity="danger"
            onClick={() => removeFromSpeakersList()}
          />
        ) : (
          <Button
            label={
              speakersListData?.isClosed
                ? LL.participants.speakersList.LIST_CLOSED_BUTTON()
                : LL.participants.speakersList.ADD_TO_LIST_BUTTON()
            }
            faIcon={speakersListData?.isClosed ? "lock" : "podium"}
            size="small"
            disabled={speakersListData?.isClosed}
            onClick={() => addToSpeakersList()}
          />
        )}
      </div>
    )
  );
}

/**
 * This component is used to display the buttons and options for the Speakers List and Comment List on the Speakers List Page for chairs.
 * It uses the Button and SplitButton Components from PrimeReact.
 * The buttons include the functionality to open and close the list, clear the list, and add a participant to the list as well as start and pause the timer.
 * Chairs can also add or remove time from the clock and reset the clock.
 * The add speaker button opens the AddSpeakerOverlay component.
 */

export function ChairSpeechButtons({
  typeOfList,
}: {
  typeOfList: $Enums.SpeakersListCategory;
}) {
  const { LL } = useI18nContext();
  const { toastError } = useToast();
  const { backend } = useBackend();

  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const speakersListData = useContext(SpeakersListDataContext);

  const [nextSpeakerWarningVisible, setNextSpeakerWarningVisible] =
    useState(false);

  const [addSpeakersOverlayVisible, setAddSpeakersOverlayVisible] =
    useState(false);

  const [changeSpeechTimeOverlayVisible, setChangeSpeechTimeOverlayVisible] =
    useState(false);

  const [countries] = useBackendCall(
    backend
      // biome-ignore lint/style/noNonNullAssertion:
      .conference({ conferenceId: conferenceId! })
      // biome-ignore lint/style/noNonNullAssertion:
      .committee({ committeeId: committeeId! }).delegations.get,
    false,
  );

  const splitButtonItems: MenuItem[] = [
    {
      label: LL.chairs.speakersList.buttons.OPEN_LIST(),
      icon: <FAIcon icon={"lock-open"} className="mr-2" />,
      visible: speakersListData?.isClosed,
      command: () => {
        if (!speakersListData) return;
        backend
          .speakersList({ speakersListId: speakersListData.id })
          .open.post();
      },
    },
    {
      label: LL.chairs.speakersList.buttons.CLOSE_LIST(),
      icon: <FAIcon icon={"lock"} className="mr-2" />,
      visible: !!(speakersListData && !speakersListData?.isClosed),
      command: () => {
        if (!speakersListData) return;
        backend
          .speakersList({ speakersListId: speakersListData.id })
          .close.post();
      },
    },
    {
      label: LL.chairs.speakersList.buttons.CLEAR_LIST(),
      icon: <FAIcon icon="trash-can-xmark" className="mr-2" />,
      disabled: speakersListData?.speakers.length === 0,
      command: () => {
        if (!speakersListData) return;
        backend
          .speakersList({ speakersListId: speakersListData.id })
          .clearList.delete();
      },
    },
    {
      label: LL.chairs.speakersList.buttons.CHANGE_SPEECH_TIME(),
      icon: <FAIcon icon="hourglass-clock" className="mr-2" />,
      command: () => setChangeSpeechTimeOverlayVisible(true),
    },
  ];

  useMousetrap(
    $Enums.SpeakersListCategory.SPEAKERS_LIST === typeOfList ? "a" : "shift+a",
    () => !addSpeakersOverlayVisible && setAddSpeakersOverlayVisible(true),
  );
  useMousetrap(
    $Enums.SpeakersListCategory.SPEAKERS_LIST === typeOfList ? "s" : "shift+s",
    () => {
      if (addSpeakersOverlayVisible || !speakersListData) return;
      if (speakersListData?.startTimestamp == null) {
        backend
          .speakersList({ speakersListId: speakersListData.id })
          .startTimer.post();
      } else {
        backend
          .speakersList({ speakersListId: speakersListData.id })
          .stopTimer.post();
      }
    },
  );
  useMousetrap(
    $Enums.SpeakersListCategory.SPEAKERS_LIST === typeOfList ? "r" : "shift+r",
    () => {
      if (addSpeakersOverlayVisible || !speakersListData) return;
      backend
        .speakersList({ speakersListId: speakersListData.id })
        .resetTimer.post();
    },
  );
  useMousetrap(
    $Enums.SpeakersListCategory.SPEAKERS_LIST === typeOfList ? "n" : "shift+n",
    () => {
      if (addSpeakersOverlayVisible || !speakersListData) return;
      setNextSpeakerWarningVisible(true);
    },
  );

  const listTypeMap: {
    [key in $Enums.SpeakersListCategory]: string;
  } = {
    SPEAKERS_LIST: LL.participants.speakersList.SPEAKERS_LIST(),
    COMMENT_LIST: LL.participants.speakersList.COMMENT_LIST(),
    MODERATED_CAUCUS: LL.participants.speakersList.MODERATED_CAUCUS(),
  };

  return (
    <div className="flex gap-2 flex-col items-start justify-center mt-3">
      <Dialog
        visible={nextSpeakerWarningVisible}
        onHide={() => setNextSpeakerWarningVisible(false)}
        header={LL.chairs.speakersList.confirm.NEXT_SPEAKER_HEADER({
          list: listTypeMap[typeOfList as $Enums.SpeakersListCategory],
        })}
        footer={
          <div className="flex w-full gap-2 items-center justify-start flex-row-reverse">
            <Button
              label={LL.chairs.speakersList.confirm.NEXT_SPEAKER_ACCEPT()}
              onClick={() => {
                if (!speakersListData) return;
                backend
                  .speakersList({ speakersListId: speakersListData.id })
                  .nextSpeaker.post();
                setNextSpeakerWarningVisible(false);
              }}
              severity={
                typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
                  ? "danger"
                  : "warning"
              }
              autoFocus
              keyboardShortcut="⏎"
            />
            <Button
              label={LL.chairs.speakersList.confirm.NEXT_SPEAKER_REJECT()}
              onClick={() => setNextSpeakerWarningVisible(false)}
              text
            />
          </div>
        }
        closable={false}
        dismissableMask
      >
        <div className="flex gap-10 mx-10 items-center justify-start">
          <FAIcon
            icon="exclamation-triangle"
            beatFade
            size={"3x"}
            className={
              typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
                ? "text-red-500"
                : "text-yellow-500"
            }
          />
          <div>{LL.chairs.speakersList.confirm.NEXT_SPEAKER_MESSAGE()}</div>
        </div>
      </Dialog>
      <div className="flex gap-2 items-center justify-center">
        <Button
          label={LL.chairs.speakersList.buttons.START_TIMER()}
          faIcon="podium"
          size="small"
          keyboardShortcut={
            typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
              ? "S"
              : "⇧ + S"
          }
          visible={speakersListData?.startTimestamp === null}
          disabled={speakersListData?.speakers.length === 0}
          onClick={() => {
            if (!speakersListData) return;
            backend
              .speakersList({ speakersListId: speakersListData.id })
              .startTimer.post();
          }}
        />
        <Button
          label={LL.chairs.speakersList.buttons.PAUSE_TIMER()}
          faIcon="pause"
          size="small"
          keyboardShortcut={
            typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
              ? "S"
              : "⇧ + S"
          }
          visible={speakersListData?.startTimestamp !== null}
          severity="danger"
          onClick={() => {
            if (!speakersListData) return;
            backend
              .speakersList({ speakersListId: speakersListData.id })
              .stopTimer.post();
          }}
        />
        <Button
          faIcon="rotate-left"
          size="small"
          severity="danger"
          keyboardShortcut={
            typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
              ? "R"
              : "⇧ + R"
          }
          disabled={
            speakersListData?.speakers.length === 0 ||
            (speakersListData?.timeLeft === speakersListData?.speakingTime &&
              speakersListData?.startTimestamp === null)
          }
          onClick={() => {
            if (!speakersListData) return;
            backend
              .speakersList({ speakersListId: speakersListData.id })
              .resetTimer.post();
          }}
        />
        <Button
          label={LL.chairs.speakersList.buttons.REMOVE_TIME()}
          faIcon="minus"
          size="small"
          text
          disabled={speakersListData?.speakers.length === 0}
          onClick={() => {
            if (!speakersListData) return;
            backend
              .speakersList({ speakersListId: speakersListData.id })
              .decreaseSpeakingTime.post({
                amount: 15,
              });
          }}
        />
        <Button
          label={LL.chairs.speakersList.buttons.ADD_TIME()}
          faIcon="plus"
          size="small"
          text
          disabled={speakersListData?.speakers.length === 0}
          onClick={() => {
            if (!speakersListData) return;
            backend
              .speakersList({ speakersListId: speakersListData.id })
              .increaseSpeakingTime.post({
                amount: 15,
              });
          }}
        />
      </div>
      <div className="flex gap-2 items-center justify-start flex-wrap">
        <Button
          label={LL.chairs.speakersList.buttons.NEXT_SPEAKER()}
          faIcon="diagram-successor"
          size="small"
          keyboardShortcut={
            typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
              ? "N"
              : "⇧ + N"
          }
          disabled={speakersListData?.speakers.length === 0}
          severity="warning"
          onClick={() => {
            setNextSpeakerWarningVisible(true);
          }}
        />
        <SplitButton
          buttonTemplate={
            <>
              <span className="font-bold">
                {LL.chairs.speakersList.buttons.ADD_TO_LIST()}
              </span>
              <span className="text-xs ml-2 bg-white/30 dark:bg-black/25 px-2 py-1 rounded-md">
                {typeOfList === $Enums.SpeakersListCategory.SPEAKERS_LIST
                  ? "A"
                  : "⇧ + A"}
              </span>
            </>
          }
          icon={<FAIcon icon="plus-circle" className="mr-2" />}
          size="small"
          onClick={() => setAddSpeakersOverlayVisible(true)}
          model={splitButtonItems}
          menuClassName={"z-50"}
        />
        <Dialog
          header={LL.chairs.speakersList.addSpeakerOverlay.HEADLINE(
            listTypeMap[typeOfList],
          )}
          visible={addSpeakersOverlayVisible}
          onHide={() => setAddSpeakersOverlayVisible(false)}
          closable={false}
        >
          <AddSpeakerOverlay
            allCountries={countries?.map((d) => d.nation) || []}
            closeOverlay={() => setAddSpeakersOverlayVisible(false)}
            typeOfList={typeOfList}
          />
        </Dialog>
        <Dialog
          header={LL.chairs.speakersList.changeSpeechTimeOverlay.HEADLINE(
            listTypeMap[typeOfList],
          )}
          visible={changeSpeechTimeOverlayVisible}
          onHide={() => setChangeSpeechTimeOverlayVisible(false)}
          closable={false}
        >
          <ChangeSpeechTimeOverlay
            closeOverlay={() => setChangeSpeechTimeOverlayVisible(false)}
            typeOfList={typeOfList}
          />
        </Dialog>
      </div>
    </div>
  );
}
