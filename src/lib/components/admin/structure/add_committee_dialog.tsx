import React, { type FormEvent, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import useMousetrap from "mousetrap-react";
import type { $Enums } from "@prisma/generated/client";
import type { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import Button from "../../Button";

type AddCommitteePayloadType = {
  name: string;
  abbreviation: string;
  category: $Enums.CommitteeCategory;
  parentId?: string | undefined;
};

type CommitteesType = Awaited<
  ReturnType<ReturnType<typeof backend["conference"]>["committee"]["get"]>
>["data"];

export default function AddCommitteeDialog({
  inputMaskVisible,
  setInputMaskVisible,
  addCommitteeToList,
  committees,
}: {
  inputMaskVisible: boolean;
  setInputMaskVisible: (visible: boolean) => void;
  addCommitteeToList: (payload: AddCommitteePayloadType) => void;
  committees: CommitteesType;
}) {
  const [newCommitteeName, setNewCommitteeName] = useState("");
  const [newCommitteeAbbreviation, setNewCommitteeAbbreviation] = useState("");
  const [newCommitteeCategory, setNewCommitteeCategory] = useState<
    "COMMITTEE" | "ICJ" | "CRISIS"
  >("COMMITTEE");
  const [newCommitteeIsSubcommittee, setNewCommitteeIsSubcommittee] =
    useState(false);
  const [newCommitteeParent, setNewCommitteeParent] = useState<
    string | undefined
  >(undefined);

  const resetInputMask = () => {
    setNewCommitteeName("");
    setNewCommitteeAbbreviation("");
    setNewCommitteeCategory("COMMITTEE");
    setNewCommitteeIsSubcommittee(false);
    setNewCommitteeParent(undefined);
  };

  const addCommittee = (e: FormEvent | null = null) => {
    if (e) e.preventDefault();
    addCommitteeToList({
      name: newCommitteeName,
      abbreviation: newCommitteeAbbreviation,
      category: newCommitteeCategory,
      parentId: newCommitteeParent,
    });
    resetInputMask();
  };

  const categories = [
    {
      name: m.committee(),
      value: "COMMITTEE",
      icon: "users-line",
    },
    {
      name: m.crisis(),
      value: "CRISIS",
      icon: "light-emergency-on",
    },
    {
      name: m.ICJ(),
      value: "ICJ",
      icon: "scale-balance",
    },
  ];

  useMousetrap("esc", () => {
    setInputMaskVisible(false);
    resetInputMask();
  });

  useMousetrap("enter", () => {
    if (newCommitteeName || newCommitteeAbbreviation) return;
    if (newCommitteeIsSubcommittee && !newCommitteeParent) return;
    addCommittee();
  });

  return (
    <>
      <Dialog
        header={m.addCommittee()}
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
          <InputText
            id="committeeName"
            value={newCommitteeName}
            onChange={(e) => setNewCommitteeName(e.target.value)}
            className="w-full"
            required
            placeholder={m.name()}
            autoFocus
          />
          <InputText
            id="committeeShortname"
            value={newCommitteeAbbreviation}
            onChange={(e) => setNewCommitteeAbbreviation(e.target.value)}
            className="w-full"
            required
            placeholder={m.abbreviation()}
          />
          <SelectButton
            value={newCommitteeCategory}
            onChange={(e) => {
              setNewCommitteeCategory(e.value);
              if (e.value !== "COMMITTEE") {
                setNewCommitteeParent(undefined);
                setNewCommitteeIsSubcommittee(false);
              }
            }}
            optionLabel="name"
            options={categories}
            allowEmpty={false}
          />
          <div className="flex justify-start items-center">
            <InputSwitch
              checked={newCommitteeIsSubcommittee}
              onChange={(e) => setNewCommitteeIsSubcommittee(e.value)}
              disabled={newCommitteeCategory !== "COMMITTEE"}
            />
            <label className="ml-2">
              {m.isSubcommittee()}
            </label>
          </div>
          <Dropdown
            value={committees?.find((c) => c.id === newCommitteeParent)}
            options={committees?.filter(
              (c) => !c.parentId && c.category === "COMMITTEE",
            )}
            onChange={(e) => setNewCommitteeParent(e.value.id)}
            optionLabel="name"
            placeholder={m.parentCommittee()}
            disabled={!newCommitteeIsSubcommittee}
            required={newCommitteeIsSubcommittee}
          />
          <div className="mt-4 flex w-full gap-2">
            <Button
              label={m.cancel()}
              className="w-full"
              severity="warning"
              faIcon="xmark"
              onClick={() => {
                setInputMaskVisible(false);
                setNewCommitteeName("");
                setNewCommitteeAbbreviation("");
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
      </Dialog>
    </>
  );
}
