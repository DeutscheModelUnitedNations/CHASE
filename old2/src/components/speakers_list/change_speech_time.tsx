import React, { useContext, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { useI18nContext } from "@/i18n/i18n-react";
import { Button } from "primereact/button";
import { ToastContext } from "@/contexts/toast";
import { useBackend } from "@/contexts/backend";
import { SpeakersListDataContext } from "@/contexts/speakers_list_data";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used on the SpeakersListPage for the Chair to change the speech time of the current speaker
 */

export default function ChangeSpeechTimeOverlay({
  closeOverlay,
  typeOfList,
}: {
  closeOverlay: () => void;
  typeOfList: string;
}) {
  const { LL } = useI18nContext();
  const { showToast } = useContext(ToastContext);
  const { backend } = useBackend();
  const speakersListId = useContext(SpeakersListDataContext)?.id;

  const [time, setTime] = useState<string | null>(null); // TODO: Add a default value

  const validateTime = (time: string | null) => {
    if (!time) return false;
    const [minutes, seconds] = time.split(":");
    return (
      Number.parseInt(minutes) >= 0 &&
      Number.parseInt(minutes) <= 59 &&
      Number.parseInt(seconds) >= 0 &&
      Number.parseInt(seconds) <= 59
    );
  };

  const convertTimeToSeconds = (time: string | null) => {
    if (!time) return 0;
    const [minutes, seconds] = time.split(":");
    return Number.parseInt(minutes) * 60 + Number.parseInt(seconds);
  };

  const sendNewTime = async (time: string | null) => {
    if (!speakersListId || !time) return;
    if (!validateTime(time)) {
      showToast({
        severity: "error",
        summary:
          LL.chairs.speakersList.changeSpeechTimeOverlay.TOAST_WRONG_FORMAT(),
        sticky: true,
      });
      return;
    }

    await backend.speakersList({ speakersListId }).setSpeakingTime.post({
      speakingTime: convertTimeToSeconds(time),
    });

    showToast({
      severity: "success",
      summary: LL.chairs.speakersList.changeSpeechTimeOverlay.TOAST_SUCCESS(
        time || "",
      ),
      detail:
        LL.chairs.speakersList.changeSpeechTimeOverlay.TOAST_SUCCESS_DETAIL(
          typeOfList,
        ),
      sticky: false,
    });

    closeOverlay();
  };

  return (
    <>
      <div className="flex flex-col gap-5 mt-1">
        <InputMask
          mask="99:99"
          value={time || ""}
          placeholder={LL.chairs.speakersList.changeSpeechTimeOverlay.PLACEHOLDER()}
          onChange={(e) => {
            setTime(e.value || null);
          }}
          className="w-full"
          autoFocus
        />
        <div className="flex gap-3 justify-end flex-wrap">
          <Button
            label={LL.chairs.speakersList.changeSpeechTimeOverlay.BUTTON_CANCEL()}
            icon={<FAIcon icon="times" className="mr-2" />}
            onClick={closeOverlay}
            severity="danger"
            text
          />
          <Button
            label={LL.chairs.speakersList.changeSpeechTimeOverlay.BUTTON_SET()}
            icon={<FAIcon icon="plus" className="mr-2" />}
            onClick={() => {
              sendNewTime(time);
            }}
            text
          />
        </div>
      </div>
    </>
  );
}
