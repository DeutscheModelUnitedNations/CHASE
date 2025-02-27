import type React from "react";

/**
 * This Component is a style only component that provides a box for any list inside a widget.
 * It provides a background color, a border, a border radius, a padding and a margin,
 * as well as a hover effect and a highlighting option. It is used in many Components across the app,
 * mostly in the context of a map-function.
 */

export default function WidgetBoxTemplate({
  children,
  highlight,
  className,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  highlight?: boolean;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const getClassNames = (): string => {
    let classNames =
      "flex-1 w-full flex rounded-md justify-start items-center transition-all cursor-pointer gap-4 p-2 ";

    if (highlight) {
      classNames +=
        "bg-highlight-light dark:bg-highlight-dark border border-primary shadow-sm text-black hover:bg-white dark:hover:bg-primary-300 ";
    } else {
      classNames += "hover:bg-white dark:hover:bg-primary-300";
    }

    if (className) {
      classNames += className;
    }

    return classNames;
  };

  return (
    <>
      <div
        className={getClassNames()}
        onClick={onClick}
        onKeyDown={onClick}
        {...rest}
      >
        {children}
      </div>
    </>
  );
}
