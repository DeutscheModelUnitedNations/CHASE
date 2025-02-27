import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { backend } from "@/lib/backend/clientsideBackend";
import Button from "../../Button";
import * as m from "@/paraglide/messages";
import { NormalFlag } from "../../Flag";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";

export type CommitteesType = Awaited<
  ReturnType<ReturnType<(typeof backend)["conference"]>["committee"]["get"]>
>["data"];

export type DelegationsType = Awaited<
  ReturnType<ReturnType<(typeof backend)["conference"]>["delegation"]["get"]>
>["data"];

export default function DelegationsTable({
  delegations,
  committees,
  activateOrDeactivateCommittee,
  deleteDelegation,
  openAddDelegationDialog,
}: {
  delegations: DelegationsType;
  committees: CommitteesType;
  activateOrDeactivateCommittee: (
    delegationId: string,
    committeeId: string,
  ) => void;
  deleteDelegation: (delegationId: string) => void;
  openAddDelegationDialog: (state: boolean) => void;
}) {
  const delegationIsActive = (
    delegation: NonNullable<DelegationsType>[number],
    committee: NonNullable<CommitteesType>[number],
  ) => {
    return delegation.members?.some(
      (member) => member.committeeId === committee.id,
    );
  };

  const CountCard = ({
    count,
    committee,
  }: {
    count: number;
    committee: string;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-md bg-white px-6 py-3">
      <div className="text-sm font-normal">{committee}</div>
      <div className="text-2xl">{count}</div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col items-stretch justify-center">
      <Toolbar
        end={
          <div className="flex w-full items-stretch justify-end gap-2">
            <Button
              label={m.addDelegation()}
              faIcon="plus"
              keyboardShortcut="N"
              onClick={() => openAddDelegationDialog(true)}
            />
          </div>
        }
        style={{ borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
      />
      <DataTable
        value={delegations || []}
        className="mb-4"
        emptyMessage={m.noDelegationsFound()}
        footer={
          <div className="flex justify-start gap-3">
            <CountCard count={delegations?.length || 0} committee="Total" />
            {committees?.map((committee) => (
              <CountCard
                key={committee.id}
                count={
                  delegations?.filter((delegation) =>
                    delegationIsActive(delegation, committee),
                  ).length || 0
                }
                committee={committee.abbreviation}
              />
            ))}
          </div>
        }
        removableSort
      >
        <Column
          body={(delegation) => (
            <div className="flex justify-center">
              {delegation?.nation?.alpha3Code && (
                <NormalFlag countryCode={delegation.nation.alpha3Code} />
              )}
            </div>
          )}
        />
        <Column
          body={(delegation) => (
            <span>
              {getFullTranslatedCountryNameFromISO3Code(
                delegation.nation.alpha3Code,
              )}
            </span>
          )}
          header="Delegation"
          sortable
        />
        {Array.isArray(committees) &&
          committees?.map((committee) => (
            <Column
              key={committee?.id}
              header={committee.abbreviation}
              alignHeader={"center"}
              align={"center"}
              body={(delegation) => (
                <Button
                  faIcon={
                    delegationIsActive(delegation, committee)
                      ? "check"
                      : "xmark"
                  }
                  size="small"
                  text={!delegationIsActive(delegation, committee)}
                  severity={
                    delegationIsActive(delegation, committee)
                      ? undefined
                      : "danger"
                  }
                  onClick={() =>
                    activateOrDeactivateCommittee(delegation.id, committee.id)
                  }
                />
              )}
            />
          ))}
        <Column
          body={(delegation) => (
            <Button
              severity="danger"
              text
              faIcon="trash-alt"
              onClick={() => deleteDelegation(delegation.id)}
              className="h-full"
            />
          )}
        />
      </DataTable>
    </div>
  );
}
