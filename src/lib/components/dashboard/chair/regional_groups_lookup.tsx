import React, { useState, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import * as m from "@/paraglide/messages";
import { alpha3ToAlpha2 } from "@/lib/countryCodeUtils";
import regionalGroups from "@/lib/data/regional_groups.json";
import { NormalFlag } from "../../Flag";

export default function RegionalGroupsLookup({
  lookupVisible,
  setLookupVisible,
}: {
  lookupVisible: boolean;
  setLookupVisible: (visible: boolean) => void;
}) {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [filter, setFilter] = useState("");

  const { value: unfilteredPresentDelegations } = useClientSideBackendCall(
    (backend) =>
      // TODO
      backend
        // biome-ignore lint/style/noNonNullAssertion:
        .conference({ conferenceId: conferenceId! })
        // biome-ignore lint/style/noNonNullAssertion:
        .committee({ committeeId: committeeId! }).delegations.get(),
    false,
  );

  const presentDelegations = unfilteredPresentDelegations?.filter(
    (delegation) =>
      getFullTranslatedCountryNameFromISO3Code(delegation.nation.alpha3Code)
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );

  const groupNames = {
    africa: m.africa(),
    asia: m.asiaAndOceania(),
    america: m.latinAmericaAndCaribbean(),
    eastern_europe: m.easternEurope(),
    western_europe: m.westernEuropeAndOthers(),
  };

  const checkInRegionalGroup = (alpha3Code: string, group: any) => {
    try {
      return (regionalGroups as any)[group].includes(
        alpha3ToAlpha2(alpha3Code),
      );
    } catch {
      return false;
    }
  };

  function Group({ group, groupName }: { group: string; groupName: string }) {
    return (
      <div
        className="bg-primary-950 flex flex-col items-center rounded-lg p-6"
        key={group}
      >
        <h2 className="text-3xl font-bold">{groupName}</h2>
        <div className="mt-4 flex max-h-[70vh] flex-wrap items-center justify-center gap-2">
          {presentDelegations
            ?.filter((delegation) =>
              checkInRegionalGroup(delegation.nation.alpha3Code, group),
            )
            .sort((a, b) =>
              getFullTranslatedCountryNameFromISO3Code(a.nation.alpha3Code).localeCompare(
                getFullTranslatedCountryNameFromISO3Code(b.nation.alpha3Code),
              ),
            )
            .map((delegation) => (
              <div
                key={delegation.id}
                className="bg-primary-900 flex items-center gap-4 rounded-lg p-2"
              >
                <NormalFlag countryCode={delegation.nation.alpha3Code} />
                <div className="text-md font-bold">
                  {getFullTranslatedCountryNameFromISO3Code(delegation.nation.alpha3Code)}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <Dialog
      header={m.regionalGroups()}
      visible={lookupVisible}
      onHide={() => setLookupVisible(false)}
      style={{ width: "80vw" }}
      dismissableMask
    >
      <InputText
        placeholder={m.filter()}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="my-5 w-full"
      />
      <div className="flex w-full flex-col gap-2">
        {Object.keys(groupNames)
          .filter((group) =>
            presentDelegations?.some((delegation) =>
              checkInRegionalGroup(delegation.nation.alpha3Code, group),
            ),
          )
          .map((group) => (
            <Group
              key={group}
              group={group}
              groupName={(groupNames as any)[group]}
            />
          ))}
      </div>
    </Dialog>
  );
}
