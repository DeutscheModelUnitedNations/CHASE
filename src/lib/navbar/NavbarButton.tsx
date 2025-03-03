"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "primereact/badge";
import FAIcon from "../components/FAIcon";

interface NavbarButtonProps {
  icon: string;
  title: string;
  link?: string;
  badge?: number;
  onClick?: () => void;
  newWindow?: boolean;
}

const defaultWrapperStyle =
  "p-overlay-badge rounded-md flex flex-col justify-center items-center";
const nonActiveStyle = `${defaultWrapperStyle} bg-primary text-primary-800 dark:text-primary-300 hover:bg-primary-800 dark:hover:bg-primary-300 hover:text-white dark:hover:text-primary-100 transition cursor-pointer`;
const activeStyle = `${defaultWrapperStyle} bg-primary-800 dark:bg-primary-300 text-white dark:text-primary-100`;

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
  const wrapperStyle = useMemo(() => {
    let active = false;

    if (link.startsWith(".")) {
      active = pathname.includes(link.slice(1));
    }
    active = link.startsWith(pathname);

    if (active) {
      return activeStyle;
    }
    return nonActiveStyle;
  }, [pathname, link]);

  const openLinkInNewWindow = () => {
    window.open(link, "_blank");
  };

  return (link === "" && onClick !== null) || newWindow ? (
    <div className={wrapperStyle} title={title}>
      <FAIcon
        icon={icon}
        className="m-3 text-xl"
        onClick={newWindow ? openLinkInNewWindow : onClick}
      />
    </div>
  ) : (
    <Link href={link} className="w-full" title={title}>
      <div className={wrapperStyle}>
        <FAIcon icon={icon} className="m-3 text-xl" beatFade={badge > 0} />
        {badge !== 0 && (
          <Badge
            value={badge}
            className="mt-2 mr-2 !bg-white !text-primary-500"
          />
        )}
      </div>
    </Link>
  );
}
