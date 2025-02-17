"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContext } from "@/contexts/toast";
import { useBackendTime } from "@/contexts/backendTime";
import { useI18nContext } from "@/i18n/i18n-react";
import { CommitteeDataContext } from "@/contexts/committee_data";
import { $Enums } from "@prisma/generated/client";

export const StatusTimer = createContext(
  {} as {
    category: $Enums.CommitteeStatus | null;
    headline: string | null;
    until: Date | null;
    timerOver: boolean;
    displayTime: string | undefined;
  },
);

export function StatusTimerProvider({
  disallowNotifications = false,
  children,
}: {
  disallowNotifications?: boolean;
  children: React.ReactNode;
}) {
  const { showToast, clearToast } = useContext(ToastContext);
  const { LL } = useI18nContext();
  const committeeData = useContext(CommitteeDataContext);
  const { currentTime } = useBackendTime();

  const [category, setCategory] = useState<$Enums.CommitteeStatus | null>(null);
  const [headline, setHeadline] = useState<string | null>(null);
  const [until, setUntil] = useState<Date | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>();
  const [displayTime, setDisplayTime] = useState<string>();

  const [timerOver, setTimerOver] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const timerToast = () => {
    showToast({
      summary: LL.participants.dashboard.timerWidget.TOAST_HEADLINE(),
      detail: LL.participants.dashboard.timerWidget.TOAST_MESSAGE(),
      severity: "info" as const,
      sticky: true,
    });
  };

  useEffect(() => {
    if (committeeData?.status !== category) {
      setCategory(committeeData?.status ?? null);
      setToastShown(false);
      clearToast();
    }
    if (committeeData?.statusHeadline !== headline) {
      setHeadline(committeeData?.statusHeadline ?? null);
      setToastShown(false);
      clearToast();
    }
    if (committeeData?.statusUntil !== until) {
      setUntil(committeeData?.statusUntil ?? null);
      setToastShown(false);
      clearToast();
    }
  }, [committeeData, category, headline, until]);

  useEffect(() => {
    if (until) {
      try {
        const diff = new Date(until).getTime() - currentTime.getTime();
        if (diff > 0) {
          setTimeLeft(diff);
        } else {
          setTimeLeft(0);
          setTimerOver?.(true);
          if (
            !toastShown &&
            !disallowNotifications &&
            (
              [
                $Enums.CommitteeStatus.INFORMAL,
                $Enums.CommitteeStatus.PAUSE,
              ] as ($Enums.CommitteeStatus | null)[]
            ).includes(category)
          )
            timerToast();
          setToastShown(true);
        }
      } catch (_e) {
        console.error(until);
      }
    }
  }, [until, toastShown, currentTime]);

  useEffect(() => {
    if (timeLeft === 0 || timeLeft === undefined) {
      setDisplayTime("00:00");
    } else {
      const hours = Math.floor(timeLeft / 1000 / 60 / 60);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setDisplayTime(
        `${hours > 0 ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    }
  }, [timeLeft]);

  return (
    <StatusTimer.Provider
      value={{ category, headline, until, timerOver, displayTime }}
    >
      {children}
    </StatusTimer.Provider>
  );
}
