import React, { type FormEvent, useRef, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import useMousetrap from "mousetrap-react";
import type { ConferenceRole } from "@prisma/client";
import * as m from "@/paraglide/messages";
import Button from "../../Button";

type AddTeammemberDialogProps = {
  inputMaskVisible: boolean;
  setInputMaskVisible: (visible: boolean) => void;
  addTeammemberToList: ({
    role,
    count,
  }: {
    role: ConferenceRole;
    count: number;
  }) => void;
};

export default function AddTeammemberDialog({
  inputMaskVisible,
  setInputMaskVisible,
  addTeammemberToList,
}: AddTeammemberDialogProps) {
  const toast = useRef<Toast>(null);

  const [newTeammemberRole, setTeammemberRole] =
    useState<ConferenceRole>("CHAIR");
  const [newTeammemberCount, setNewTeammemberCount] = useState<number>(1);

  const roles = [
    {
      name: m.admin(),
      value: "ADMIN",
    },
    {
      name: m.secretariat(),
      value: "SECRETARIAT",
    },
    {
      name: m.chair(),
      value: "CHAIR",
    },
    {
      name: m.committeeAdvisor(),
      value: "COMMITTEE_ADVISOR",
    },
    {
      name: m.guest(),
      value: "GUEST",
    },
    {
      name: m.participantCare(),
      value: "PARTICIPANT_CARE",
    },
    {
      name: m.teamMember(),
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
        header={m.addTeamMember()}
        visible={inputMaskVisible}
        onHide={() => setInputMaskVisible(false)}
        className="w-3/4"
      >
        <form
          className="mt-2 flex w-full flex-col items-stretch justify-center gap-4"
          onSubmit={(e) => addCommittee(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          {roles.map((role) => {
            return (
              <div key={role.value} className="align-items-center flex">
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
            placeholder={m.amount()}
            className="w-full"
          />

          <div className="mt-4 flex w-full gap-2">
            <Button
              label={m.cancel()}
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
              label={m.add()}
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
