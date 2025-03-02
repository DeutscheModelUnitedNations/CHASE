import { useContext, useState } from "react";
import useMousetrap from "mousetrap-react";
import CountryAutoComplete from "./country_auto_complete";
import type { $Enums } from "@prisma/client";
import type {
  AllAvailableCountriesType,
  CountryDataType,
} from "../admin/delegations/add_delegation_dialog";
import { useToast } from "@/lib/contexts/toast";
import { SpeakersListDataContext } from "@/lib/contexts/speakers_list_data";
import * as m from "@/paraglide/messages";
import { backend } from "@/lib/backend/clientsideBackend";
import Button from "../Button";

/**
 * This component is used to display the overlay to add a speaker to the Speakers List on the Speakers List Page for chairs.
 * It uses the AutoComplete Component from PrimeReact.
 * The overlay is displayed when the user clicks on the Add Speaker Button.
 * The user can search for a country by name or by code.
 * The user can select a country from the list of suggestions.
 * The user can click on the Add Speaker Button to add the speaker and keep the overlay open, or click on the Add and Close Button to add the speaker and close the overlay.
 * Instead of clicking on the Add Speaker Button, the user can press the Enter key after selecting a country to trigger the same action.
 * Note: Not only countries can be added to the Speakers List, but also Non-State Actors and als UN Staff like the Secretary-General (Country-Code: unm / unw (male/female))
 */

// TODO add warning when a speaker is added to the list and the list is closed

export default function AddSpeakerOverlay({
  typeOfList,
  allCountries,
  closeOverlay,
}: {
  typeOfList: $Enums.SpeakersListCategory;
  allCountries: AllAvailableCountriesType | null;
  closeOverlay: () => void;
}) {
  const { showToast, toastError } = useToast();

  const [selectedCountry, setSelectedCountry] =
    useState<CountryDataType | null>(null);
  const speakersListData = useContext(SpeakersListDataContext);

  const [focusInputField, setFocusInputField] = useState<boolean>(false);

  const listTypeMap: {
    [key in $Enums.SpeakersListCategory]: string;
  } = {
    SPEAKERS_LIST: m.speakersList(),
    COMMENT_LIST: m.questionsAndComments(),
    MODERATED_CAUCUS: m.moderatedCaucus(),
  };

  const sendAddSpeaker = async () => {
    if (selectedCountry && speakersListData?.id) {
      await backend
        .speakersList({ speakersListId: speakersListData.id })
        .addSpeaker.code({ countryCode: selectedCountry.alpha3Code })
        .post()
        .then((res) => {
          if (res.status === 200) {
            showToast({
              severity: "success",
              summary: m.itemAdded({ item: selectedCountry.name ?? "" }),
              detail: m.to({ to: listTypeMap[typeOfList] }),
              sticky: false,
            });
            setSelectedCountry(null);
          } else {
            showToast({
              severity: "warn",
              summary: m.alreadyOn({ list: selectedCountry.name ?? "" }),
              detail: m.countryAlreadyOn({ list: listTypeMap[typeOfList] }),
              sticky: false,
            });
            setFocusInputField(!focusInputField);
          }
        })
        .catch((e) => {
          toastError(e);
        });
    }
  };

  useMousetrap("esc", () => closeOverlay());

  useMousetrap("enter", () => {
    if (selectedCountry?.alpha3Code) {
      sendAddSpeaker();
      setFocusInputField(!focusInputField);
    }
  });

  useMousetrap("shift+enter", () => {
    if (selectedCountry?.alpha3Code) {
      sendAddSpeaker();
      closeOverlay();
    }
  });

  return (
    <>
      <div className="mt-1 flex flex-col gap-5">
        <CountryAutoComplete
          allCountries={allCountries}
          placeholder={m.searchForSpeakers()}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          focusInputField={focusInputField}
        />

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            label={m.close()}
            faIcon="times"
            onClick={closeOverlay}
            severity="danger"
            text
            keyboardShortcut="Esc"
          />
          <Button
            label={m.addAndClose()}
            faIcon="plus"
            onClick={() => {
              sendAddSpeaker();
              closeOverlay();
            }}
            text
            keyboardShortcut="⇧ + ⏎"
          />
          <Button
            label={m.add()}
            faIcon="plus"
            onClick={() => {
              sendAddSpeaker();
              setSelectedCountry(null);
            }}
            keyboardShortcut="⏎"
          />
        </div>
      </div>
    </>
  );
}
