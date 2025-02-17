import React from "react";
import Button from "@/components/button";
import { NormalFlag } from "@/components/flag_templates";
import { useI18nContext } from "@/i18n/i18n-react";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import type { BackendInstanceType } from "@/contexts/backend";

export type CommitteesType = Awaited<
  ReturnType<ReturnType<BackendInstanceType["conference"]>["committee"]["get"]>
>["data"];

export type DelegationsType = Awaited<
  ReturnType<ReturnType<BackendInstanceType["conference"]>["delegation"]["get"]>
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
  const { LL, locale } = useI18nContext();

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
    <div className="flex py-3 px-6 bg-white flex-col items-center justify-center rounded-md">
      <div className="text-sm font-normal">{committee}</div>
      <div className="text-2xl">{count}</div>
    </div>
  );

  return (
    <div className="flex flex-col items-stretch justify-center w-full h-full">
      <Toolbar
        end={
          <div className="w-full flex justify-end items-stretch gap-2">
            <Button
              label={LL.admin.onboarding.delegations.ADD_DELEGATION_BUTTON()}
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
        emptyMessage={LL.admin.onboarding.delegations.EMPTY_MESSAGE()}
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
              {getCountryNameByCode(delegation.nation.alpha3Code, locale)}
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
