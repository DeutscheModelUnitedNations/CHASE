import React, { useState } from "react";
import Image from "next/image";
import getFlagPathByCode from "@/misc/get_flag_path_by_code";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { useI18nContext } from "@/i18n/i18n-react";
import { Skeleton } from "primereact/skeleton";
import NoDataPlaceholder from "./no_data_placeholder";
import { useFaGlobe } from "@/hooks/useFaGlobe";
import FAIcon from "./font_awesome_icon";

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
  const { locale } = useI18nContext();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex-col justify-end items-center rounded-md contrast:border contrast:border-primary-100 bg-white shadow-md overflow-hidden">
        {countryCode ? (
          <>
            <div className="flex justify-center items-center w-[2rem] h-[1.5rem]">
              <Image
                src={getFlagPathByCode(countryCode)}
                width={100}
                height={75}
                alt={`Flag of ${getCountryNameByCode(countryCode, locale)}`}
                style={{ objectFit: "cover", height: "100%" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {showNameOnHover && (
                <div
                  className={`bg-primary text-white ${
                    isHovered ? "opacity-100" : "opacity-0"
                  } text-xs rounded-md shadow-md p-2 absolute mt-2 z-50 transition-all duration-300`}
                >
                  {getCountryNameByCode(countryCode, locale)}
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
}: { countryCode?: string; showNameOnHover?: boolean }) {
  const { locale } = useI18nContext();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="rounded-md contrast:border contrast:border-primary-100 bg-white shadow-md overflow-hidden">
      {countryCode ? (
        <>
          <div className="flex justify-center items-center w-[3rem] h-[2.25rem]">
            <Image
              src={getFlagPathByCode(countryCode)}
              width={100}
              height={80}
              alt="flag"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isHovered && showNameOnHover && (
              <div className="bg-primary text-white text-xs rounded-md shadow-md p-2 absolute mt-2 z-50">
                {getCountryNameByCode(countryCode, locale)}
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
      className={`rounded-md contrast:border contrast:border-primary-100 bg-white shadow-md overflow-hidden ${className}`}
    >
      {countryCode ? (
        <div className="flex justify-center items-center w-[6.4rem] h-[4.8rem]">
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

export function FlagPlaceholder({
  widthRem,
}: {
  widthRem: number;
}) {
  const globeIcon = useFaGlobe();

  return (
    <Skeleton
      width={`${widthRem.toString()}rem`}
      height={`${(widthRem * 0.75).toString()}rem`}
      className="!bg-primary-800 flex justify-center items-center"
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
