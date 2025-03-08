import React, { useContext, useState } from "react";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { ToastContext } from "@/lib/contexts/toast";
import { SpeakersListDataContext } from "@/lib/contexts/speakers_list_data";
import * as m from "@/paraglide/messages";
import { backend } from "@/lib/backend/clientsideBackend";
import FAIcon from "../FAIcon";

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
  const { showToast } = useContext(ToastContext);
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
        summary: m.wrongFormat(),
        sticky: true,
      });
      return;
    }

    await backend.speakersList({ speakersListId }).setSpeakingTime.post({
      speakingTime: convertTimeToSeconds(time),
    });

    showToast({
      severity: "success",
      summary: m.speakingTimeSetTo({ time: time || "" }),
      detail: m.for_({ for_: typeOfList }),
      sticky: false,
    });

    closeOverlay();
  };

  return (
    <>
      <div className="mt-1 flex flex-col gap-5">
        <InputMask
          mask="99:99"
          value={time || ""}
          placeholder={m.newSpeakingTime()}
          onChange={(e) => {
            setTime(e.value || null);
          }}
          className="w-full"
          autoFocus
        />
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            label={m.cancel()}
            icon={<FAIcon icon="times" className="mr-2" />}
            onClick={closeOverlay}
            severity="danger"
            text
          />
          <Button
            label={m.change()}
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
