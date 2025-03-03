import type React from "react";

/**
 * This Component is the main template for any main header of a page inside the app.
 * It is a style only component, that provides a background color, a padding and a fixed height.
 */

export default function HeaderTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-32 items-center justify-between bg-slate-200 p-4 dark:bg-primary-200">
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
      <div className="flex flex-col items-center justify-center rounded-md bg-white px-6 py-2 text-sm dark:bg-primary-100">
        {children}
      </div>
    </>
  );
}
