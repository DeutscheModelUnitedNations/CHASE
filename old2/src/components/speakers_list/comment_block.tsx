import type React from "react";
import { useContext } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { SpeakersListDataContext } from "@/contexts/speakers_list_data";

/**
 * This Component is used on the Speakers List Page.
 * It is the main container for the Comment Components, containing
 * the current Comment and the Comment List.
 */

export default function CommentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  const { LL } = useI18nContext();
  const speakersListLength =
    useContext(SpeakersListDataContext)?.speakers?.length || 0;

  return (
    <>
      {speakersListLength > 0 && (
        <div className="flex flex-col bg-primary-900 dark:bg-primary-100 rounded-lg shadow-md p-3">
          <div className="font-bold mb-2 text-lg">
            {LL.participants.dashboard.widgetHeadlines.COMMENT_LIST()}
          </div>
          <div className="flex-1 flex flex-col gap-3">{children}</div>
        </div>
      )}
    </>
  );
}
