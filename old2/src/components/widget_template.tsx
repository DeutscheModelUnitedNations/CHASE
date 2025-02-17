import { Skeleton } from "primereact/skeleton";
import type React from "react";

interface WidgetTemplateProps {
  children: React.ReactNode;
  cardTitle?: string;
  autoStyle?: boolean;
  additionalClassNames?: string;
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
}: WidgetTemplateProps) {
  return (
    <>
      <div
        className={`flex w-full flex-col bg-primary-950 dark:bg-primary-200 rounded-lg p-3 transition-all duration-500 ${additionalClassNames}`}
      >
        {cardTitle &&
          (cardTitle !== "" ? (
            <div className=" font-bold mb-2 text-lg">{cardTitle}</div>
          ) : (
            <Skeleton width="5rem" height="1.75rem" />
          ))}
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
