import React, { useState, useEffect, useContext, useReducer } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useBackendCall } from "@/hooks/useBackendCall";
import regionalGroups from "@/lib/data/regional_groups.json";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { alpha3ToAlpha2 } from "@/misc/countryCodeUtils";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { NormalFlag } from "@/components/flag_templates";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function RegionalGroupsLookup({
  lookupVisible,
  setLookupVisible,
}: {
  lookupVisible: boolean;
  setLookupVisible: (visible: boolean) => void;
}) {
  const { LL, locale } = useI18nContext();
  const { backend } = useBackend();

  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [filter, setFilter] = useState("");

  const [unfilteredPresentDelegations] = useBackendCall(
    // TODO
    backend
      // biome-ignore lint/style/noNonNullAssertion:
      .conference({ conferenceId: conferenceId! })
      // biome-ignore lint/style/noNonNullAssertion:
      .committee({ committeeId: committeeId! }).delegations.get,
    false,
  );

  const presentDelegations = unfilteredPresentDelegations?.filter(
    (delegation) =>
      getCountryNameByCode(delegation.nation.alpha3Code, locale)
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );

  const groupNames = {
    africa: LL.chairs.dashboard.configurations.regionalGroups.AFRICA(),
    asia: LL.chairs.dashboard.configurations.regionalGroups.ASIA(),
    america: LL.chairs.dashboard.configurations.regionalGroups.LATIN_AMERICA(),
    eastern_europe:
      LL.chairs.dashboard.configurations.regionalGroups.EASTERN_EUROPE(),
    western_europe:
      LL.chairs.dashboard.configurations.regionalGroups.WESTERN_EUROPE(),
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
              getCountryNameByCode(a.nation.alpha3Code, locale).localeCompare(
                getCountryNameByCode(b.nation.alpha3Code, locale),
              ),
            )
            .map((delegation) => (
              <div
                key={delegation.id}
                className="bg-primary-900 flex items-center gap-4 rounded-lg p-2"
              >
                <NormalFlag countryCode={delegation.nation.alpha3Code} />
                <div className="text-md font-bold">
                  {getCountryNameByCode(delegation.nation.alpha3Code, locale)}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <Dialog
      header={LL.chairs.dashboard.configurations.regionalGroups.TITLE()}
      visible={lookupVisible}
      onHide={() => setLookupVisible(false)}
      style={{ width: "80vw" }}
      dismissableMask
    >
      <InputText
        placeholder={LL.chairs.dashboard.configurations.regionalGroups.FILTER()}
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
