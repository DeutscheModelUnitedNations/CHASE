"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "primereact/badge";
import FAIcon from "../font_awesome_icon";

interface NavbarButtonProps {
  icon: string;
  title: string;
  link?: string;
  badge?: number;
  onClick?: () => void;
  newWindow?: boolean;
}

/**
 * This Component is used in the Navbar. It displays a button with an icon.
 * It is used to navigate to other pages.
 */

export default function NavbarButton({
  icon,
  title,
  link = "",
  badge = 0,
  onClick,
  newWindow = false,
}: NavbarButtonProps) {
  const pathname = usePathname();

  const [wrapperStyle, setWrapperStyle] = useState("");
  const defaultWrapperStyle =
    "p-overlay-badge rounded-md flex flex-col justify-center items-center";

  function checkPathname() {
    // link something like "./dashboard" to the current page
    // pathname something like "/app/participant/dashboard"
    if (link.startsWith(".")) {
      return pathname.includes(link.slice(1));
    }
    return link.startsWith(pathname);
  }

  useEffect(() => {
    // if the link starts with the current page route, set the button to active
    if (checkPathname()) {
      setWrapperStyle(
        `${defaultWrapperStyle} bg-primary-800 dark:bg-primary-300 text-white dark:text-primary-100`,
      );
    } else {
      setWrapperStyle(
        `${defaultWrapperStyle} bg-primary text-primary-800 dark:text-primary-300 hover:bg-primary-800 dark:hover:bg-primary-300 hover:text-white dark:hover:text-primary-100 transition cursor-pointer`,
      );
    }
  }, [pathname]);

  const openLinkInNewWindow = () => {
    window.open(link, "_blank");
  };

  return (link === "" && onClick !== null) || newWindow ? (
    <div className={wrapperStyle} title={title}>
      <FAIcon
        icon={icon}
        className=" text-xl m-3"
        onClick={newWindow ? openLinkInNewWindow : onClick}
      />
    </div>
  ) : (
    <Link href={link} className="w-full" title={title}>
      <div className={wrapperStyle}>
        <FAIcon icon={icon} className="text-xl m-3" beatFade={badge > 0} />
        {badge !== 0 && (
          <Badge
            value={badge}
            className="!bg-white !text-primary-500 mt-2 mr-2"
          />
        )}
      </div>
    </Link>
  );
}
