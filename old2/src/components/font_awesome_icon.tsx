import type React from "react";
import { useEffect, useState } from "react";

interface FAIconProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  // Literal set of classes to add to the icon
  set?: "solid" | "regular" | "light" | "duotone" | "brands";
  className?: string;
  style?: React.CSSProperties;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "2xl"
    | "1x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  fixedWidth?: boolean;
  rotate?: 90 | 180 | 270;
  flip?: "horizontal" | "vertical" | "both";
  beat?: boolean;
  fade?: boolean;
  beatFade?: boolean;
  bounce?: boolean;
  flipAnimation?: boolean;
  shake?: boolean;
  spin?: boolean;
  stackSize?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "2xl"
    | "1x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  inverse?: boolean;
  powerTransform?: string;
  maskIcon?: string;
}

export default function FAIcon({
  icon,
  set = "solid",
  className = "",
  size,
  fixedWidth = false,
  rotate,
  flip,
  beat,
  fade,
  beatFade,
  bounce,
  flipAnimation,
  shake,
  spin,
  stackSize,
  inverse,
  powerTransform,
  maskIcon,
  ...props
}: FAIconProps) {
  const faIcon = () => {
    return `fa-${set} fa-${icon}`;
  };

  const iconClassName = () => {
    const classNames = [
      faIcon(),
      className,
      size ? `fa-${size}` : "",
      fixedWidth ? "fa-fw" : "",
      rotate ? `fa-rotate-${rotate}` : "",
      flip ? `fa-flip-${flip}` : "",
      beat ? "fa-beat" : "",
      fade ? "fa-fade" : "",
      beatFade ? "fa-beat-fade" : "",
      bounce ? "fa-bounce" : "",
      flipAnimation ? "fa-flip-animation" : "",
      shake ? "fa-shake" : "",
      spin ? "fa-spin" : "",
      stackSize ? `fa-stack-${stackSize}` : "",
      inverse ? "fa-inverse" : "",
    ];
    return classNames.join(" ");
  };

  return (
    <i
      className={iconClassName()}
      data-fa-transform={powerTransform}
      data-fa-mask={maskIcon}
      {...props}
    />
  );
}

export function FAIconStack({
  children,
  size,
  className = "",
  style,
}: {
  children: React.ReactNode;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "2xl"
    | "1x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  className?: string;
  style: React.CSSProperties;
}) {
  return (
    <>
      <span
        className={`
          fa-stack
          ${className}
          ${size ? `fa-${size}` : ""}
        `}
        style={style}
      >
        {children}
      </span>
    </>
  );
}

export function FAIconLayer({
  children,
  size,
  className = "",
  fixedWidth,
  style,
}: {
  children: React.ReactNode;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "2xl"
    | "1x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  className?: string;
  fixedWidth?: boolean;
  style: React.CSSProperties;
}) {
  return (
    <>
      <span
        className={`
          fa-layers
          ${className}
          ${size ? `fa-${size}` : ""}
          ${fixedWidth ? "fa-fw" : ""}
        `}
        style={style}
      >
        {children}
      </span>
    </>
  );
}

export function FAIconCounter({
  label,
  className = "",
  style,
}: {
  label: string;
  className?: string;
  style: React.CSSProperties;
}) {
  return (
    <>
      <span
        className={`
          fa-layers-counter
          ${className}
        `}
        style={style}
      >
        {label}
      </span>
    </>
  );
}
