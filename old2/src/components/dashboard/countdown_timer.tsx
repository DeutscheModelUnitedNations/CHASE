import { StatusTimer } from "@/contexts/status_timer";
import { useContext } from "react";

export default function Timer({
  inBrackets = false,
  hideOnZero = false,
}: {
  inBrackets?: boolean;
  hideOnZero?: boolean;
}) {
  const { displayTime } = useContext(StatusTimer);

  return displayTime && displayTime !== "00:00" ? (
    <>
      {inBrackets && "("}
      <span className="tabular-nums">{displayTime}</span>
      {inBrackets && ")"}
    </>
  ) : hideOnZero ? (
    ""
  ) : (
    <>
      {inBrackets && "("}
      00:00
      {inBrackets && ")"}
    </>
  );
}
