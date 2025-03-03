import { SpeakersListDataContext } from "@/lib/contexts/speakers_list_data";
import type React from "react";
import { useContext } from "react";
import * as m from "@/paraglide/messages";

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
  const speakersListLength =
    useContext(SpeakersListDataContext)?.speakers?.length || 0;

  return (
    <>
      {speakersListLength > 0 && (
        <div className="flex flex-col rounded-lg bg-primary-900 p-3 shadow-md dark:bg-primary-100">
          <div className="mb-2 text-lg font-bold">
            {m.questionsAndComments()}
          </div>
          <div className="flex flex-1 flex-col gap-3">{children}</div>
        </div>
      )}
    </>
  );
}
