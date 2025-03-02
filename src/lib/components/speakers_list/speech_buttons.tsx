import React, { useEffect, useState, useContext } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Dialog } from "primereact/dialog";
import AddSpeakerOverlay from "./add_speaker";
import ChangeSpeechTimeOverlay from "./change_speech_time";
import { $Enums } from "@prisma/generated/client";
import type { MenuItem } from "primereact/menuitem";
import { useToast } from "@/lib/contexts/toast";
import { SpeakersListDataContext } from "@/lib/contexts/speakers_list_data";
import { useUserIdent } from "@/lib/contexts/user_ident";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import Button from "../Button";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import {
  useClientSideBackendCall,
  useClientSideBackendCallPoller,
} from "@/lib/backend/useClientSideBackendCall";
import FAIcon from "../FAIcon";
import useMousetrap from "mousetrap-react";

/**
 * This component is used to display the buttons for the Speakers List and Comment List on the Speakers List Page for participants.
 * It uses the Button Component from PrimeReact.
 * The buttons are different depending on whether the participant is on the list or not.
 * If the list is closed, the button to add a participant to the list is disabled.
 * If the participant is on the list, the button to remove the participant from the list is displayed.
 * If the participant is not on the list, the button to add the participant to the list is displayed.
 */

export function ParticipantSpeechButtons() {
  const { showToast } = useToast();

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
            summary: m.addedSpeechContribution(),
            detail: m.to({ to: speakersListData.type }),
          });
        } else if (res.status === 403) {
          showToast({
            severity: "warn",
            summary: m.addingNotAllowed(),
            detail: m.youAreProbablyNotRegisteredAsAttending(),
          });
        } else if (res.status === 409) {
          showToast({
            severity: "error",
            summary: m.alreadyOnList(),
            detail: m.anUnexpectedErrorOccurred(),
          });
        } else {
          showToast({
            severity: "error",
            summary: m.errorWhileAdding(),
            detail: m.anUnexpectedErrorOccurred(),
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
            summary: m.removedSpeechContribution(),
            detail: m.from({ from: speakersListData.type }),
          });
        } else {
          showToast({
            severity: "error",
            summary: m.errorWhileRemoving(),
            detail: m.anUnexpectedErrorOccurred(),
          });
        }
      });
  }

  return (
    speakersListData?.agendaItem.committee
      .allowDelegationsToAddThemselvesToSpeakersList && (
      <div className="mt-3 flex flex-col items-start justify-center gap-2">
        {userOnSpeakersList ? (
          <Button
            label={m.retract()}
            faIcon="trash-can-xmark"
            size="small"
            severity="danger"
            onClick={() => removeFromSpeakersList()}
          />
        ) : (
          <Button
            label={
              speakersListData?.isClosed
                ? m.listClosed()
                : m.speechContribution()
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
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const speakersListData = useContext(SpeakersListDataContext);

  const [nextSpeakerWarningVisible, setNextSpeakerWarningVisible] =
    useState(false);

  const [addSpeakersOverlayVisible, setAddSpeakersOverlayVisible] =
    useState(false);

  const [changeSpeechTimeOverlayVisible, setChangeSpeechTimeOverlayVisible] =
    useState(false);

  const { value: countries } = useClientSideBackendCall(
    (backend) =>
      backend
        // biome-ignore lint/style/noNonNullAssertion:
        .conference({ conferenceId: conferenceId! })
        // biome-ignore lint/style/noNonNullAssertion:
        .committee({ committeeId: committeeId! }).delegations.get(),
    false,
  );

  const splitButtonItems: MenuItem[] = [
    {
      label: m.openList(),
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
      label: m.closeList(),
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
      label: m.clearList(),
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
      label: m.changeSpeechTime(),
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
    SPEAKERS_LIST: m.speakersList(),
    COMMENT_LIST: m.questionsAndComments(),
    MODERATED_CAUCUS: m.moderatedCaucus(),
  };

  return (
    <div className="mt-3 flex flex-col items-start justify-center gap-2">
      <Dialog
        visible={nextSpeakerWarningVisible}
        onHide={() => setNextSpeakerWarningVisible(false)}
        header={m.nextSpeech({
          speaker: listTypeMap[typeOfList as $Enums.SpeakersListCategory],
        })}
        footer={
          <div className="flex w-full flex-row-reverse items-center justify-start gap-2">
            <Button
              label={m.yes()}
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
              label={m.no()}
              onClick={() => setNextSpeakerWarningVisible(false)}
              text
            />
          </div>
        }
        closable={false}
        dismissableMask
      >
        <div className="mx-10 flex items-center justify-start gap-10">
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
          <div>{m.reallyCallNextSpeaker()}</div>
        </div>
      </Dialog>
      <div className="flex items-center justify-center gap-2">
        <Button
          label={m.start()}
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
          label={m.pause()}
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
          label={m._15s()}
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
          label={m._15s()}
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
      <div className="flex flex-wrap items-center justify-start gap-2">
        <Button
          label={m.nextSpeaker()}
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
              <span className="font-bold">{m.speechContribution()}</span>
              <span className="ml-2 rounded-md bg-white/30 px-2 py-1 text-xs dark:bg-black/25">
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
          header={m.addSpeechContributionTo({ list: listTypeMap[typeOfList] })}
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
          header={m.changeSpeechTimeFor({ list: listTypeMap[typeOfList] })}
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
