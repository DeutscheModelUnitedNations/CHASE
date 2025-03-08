import type React from "react";

export default function ConfigWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="pophover flex w-full flex-col justify-center rounded-xl bg-primary-950 p-4 shadow-md dark:bg-primary-200">
      <h1 className="mb-1 text-lg font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
      <div className="mb-2" />
      {children}
    </div>
  );
}
