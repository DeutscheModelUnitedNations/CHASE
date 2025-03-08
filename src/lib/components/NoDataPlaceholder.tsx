import React from "react";
import FAIcon from "./FAIcon";

/**
 * This Component is used whenever a section or widget has no data to display.
 * It displays a ban icon and a (custom) title.
 */

export default function NoDataPlaceholder({
  title = "Keine Daten",
}: {
  title?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FAIcon
        icon="ban"
        className="text-gray-icon text-2xl dark:text-primary-500"
      />
      <div className="text-gray-text text-lg font-bold dark:text-primary-500">
        {title}
      </div>
    </div>
  );
}
