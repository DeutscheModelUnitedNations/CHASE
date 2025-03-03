import React from "react";
import FAIcon from "../FAIcon";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the Voting Component.
 * It displays a message, when the vote of the user was registered, but the outcome is not yet known.
 */

export default function WaitingForResults() {
  return (
    <div className="my-4 mr-3 flex w-11/12 items-center justify-center rounded-md border border-primary bg-white p-4 shadow-xl dark:bg-primary-300">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-lg">
          <FAIcon
            icon="check-circle"
            className="text-gray-icon dark:text-primary-800"
          />
          <div className="text-gray-text font-bold dark:text-primary-800">
            {m.voteRegistered()}
          </div>
        </div>
        <div className="text-gray-icon text-sm dark:text-primary-600">
          {m.waitingForResult()}
        </div>
      </div>
    </div>
  );
}
