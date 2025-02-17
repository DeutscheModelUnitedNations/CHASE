import Button from "@/components/button";
import CountryAutoComplete from "@/components/speakers_list/country_auto_complete";
import { type BackendInstanceType, useBackend } from "@/contexts/backend";
import { useI18nContext } from "@/i18n/i18n-react";
import useMousetrap from "mousetrap-react";
import { Dialog } from "primereact/dialog";
import { type FormEvent, useState } from "react";
import { useBackendCall } from "@/hooks/useBackendCall";

export type AllAvailableCountriesType = NonNullable<
  Awaited<
    ReturnType<BackendInstanceType["baseData"]["countries"]["get"]>
  >["data"]
>;

export type CountryDataType = AllAvailableCountriesType[number] & {
  name?: string;
};

export default function AddDelegationDialog({
  inputMaskVisible,
  setInputMaskVisible,
  addDelegationToList,
}: {
  inputMaskVisible: boolean;
  setInputMaskVisible: (visible: boolean) => void;
  addDelegationToList: (alpha3Code: string) => void;
}) {
  const { LL } = useI18nContext();
  const { backend } = useBackend();

  const [allAvailableCountries] = useBackendCall(
    backend.baseData.countries.get,
    false,
  );
  const [delegationData, setDelegationData] = useState<
    ((typeof allAvailableCountries)[number] & { name?: string }) | null
  >(null);

  const resetInputMask = () => {
    setDelegationData(null);
  };

  const addDelegation = (e: FormEvent | null = null) => {
    if (e) e.preventDefault();
    if (!delegationData) return;
    addDelegationToList(delegationData.alpha3Code);
    resetInputMask();
    setInputMaskVisible(false);
  };

  const addDelegationAndStay = (e: FormEvent | null = null) => {
    if (e) e.preventDefault();
    if (!delegationData) return;
    addDelegationToList(delegationData.alpha3Code);
    resetInputMask();
  };

  useMousetrap("esc", () => {
    resetInputMask();
    setInputMaskVisible(false);
  });

  useMousetrap("enter", () => {
    addDelegation();
  });

  useMousetrap("shift+enter", () => {
    addDelegationAndStay();
  });

  return (
    <>
      <Dialog
        header={LL.admin.onboarding.delegations.add_delegation.HEADLINE()}
        visible={inputMaskVisible}
        onHide={() => setInputMaskVisible(false)}
        className="w-3/4"
      >
        <div className="flex flex-col items-stretch justify-center gap-4 w-full mt-2">
          <CountryAutoComplete
            allCountries={allAvailableCountries}
            selectedCountry={delegationData}
            setSelectedCountry={setDelegationData}
            placeholder={LL.admin.onboarding.delegations.add_delegation.SEARCH_PLACEHOLDER()}
          />
          <div className="mt-4 flex w-full gap-2">
            <Button
              label={LL.admin.onboarding.delegations.add_delegation.BACK_BUTTON()}
              severity="warning"
              faIcon="xmark"
              onClick={() => {
                setInputMaskVisible(false);
                resetInputMask();
              }}
              keyboardShortcut="Esc"
            />
            <div className="flex-1" />
            <Button
              label={LL.admin.onboarding.delegations.add_delegation.ADD_MORE_BUTTON()}
              faIcon="plus"
              type="submit"
              keyboardShortcut="⇧+⏎"
              onClick={() => addDelegationAndStay()}
            />
            <Button
              label={LL.admin.onboarding.delegations.add_delegation.ADD_BUTTON()}
              faIcon="plus"
              type="submit"
              keyboardShortcut="⏎"
              onClick={() => addDelegation()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
