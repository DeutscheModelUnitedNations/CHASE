import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import useMousetrap from "mousetrap-react";
import { Dialog } from "primereact/dialog";
import { type FormEvent, useState } from "react";
import * as m from "@/paraglide/messages";
import CountryAutoComplete from "../../speakers_list/country_auto_complete";
import Button from "../../Button";
import type { backend } from "@/lib/backend/clientsideBackend";

export type AllAvailableCountriesType = NonNullable<
  Awaited<ReturnType<(typeof backend)["baseData"]["countries"]["get"]>>["data"]
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
  const { value: allAvailableCountries } = useClientSideBackendCall(
    (backend) => backend.baseData.countries.get,
    false,
  );
  const [delegationData, setDelegationData] = useState<
    | (NonNullable<typeof allAvailableCountries>[number] & { name?: string })
    | null
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
        header={m.addDelegation()}
        visible={inputMaskVisible}
        onHide={() => setInputMaskVisible(false)}
        className="w-3/4"
      >
        <div className="mt-2 flex w-full flex-col items-stretch justify-center gap-4">
          <CountryAutoComplete
            allCountries={allAvailableCountries}
            selectedCountry={delegationData}
            setSelectedCountry={setDelegationData}
            placeholder={m.searchForDelegations()}
          />
          <div className="mt-4 flex w-full gap-2">
            <Button
              label={m.back()}
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
              label={m.add()}
              faIcon="plus"
              type="submit"
              keyboardShortcut="⇧+⏎"
              onClick={() => addDelegationAndStay()}
            />
            <Button
              label={m.addAndClose()}
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
