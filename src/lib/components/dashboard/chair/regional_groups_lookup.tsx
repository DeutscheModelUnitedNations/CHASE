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
import { NormalFlag } from "../../Flag";
import countrieData, { Countries } from "world-countries";

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
        .committee({ committeeId: committeeId! })
        .delegations.get(),
    false,
  );

  const groups: Exclude<Countries[0]["unRegionalGroup"], "">[] = [
    "African Group",
    "Asia and the Pacific Group",
    "Latin American and Caribbean Group",
    "Eastern European Group",
    "Western European and Others Group",
  ];

  const groupNames: Record<
    Exclude<Countries[0]["unRegionalGroup"], "">,
    string
  > = {
    "African Group": m.africa(),
    "Asia and the Pacific Group": m.asiaAndOceania(),
    "Latin American and Caribbean Group": m.latinAmericaAndCaribbean(),
    "Eastern European Group": m.easternEurope(),
    "Western European and Others Group": m.westernEuropeAndOthers(),
  };

  const presentDelegations = unfilteredPresentDelegations?.filter(
    (delegation) =>
      getFullTranslatedCountryNameFromISO3Code(delegation.nation.alpha3Code)
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );

  const checkInRegionalGroup = (
    alpha3Code: string,
    group: Countries[0]["unRegionalGroup"],
  ) => {
    const country = countrieData.find(
      (country) => country.cca3.toUpperCase() === alpha3Code.toUpperCase(),
    );
    if (!country) {
      return false;
    }

    switch (group) {
      case "African Group":
        return country.unRegionalGroup === "African Group";
      case "Asia and the Pacific Group":
        return country.unRegionalGroup === "Asia and the Pacific Group";
      case "Latin American and Caribbean Group":
        return country.unRegionalGroup === "Latin American and Caribbean Group";
      case "Eastern European Group":
        return country.unRegionalGroup === "Eastern European Group";
      case "Western European and Others Group":
        return country.unRegionalGroup === "Western European and Others Group";
    }
    return false;
  };

  function Group({
    group,
    groupName,
  }: {
    group: Exclude<Countries[0]["unRegionalGroup"], "">;
    groupName: string;
  }) {
    return (
      <div
        className="flex flex-col items-center rounded-lg bg-primary-950 p-6"
        key={group}
      >
        <h2 className="text-3xl font-bold">{groupName}</h2>
        <div className="mt-4 flex max-h-[70vh] flex-wrap items-center justify-center gap-2">
          {presentDelegations
            ?.filter((delegation) =>
              checkInRegionalGroup(delegation.nation.alpha3Code, group),
            )
            .sort((a, b) =>
              getFullTranslatedCountryNameFromISO3Code(
                a.nation.alpha3Code,
              ).localeCompare(
                getFullTranslatedCountryNameFromISO3Code(b.nation.alpha3Code),
              ),
            )
            .map((delegation) => (
              <div
                key={delegation.id}
                className="flex items-center gap-4 rounded-lg bg-primary-900 p-2"
              >
                <NormalFlag countryCode={delegation.nation.alpha3Code} />
                <div className="text-md font-bold">
                  {getFullTranslatedCountryNameFromISO3Code(
                    delegation.nation.alpha3Code,
                  )}
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
        className="w-full my-5"
      />
      <div className="flex w-full flex-col gap-2">
        {groups
          .filter((group) =>
            presentDelegations?.some((delegation) =>
              checkInRegionalGroup(delegation.nation.alpha3Code, group),
            ),
          )
          .map((group) => (
            <Group key={group} group={group} groupName={groupNames[group]} />
          ))}
      </div>
    </Dialog>
  );
}
