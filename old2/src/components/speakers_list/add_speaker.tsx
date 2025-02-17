import { useContext, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Button from "@components/button";
import useMousetrap from "mousetrap-react";
import CountryAutoComplete from "./country_auto_complete";
import { useBackend } from "@/contexts/backend";
import type { $Enums } from "@prisma/generated/client";
import { useToast } from "@/contexts/toast";
import { SpeakersListDataContext } from "@/contexts/speakers_list_data";
import type {
  AllAvailableCountriesType,
  CountryDataType,
} from "@/components/admin/delegations/add_delegation_dialog";

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
  const { LL } = useI18nContext();
  const { backend } = useBackend();
  const { showToast, toastError } = useToast();

  const [selectedCountry, setSelectedCountry] =
    useState<CountryDataType | null>(null);
  const speakersListData = useContext(SpeakersListDataContext);

  const [focusInputField, setFocusInputField] = useState<boolean>(false);

  const listTypeMap: {
    [key in $Enums.SpeakersListCategory]: string;
  } = {
    SPEAKERS_LIST: LL.participants.speakersList.SPEAKERS_LIST(),
    COMMENT_LIST: LL.participants.speakersList.COMMENT_LIST(),
    MODERATED_CAUCUS: LL.participants.speakersList.MODERATED_CAUCUS(),
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
              summary:
                LL.chairs.speakersList.addSpeakerOverlay.TOAST_ADDED_SUMMARY(
                  selectedCountry.name ?? "",
                ),
              detail:
                LL.chairs.speakersList.addSpeakerOverlay.TOAST_ADDED_DETAIL(
                  listTypeMap[typeOfList],
                ),
              sticky: false,
            });
            setSelectedCountry(null);
          } else {
            showToast({
              severity: "warn",
              summary:
                LL.chairs.speakersList.addSpeakerOverlay.TOAST_ALREADY_ON_LIST(
                  selectedCountry.name ?? "",
                ),
              detail:
                LL.chairs.speakersList.addSpeakerOverlay.TOAST_ALREADY_ON_LIST_DETAIL(
                  listTypeMap[typeOfList],
                ),
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
      <div className="flex flex-col gap-5 mt-1">
        <CountryAutoComplete
          allCountries={allCountries}
          placeholder={LL.chairs.speakersList.addSpeakerOverlay.PLACEHOLDER()}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          focusInputField={focusInputField}
        />

        <div className="flex gap-3 justify-end flex-wrap">
          <Button
            label={LL.chairs.speakersList.addSpeakerOverlay.BUTTON_CANCEL()}
            faIcon="times"
            onClick={closeOverlay}
            severity="danger"
            text
            keyboardShortcut="Esc"
          />
          <Button
            label={LL.chairs.speakersList.addSpeakerOverlay.BUTTON_ADD_AND_CLOSE()}
            faIcon="plus"
            onClick={() => {
              sendAddSpeaker();
              closeOverlay();
            }}
            text
            keyboardShortcut="⇧ + ⏎"
          />
          <Button
            label={LL.chairs.speakersList.addSpeakerOverlay.BUTTON_ADD()}
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
