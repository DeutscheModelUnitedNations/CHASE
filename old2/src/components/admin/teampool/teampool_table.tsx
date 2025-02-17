import type React from "react";
import { useEffect, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Button from "@/components/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toolbar } from "primereact/toolbar";
import useMousetrap from "mousetrap-react";
import type {
  ConferenceMember,
  ConferenceRole,
} from "@prisma/generated/client";

interface TeamPoolTableProps {
  team: ConferenceMember[] | undefined | null;
  confirmDeleteAll: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  handleDelete: (id: string) => void;
  handleAdd: ({ role, count }: { role: ConferenceRole; count: number }) => void;
  setInputMaskVisible: (visible: boolean) => void;
}

export default function TeamPoolTable({
  team,
  confirmDeleteAll,
  handleDelete,
  handleAdd,
  setInputMaskVisible,
}: TeamPoolTableProps) {
  const { LL } = useI18nContext();

  const [teamGrouped, setTeamGrouped] = useState<
    { role: ConferenceRole; count: number; id: string[] }[]
  >([]);

  useMousetrap("n", () => {
    setInputMaskVisible(true);
  });

  useEffect(() => {
    const groupedByRole: typeof teamGrouped = [];
    for (const teamMember of team || []) {
      const roleIndex = groupedByRole.findIndex(
        (entry) => entry.role === teamMember.role,
      );
      if (roleIndex === -1) {
        groupedByRole.push({
          role: teamMember.role,
          count: 1,
          id: [teamMember.id],
        });
      } else {
        groupedByRole[roleIndex].count++;
        groupedByRole[roleIndex].id.push(teamMember.id);
      }
    }
    setTeamGrouped(groupedByRole);
  }, [team]);

  return (
    <>
      <ConfirmPopup />
      <div className="flex flex-col items-stretch justify-center w-full h-full">
        <Toolbar
          end={
            <div className="w-full flex justify-end items-stretch gap-2">
              <Button
                label={LL.admin.onboarding.teampool.DELETE_ALL()}
                faIcon="trash-alt"
                disabled={team?.length === 0 || !team}
                severity="danger"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                ) => confirmDeleteAll(event)}
              />
              <Button
                label={LL.admin.onboarding.teampool.ADD_TEAMMEMBER()}
                faIcon="plus"
                keyboardShortcut="N"
                onClick={() => setInputMaskVisible(true)}
              />
            </div>
          }
          style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        />
        <DataTable
          value={teamGrouped || []}
          tableStyle={{ width: "100%" }}
          emptyMessage={LL.admin.onboarding.teampool.EMPTY_MESSAGE()}
          footer={LL.admin.onboarding.teampool.FOOTER(team?.length || 0)}
          removableSort
        >
          <Column
            header={LL.admin.onboarding.teampool.COUNT()}
            body={(rawData: { role: ConferenceRole; count: number }) => (
              <span>{rawData.count}</span>
            )}
            className="w-1/6"
          />
          <Column
            header={LL.admin.onboarding.teampool.ROLE()}
            body={(rawData: { role: ConferenceRole; count: number }) => {
              const roleFunction =
                LL.admin.onboarding.teampool.roles[rawData.role];
              if (!roleFunction) {
                return <span>{rawData.role}</span>;
              }
              return <span>{roleFunction()}</span>;
            }}
            className="w-full"
          />
          <Column
            className="w-1/6"
            body={(rowData) => (
              <div className="flex gap-2">
                <Button
                  faIcon="minus-circle"
                  severity="danger"
                  onClick={() => handleDelete(rowData.id[0])}
                />
                <Button
                  faIcon="plus-circle"
                  severity="success"
                  onClick={() =>
                    handleAdd({
                      role: rowData.role,
                      count: 1,
                    })
                  }
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </>
  );
}
