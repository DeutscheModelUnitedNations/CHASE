import type React from "react";

/**
 * This Component is the main template for any main header of a page inside the app.
 * It is a style only component, that provides a background color, a padding and a fixed height.
 */

export default function HeaderTemplate({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <div className=" h-32 bg-slate-200 dark:bg-primary-200 flex justify-between items-center p-4">
        {children}
      </div>
    </>
  );
}

/**
 * This is a styling component to display an information box inside the header.
 */

export function HeaderInfoBox({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="text-sm bg-white dark:bg-primary-100 rounded-md py-2 px-6 flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
}
