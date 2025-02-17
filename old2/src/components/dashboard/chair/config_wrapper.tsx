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
    <div className="p-4 bg-primary-950 dark:bg-primary-200 rounded-xl shadow-md pophover w-full flex flex-col justify-center">
      <h1 className="text-lg font-bold mb-1">{title}</h1>
      <p className="text-sm">{description}</p>
      <div className="mb-2" />
      {children}
    </div>
  );
}
