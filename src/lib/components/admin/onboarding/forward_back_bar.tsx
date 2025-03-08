import React from "react";
import useMousetrap from "mousetrap-react";
import Button from "../../Button";
import * as m from "@/paraglide/messages";

interface ForwardBackButtonsProps {
  handleSaveFunction: () => void;
  saveLoading?: boolean;
  forwardDisabled?: boolean;
}

export default function ForwardBackButtons({
  handleSaveFunction,
  saveLoading,
  forwardDisabled = false,
}: ForwardBackButtonsProps) {
  useMousetrap("alt+enter", () => {
    if (handleSaveFunction) {
      handleSaveFunction();
    }
  });

  return (
    <>
      <div className="mt-8 flex w-full items-stretch justify-end gap-4">
        <Button
          label={m.toVote()}
          faIcon="check"
          onClick={handleSaveFunction}
          loading={saveLoading}
          keyboardShortcut="⌥ + Enter"
          disabled={forwardDisabled}
        />
      </div>
    </>
  );
}
