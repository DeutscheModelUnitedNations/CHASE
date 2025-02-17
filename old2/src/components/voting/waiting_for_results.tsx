import React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used in the Voting Component.
 * It displays a message, when the vote of the user was registered, but the outcome is not yet known.
 */

export default function WaitingForResults() {
  const { LL } = useI18nContext();

  return (
    <div className="my-4 shadow-xl rounded-md p-4 bg-white dark:bg-primary-300 border border-primary flex justify-center items-center w-11/12 mr-3">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <FAIcon
            icon="check-circle"
            className="text-gray-icon dark:text-primary-800"
          />
          <div className="text-gray-text dark:text-primary-800 font-bold">
            {LL.participants.voting.votingButtons.VOTE_REGISTERED()}
          </div>
        </div>
        <div className="text-sm text-gray-icon dark:text-primary-600">
          {LL.participants.voting.votingButtons.VOTE_REGISTERED_MESSAGE()}
        </div>
      </div>
    </div>
  );
}
