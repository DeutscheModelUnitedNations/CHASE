import React from "react";
import { Button as PrimeReactButton } from "primereact/button";
import type { ButtonProps as PrimeReactButtonProps } from "primereact/button";
import FAIcon from "./font_awesome_icon";

/**
 * This Component is a wrapper for the PrimeReact Button Component.
 * It allows easy usage of the FontAwesomeIcon Component as an icon for the Button.
 * The padding between the icon and the label is automatically set wether the label is present or not.
 * @param label The label of the Button
 * @param faIcon The FontAwesome Icon to be used as an icon for the Button
 * @param faIconClassName The className of the FontAwesomeIcon
 * @param keyboardShortcut The keyboard shortcut to be displayed on the Button
 * @param text Whether the Button should be displayed as a text button or not
 * @param loading Whether the Button should be displayed as loading or not
 * @param rest The rest of the props that are passed to the PrimeReact Button Component
 * @returns A Button Component
 */

interface ExtendedButtonProps extends PrimeReactButtonProps {
  label?: string;
  faIcon?: string;
  faIconClassName?: string;
  keyboardShortcut?: string;
  text?: boolean;
  loading?: boolean;
}

export default function Button({
  label,
  faIcon,
  faIconClassName,
  keyboardShortcut,
  text,
  loading,
  ...rest
}: ExtendedButtonProps) {
  return (
    <PrimeReactButton
      {...rest}
      icon={
        faIcon && (
          <FAIcon
            icon={loading ? "fa-spinner-third" : faIcon}
            spin={!!loading}
            className={`${label && "mr-3"} ${faIconClassName}`}
          />
        )
      }
      text={text}
    >
      <div className="flex flex-row items-center justify-center w-full">
        <span className="font-bold">{label}</span>
        {keyboardShortcut && (
          <span
            className={`text-xs ml-2 ${
              !text ? "bg-white/30" : "bg-black/5"
            } dark:bg-black/25 px-2 py-1 rounded-md`}
          >
            {keyboardShortcut}
          </span>
        )}
      </div>
    </PrimeReactButton>
  );
}
