import React, { type FormEvent, useRef, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";

import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import Button from "@/components/button";
import useMousetrap from "mousetrap-react";
import type { ConferenceRole } from "@prisma/generated/client";

type AddTeammemberDialogProps = {
  inputMaskVisible: boolean;
  setInputMaskVisible: (visible: boolean) => void;
  addTeammemberToList: ({
    role,
    count,
  }: { role: ConferenceRole; count: number }) => void;
};

export default function AddTeammemberDialog({
  inputMaskVisible,
  setInputMaskVisible,
  addTeammemberToList,
}: AddTeammemberDialogProps) {
  const { LL } = useI18nContext();
  const toast = useRef<Toast>(null);

  const [newTeammemberRole, setTeammemberRole] =
    useState<ConferenceRole>("CHAIR");
  const [newTeammemberCount, setNewTeammemberCount] = useState<number>(1);

  const roles = [
    {
      name: LL.admin.onboarding.teampool.roles.ADMIN(),
      value: "ADMIN",
    },
    {
      name: LL.admin.onboarding.teampool.roles.SECRETARIAT(),
      value: "SECRETARIAT",
    },
    {
      name: LL.admin.onboarding.teampool.roles.CHAIR(),
      value: "CHAIR",
    },
    {
      name: LL.admin.onboarding.teampool.roles.COMMITTEE_ADVISOR(),
      value: "COMMITTEE_ADVISOR",
    },
    {
      name: LL.admin.onboarding.teampool.roles.GUEST(),
      value: "GUEST",
    },
    {
      name: LL.admin.onboarding.teampool.roles.PARTICIPANT_CARE(),
      value: "PARTICIPANT_CARE",
    },
    {
      name: LL.admin.onboarding.teampool.roles.MISCELLANEOUS_TEAM(),
      value: "MISCELLANEOUS_TEAM",
    },
  ];

  const resetInputMask = () => {
    setTeammemberRole("CHAIR");
  };

  const addCommittee = (e: FormEvent | null = null) => {
    if (e) e.preventDefault();
    addTeammemberToList({
      role: newTeammemberRole,
      count: newTeammemberCount,
    });
    resetInputMask();
    setInputMaskVisible(false);
  };

  useMousetrap("esc", () => {
    setInputMaskVisible(false);
    resetInputMask();
  });

  useMousetrap("enter", () => {
    addCommittee();
  });

  return (
    <>
      <Dialog
        header={LL.admin.onboarding.teampool.ADD_TEAMMEMBER()}
        visible={inputMaskVisible}
        onHide={() => setInputMaskVisible(false)}
        className="w-3/4"
      >
        <form
          className="flex flex-col items-stretch justify-center gap-4 w-full mt-2"
          onSubmit={(e) => addCommittee(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          {roles.map((role) => {
            return (
              <div key={role.value} className="flex align-items-center">
                <RadioButton
                  inputId={role.value}
                  name="role"
                  value={role.value}
                  onChange={(e) => setTeammemberRole(e.value)}
                  checked={newTeammemberRole === role.value}
                />
                <label htmlFor={role.value} className="ml-2">
                  {role.name}
                </label>
              </div>
            );
          })}
          <InputText
            id="count"
            type="number"
            onChange={(e) =>
              setNewTeammemberCount(Number.parseInt(e.currentTarget.value))
            }
            value={newTeammemberCount.toString()}
            min={1}
            max={50}
            required
            placeholder={LL.admin.onboarding.teampool.input.COUNT()}
            className="w-full"
          />

          <div className="mt-4 flex w-full gap-2">
            <Button
              label={LL.admin.onboarding.structure.input.BUTTON_CANCEL()}
              className="w-full"
              type="button"
              severity="warning"
              faIcon="xmark"
              onClick={() => {
                setInputMaskVisible(false);
                resetInputMask();
              }}
              keyboardShortcut="Esc"
            />
            <Button
              label={LL.admin.onboarding.structure.input.BUTTON_ADD()}
              className="w-full"
              faIcon="plus"
              type="submit"
              keyboardShortcut="⏎"
            />
          </div>
        </form>
        <Toast ref={toast} />
      </Dialog>
    </>
  );
}
