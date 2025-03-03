import type React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import FAIcon from "./FAIcon";

export default function SmallInfoCard({
  icon,
  classNameForIconBox = "bg-primary-900 text-primary-500 border-primary-500",
  classNameForContentBox = "bg-primary-900 text-primary-100",
  className,
  loading = false,
  children,
}: {
  icon: string;
  classNameForIconBox?: string;
  classNameForContentBox?: string;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}) {
  const [loadingRandom, setLoadingRandom] = useState<number>(100);

  useEffect(() => {
    setLoadingRandom(Math.random() * (100 - 20) + 20);
  }, []);

  return (
    <div className={`flex w-full gap-1 ${className}`}>
      <div
        className={`w-20 ${classNameForIconBox} bg-opacity-20 hidden w-full items-center justify-center border-l-[6px] sm:flex sm:w-auto sm:rounded-l-lg`}
      >
        <div className="flex h-full w-16 items-center justify-center">
          <FAIcon icon={icon} className="text-2xl" />
        </div>
      </div>
      <div
        className={`flex w-full items-center overflow-hidden rounded-lg p-4 text-center sm:rounded-none sm:rounded-r-lg sm:text-left ${classNameForContentBox} bg-opacity-20`}
      >
        {loading ? (
          <Skeleton
            width={`${loadingRandom}%`}
            height="1.75rem"
            className="!bg-primary-800 dark:!bg-primary-300"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
