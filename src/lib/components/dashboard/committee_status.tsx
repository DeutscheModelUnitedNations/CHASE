import React from "react";
import WidgetTemplate from "../WidgetTemplate";
import FAIcon from "../FAIcon";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the Dashboard. It shows the current,
 * and the next step in the debate process according to the rules of procedure.
 */

export default function CommitteeStatusWidget({
  currentDebateStep,
  nextDebateStep,
}: {
  currentDebateStep: string;
  nextDebateStep: string | undefined;
}) {

  return (
    <>
      <WidgetTemplate
        cardTitle={m.stateOfDebate()}
      >
        <div className="flex flex-col gap-1">
          <div className="bg-primary dark:text-primary-100 contrast:border contrast:border-black flex flex-row gap-4 rounded-md p-2 text-white shadow-md">
            <div className="flex-1 text-center text-sm font-semibold">
              {currentDebateStep}
            </div>
          </div>
          <FAIcon icon="arrow-down" />
          <div className="dark:text-primary-700 border-primary-300 dark:border-primary-600 flex flex-row gap-4 rounded-md border border-dashed p-2">
            <div className="flex-1 text-center text-sm font-semibold">
              {nextDebateStep ? nextDebateStep : "..."}
            </div>
          </div>
        </div>
      </WidgetTemplate>
    </>
  );
}
