import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Skeleton } from "primereact/skeleton";
import FAIcon from "./FAIcon";
import * as m from "@/paraglide/messages";
import { useFaGlobe } from "./useFaGlobe";
import getFlagPathByCode, {
  getFullTranslatedCountryNameFromISO3Code,
} from "./nation";

/**
 * This Component is used whenever a section or widget has no data to display.
 * It displays a ban icon and a (custom) title.
 */
export default function NoDataPlaceholder({
  title = m.noData(),
}: {
  title?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <FAIcon
        icon="ban"
        className="text-gray-icon dark:text-primary-500 text-2xl"
      />
      <div className="text-gray-text dark:text-primary-500 text-lg font-bold">
        {title}
      </div>
    </div>
  );
}

/**
 * The following Components are all different sizes of flags.
 * They are used by many Components throughout the app.
 * The smalles size includes a hover flag that – when activated – shows the name of the country as a tooltip.
 */
export function SmallFlag({
  countryCode,
  showNameOnHover = false,
}: {
  countryCode?: string;
  showNameOnHover?: boolean;
}) {
  const localizedName = useMemo(
    () => getFullTranslatedCountryNameFromISO3Code(countryCode ?? ""),
    [countryCode],
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="contrast:border contrast:border-primary-100 flex-col items-center justify-end overflow-hidden rounded-md bg-white shadow-md">
        {countryCode ? (
          <>
            <div className="flex h-[1.5rem] w-[2rem] items-center justify-center">
              <Image
                src={getFlagPathByCode(countryCode)}
                width={100}
                height={75}
                alt={`Flag of ${localizedName}`}
                style={{ objectFit: "cover", height: "100%" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {showNameOnHover && (
                <div
                  className={`bg-primary text-white ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } absolute z-50 mt-2 rounded-md p-2 text-xs shadow-md transition-all duration-300`}
                >
                  {localizedName}
                </div>
              )}
            </div>
          </>
        ) : (
          <FlagPlaceholder widthRem={2} />
        )}
      </div>
    </div>
  );
}

export function NormalFlag({
  countryCode,
  showNameOnHover = false,
}: {
  countryCode?: string;
  showNameOnHover?: boolean;
}) {
  const localizedName = useMemo(
    () => getFullTranslatedCountryNameFromISO3Code(countryCode ?? ""),
    [countryCode],
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="contrast:border contrast:border-primary-100 overflow-hidden rounded-md bg-white shadow-md">
      {countryCode ? (
        <>
          <div className="flex h-[2.25rem] w-[3rem] items-center justify-center">
            <Image
              src={getFlagPathByCode(countryCode)}
              width={100}
              height={80}
              alt={`Flag of ${localizedName}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovered && showNameOnHover && (
              <div className="bg-primary absolute z-50 mt-2 rounded-md p-2 text-xs text-white shadow-md">
                {localizedName}
              </div>
            )}
          </div>
        </>
      ) : (
        <FlagPlaceholder widthRem={3} />
      )}
    </div>
  );
}

export function LargeFlag({
  countryCode,
  className,
}: {
  countryCode?: string;
  className?: string;
}) {
  return (
    <div
      className={`contrast:border contrast:border-primary-100 overflow-hidden rounded-md bg-white shadow-md ${className}`}
    >
      {countryCode ? (
        <div className="flex h-[4.8rem] w-[6.4rem] items-center justify-center">
          <Image
            src={getFlagPathByCode(countryCode)}
            width={300}
            height={200}
            alt="flag"
          />
        </div>
      ) : (
        <FlagPlaceholder widthRem={6.4} />
      )}
    </div>
  );
}

export function FlagPlaceholder({ widthRem }: { widthRem: number }) {
  const globeIcon = useFaGlobe();

  return (
    <Skeleton
      width={`${widthRem.toString()}rem`}
      height={`${(widthRem * 0.75).toString()}rem`}
      className="!bg-primary-800 flex items-center justify-center"
      animation="none"
    >
      <FAIcon
        icon={globeIcon}
        className="text-primary-700"
        style={{ fontSize: `${widthRem / 3}rem` }}
      />
    </Skeleton>
  );
}
