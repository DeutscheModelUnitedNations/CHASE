import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "primereact/skeleton";
import Timer from "./countdown_timer";
import { StatusTimer } from "@/lib/contexts/status_timer";
import * as m from "@/paraglide/messages";
import WidgetTemplate from "../WidgetTemplate";
import FAIcon from "../FAIcon";

/**
 * This Component is used in the Dashboard. It shows the current timer status –
 * e.g. for informal sessions, breaks, suspensions, etc.
 * With this widget, participants can see the end time of the current session as well as a countdown.
 */

export default function TimerWidget({
  showOnFormalDebate = true,
}: {
  showOnFormalDebate?: boolean;
}) {
  const { category, headline, until } = useContext(StatusTimer);

  const timeStamp = () => {
    if (until) {
      try {
        return new Date(until).toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch (_e) {
        return "";
      }
    }
    return "";
  };

  const getClassNames = () => {
    switch (category) {
      case "FORMAL":
        return "";
      case "INFORMAL":
        return "bg-red-500 dark:bg-red-800 text-white dark:text-primary-950";
      case "PAUSE":
        return "bg-secondary dark:bg-secondary-300 text-white dark:text-secondary-100";
      case "SUSPENSION":
        return "bg-primary-300 dark:bg-primary-700 text-primary-300 dark:text-primary-200";
    }
  };

  const getIcon: () => string = () => {
    switch (category) {
      case "FORMAL":
        return "podium";
      case "INFORMAL":
        return "comments";
      case "PAUSE":
        return "mug-hot";
      case "SUSPENSION":
        return "forward-step";
      default:
        return "question";
    }
  };

  const getHeadline: () => string = () => {
    if (headline) return headline;
    switch (category) {
      case "FORMAL":
        return m.formal();
      case "INFORMAL":
        return m.informal();
      case "PAUSE":
        return m.pause();
      case "SUSPENSION":
        return m.suspension();
      default:
        return "";
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          layout
        >
          {category ? (
            category !== "CLOSED" &&
            (showOnFormalDebate || category !== "FORMAL") && (
              <WidgetTemplate
                cardTitle=""
                additionalClassNames={getClassNames()}
              >
                <div className="flex flex-col justify-center items-center text-center">
                  <div className="my-4">
                    <FAIcon icon={getIcon()} size="3x" />
                  </div>
                  <div className="text-2xl font-bold">{getHeadline()}</div>
                  {until && (
                    <div className="text-md">
                      {m.untilXOClock({time: timeStamp()})}
                    </div>
                  )}
                  {(category === "INFORMAL" || category === "PAUSE") &&
                    until && (
                      <div className="text-4xl font-bold my-2 tabular-nums">
                        <Timer />
                      </div>
                    )}
                </div>
              </WidgetTemplate>
            )
          ) : (
            <WidgetTemplate cardTitle="" additionalClassNames={getClassNames()}>
              <div className="flex flex-col justify-center items-center">
                <div className="my-4">
                  <FAIcon
                    icon="circle-notch"
                    size="3x"
                    spin
                    className="text-primary-500"
                  />
                </div>
                <Skeleton width="90%" height="2rem" />
                <Skeleton width="50%" height="1.25rem" className="mt-1" />
              </div>
            </WidgetTemplate>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
