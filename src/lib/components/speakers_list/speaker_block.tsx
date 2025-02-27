import React, { useEffect, useState, useContext } from "react";
import "./timer_animations.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useBackendTime } from "@/lib/contexts/backendTime";
import { SpeakersListDataContext } from "@/lib/contexts/speakers_list_data";
import { LargeFlag } from "../Flag";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import FAIcon from "../FAIcon";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the SpeakersList. It creates a box for the current speaker,
 * containing the country's flag, country's name and the time left.
 * The time left is displayed as a timer, the prefixing icon changes depending on the status: active, paused or overtime.
 * The icon is animated, the animation is written in the Hourglass Component below and the timer_animations.scss file.
 */

export default function SpeakerBlock() {
  const { currentTime } = useBackendTime();
  const speakersListData = useContext(SpeakersListDataContext);

  const [timerState, setTimerState] = useState<string>("active");
  const [timeLeft, setTimeLeft] = useState<string>("0:00");
  const [countryCode, setCountryCode] = useState<string>("");
  const [timeLeftData, setTimeLeftData] = useState<number>(0);
  const [startTimestampData, setStartTimestampData] = useState<Date | null>(
    null,
  );

  useEffect(() => {
    if (
      !speakersListData?.speakers[0]?.committeeMember?.delegation?.nation
        .alpha3Code
    ) {
      setCountryCode("");
      return;
    }
    setCountryCode(
      speakersListData.speakers[0].committeeMember.delegation.nation.alpha3Code,
    );

    if (!speakersListData?.timeLeft) return;

    if (speakersListData?.timeLeft * 1000 !== timeLeftData) {
      setTimeLeftData(speakersListData?.timeLeft * 1000);
    }

    if (speakersListData?.startTimestamp !== startTimestampData) {
      setStartTimestampData(speakersListData?.startTimestamp);
    }
  }, [speakersListData]);

  useEffect(() => {
    if (startTimestampData === null) {
      setTimerState("paused");
      setTimeLeft(displayTimer(timeLeftData || 0));
    } else {
      const timerInMilliseconds: number =
        timeLeftData -
        (currentTime.getTime() - new Date(startTimestampData).getTime());
      setTimeLeft(displayTimer(timerInMilliseconds));
      if (timerInMilliseconds < 0) {
        setTimerState("overtime");
      } else {
        setTimerState("active");
      }
    }
  }, [timeLeftData, startTimestampData, currentTime]);

  const displayTimer = (milliseconds: number) => {
    const minutes: number = Math.floor(Math.abs(milliseconds / 60000));
    const seconds: number = Math.abs(Math.floor((milliseconds % 60000) / 1000));

    if (milliseconds < 0) {
      return `-${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const listHasActiveSpeaker: boolean =
    (speakersListData?.speakers && speakersListData?.speakers.length !== 0) ??
    false;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={countryCode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-row items-center justify-start">
            <LargeFlag countryCode={countryCode ?? "xxx"} />
            <div className="ml-4 flex flex-1 flex-col">
              <div className="truncate text-xl font-bold">
                {listHasActiveSpeaker
                  ? getFullTranslatedCountryNameFromISO3Code(countryCode)
                  : m.listIsEmpty()}
              </div>
              <div className="text-primary-300 dark:text-primary-600 flex items-center gap-3 text-lg">
                {timerState === "active" && <HourglasAnimation />}
                {timerState === "paused" && <FAIcon icon="hourglass-clock" />}
                {timerState === "overtime" && (
                  <FAIcon icon="bell" className="fa-shake text-red-700" />
                )}
                <div className="text-xl">
                  {listHasActiveSpeaker ? (
                    timeLeft
                  ) : (
                    <SpeakingTime time={speakersListData?.speakingTime} />
                  )}
                  <span className="text-primary-300 dark:text-primary-600 ml-2 text-xs">
                    / <SpeakingTime time={speakersListData?.speakingTime} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function SpeakingTime({ time }: { time?: number }) {
  return (
    time &&
    `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
  );
}

function HourglasAnimation() {
  const [_, setAnimationState] = React.useState<number>(0);
  const [icon, setIcon] = React.useState("hourglass-start");
  const [WrapperStyleClass, setWrapperStyleClass] =
    React.useState<string>("hourglass");

  useEffect(() => {
    const animation = setInterval(() => {
      setTimeout(() => {
        setAnimationState(1);
        setIcon("hourglass-half");
      }, 500);
      setTimeout(() => {
        setAnimationState(2);
        setIcon("hourglass-end");
      }, 1000);
      setTimeout(() => {
        setAnimationState(3);
        setWrapperStyleClass("hourglass hourglass-animation");
      }, 1500);
      setTimeout(() => {
        setAnimationState(0);
        setIcon("hourglass-start");
        setWrapperStyleClass("hourglass");
      }, 2000);
    }, 2000);
    return () => clearInterval(animation);
  }, []);

  return (
    <div className={WrapperStyleClass}>
      <FAIcon icon={icon} />
    </div>
  );
}
