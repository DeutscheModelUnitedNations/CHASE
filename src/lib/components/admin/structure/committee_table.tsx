import type React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toolbar } from "primereact/toolbar";
import type { backend } from "@/lib/backend/clientsideBackend";
import Button from "../../Button";
import * as m from "@/paraglide/messages";
import FAIcon from "../../FAIcon";

type CommitteesType = Awaited<
  ReturnType<ReturnType<(typeof backend)["conference"]>["committee"]["get"]>
>["data"];

type CommitteeType = NonNullable<CommitteesType>[number];

export default function CommitteeTable({
  committees,
  confirmDeleteAll,
  handleDelete,
  setInputMaskVisible,
}: {
  committees?: CommitteesType;
  confirmDeleteAll: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (rowData: CommitteeType) => void;
  setInputMaskVisible: (visible: boolean) => void;
}) {
  return (
    <>
      <ConfirmPopup />
      <div className="flex h-full w-full flex-col items-stretch justify-center">
        <Toolbar
          end={
            <div className="flex w-full items-stretch justify-end gap-2">
              <Button
                label={m.deleteAll()}
                faIcon="trash-alt"
                disabled={committees?.length === 0}
                severity="danger"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  confirmDeleteAll(event)
                }
              />
              <Button
                label={m.addCommittee()}
                faIcon="plus"
                keyboardShortcut="N"
                onClick={() => setInputMaskVisible(true)}
              />
            </div>
          }
          style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
        />
        <DataTable
          value={committees || []}
          tableStyle={{ width: "100%" }}
          emptyMessage={m.noCommitteesExisting()}
          footer={m.totalXCommittees({ amount: committees?.length || 0 })}
          removableSort
        >
          <Column
            field="abbreviation"
            header={m.abbreviation()}
            sortable
            className="w-1/6"
          />
          <Column field="name" header={m.name()} sortable className="w-full" />
          <Column
            header={m.category()}
            body={(rowData) => {
              const matchingCommittee = committees?.find(
                (committee) => committee.id === rowData.parentId,
              );

              return (
                <span>
                  {rowData.category === "COMMITTEE" &&
                    (rowData.parentId ? (
                      <div className="m-0 flex items-center justify-start gap-2">
                        <FAIcon
                          icon="diagram-subtask"
                          className="text-2xl text-primary"
                        />
                        <span className="">
                          {matchingCommittee
                            ? matchingCommittee.abbreviation
                            : "N/A"}
                        </span>
                      </div>
                    ) : (
                      <FAIcon
                        icon="users-line"
                        className="text-2xl text-primary"
                      />
                    ))}
                  {rowData.category === "CRISIS" && (
                    <FAIcon
                      icon="light-emergency-on"
                      className="text-2xl text-red-500"
                    />
                  )}
                  {rowData.category === "ICJ" && (
                    <FAIcon
                      icon="scale-balanced"
                      className="text-2xl text-green-500"
                    />
                  )}
                </span>
              );
            }}
            className="w-1/6"
          />
          <Column
            className="w-1/6"
            body={(rawData) => (
              <Button
                faIcon="trash-alt"
                severity="danger"
                onClick={() => handleDelete(rawData)}
              />
            )}
          />
        </DataTable>
      </div>
    </>
  );
}
