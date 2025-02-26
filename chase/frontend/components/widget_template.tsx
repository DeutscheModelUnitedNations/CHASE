import { Skeleton } from "primereact/skeleton";
import type React from "react";

interface WidgetTemplateProps {
  children: React.ReactNode;
  cardTitle?: string;
  autoStyle?: boolean;
  additionalClassNames?: string;
  titleAdditionalContent?: () => React.ReactNode; // Changed to a function
}

/**
 * This Component is the main style template for any widget inside the app.
 * It provides a background color, a border, a border radius, a padding and a margin.
 * It is used in many Components on higher levels of the app, but with the most importance for the Dashboard.
 */

export default function WidgetTemplate({
  children,
  cardTitle = "",
  additionalClassNames,
  titleAdditionalContent,
}: WidgetTemplateProps) {
  return (
    <>
      <div
        className={`flex w-full flex-col bg-primary-950 dark:bg-primary-200 rounded-lg p-3 transition-all duration-500 ${additionalClassNames}`}>
        {(cardTitle || titleAdditionalContent) && (
          <div className="flex flex-row items-center justify-between mb-2">
            {cardTitle !== "" ? (
              <div className="font-bold text-lg">{cardTitle}</div>
            ) : (
              <Skeleton width="5rem" height="1.75rem" />
            )}
            {titleAdditionalContent && <div>{titleAdditionalContent()}</div>}
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
