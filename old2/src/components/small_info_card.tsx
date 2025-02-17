import type React from "react";
import { useEffect, useState } from "react";
import { Skeleton } from "primereact/skeleton";
import FAIcon from "./font_awesome_icon";

export default function SmallInfoCard({
  icon,
  classNameForIconBox = "bg-primary-500 text-primary-500 border-primary-500",
  classNameForContentBox = "bg-primary-500",
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
    <div className={`w-full flex gap-1 ${className}`}>
      <div
        className={`w-20 ${classNameForIconBox} border-l-[6px] sm:rounded-l-lg justify-center items-center w-full sm:w-auto bg-opacity-20 hidden sm:flex`}
      >
        <div className="w-16 h-full flex justify-center items-center">
          <FAIcon icon={icon} className="text-2xl" />
        </div>
      </div>
      <div
        className={`w-full rounded-lg sm:rounded-none sm:rounded-r-lg flex items-center p-4 overflow-hidden text-center sm:text-left ${classNameForContentBox} bg-opacity-20`}
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
