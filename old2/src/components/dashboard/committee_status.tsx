import React from "react";
import WidgetTemplate from "@components/widget_template";
import { useI18nContext } from "@/i18n/i18n-react";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used in the Dashboard. It shows the current,
 * and the next step in the debate process according to the rules of procedure.
 */

export default function CommitteeStatusWidget({
  currentDebateStep,
  nextDebateStep,
}: { currentDebateStep: string; nextDebateStep: string | undefined }) {
  const { LL } = useI18nContext();

  return (
    <>
      <WidgetTemplate
        cardTitle={LL.participants.dashboard.widgetHeadlines.COMMITTEE_STATUS()}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-row bg-primary text-white dark:text-primary-100 rounded-md p-2 gap-4 contrast:border contrast:border-black shadow-md">
            <div className="flex-1 text-sm font-semibold text-center">
              {currentDebateStep}
            </div>
          </div>
          <FAIcon icon="arrow-down" />
          <div className="flex flex-row dark:text-primary-700 rounded-md p-2 gap-4 border border-primary-300 dark:border-primary-600 border-dashed">
            <div className="flex-1 text-sm font-semibold text-center">
              {nextDebateStep ? nextDebateStep : "..."}
            </div>
          </div>
        </div>
      </WidgetTemplate>
    </>
  );
}
