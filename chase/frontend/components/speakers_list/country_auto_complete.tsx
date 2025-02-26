import { useEffect, useState, useRef } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import Fuse from "fuse.js";
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { SmallFlag } from "../flag_templates";
import type {
  AllAvailableCountriesType,
  CountryDataType,
} from "../admin/delegations/add_delegation_dialog";

export default function CountryAutoComplete({
  allCountries,
  selectedCountry,
  setSelectedCountry,
  placeholder,
  focusInputField,
}: {
  allCountries: AllAvailableCountriesType | null;
  selectedCountry: CountryDataType | null;
  setSelectedCountry: (country: CountryDataType | null) => void;
  placeholder: string;
  focusInputField?: boolean;
}) {
  const { locale } = useI18nContext();

  const [countries, setCountries] = useState<CountryDataType[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<CountryDataType[]>(
    [],
  );
  const [fuse, setFuse] = useState<Fuse<CountryDataType> | null>(null);

  useEffect(() => {
    if (!allCountries) return;
    const countryData: CountryDataType[] = allCountries.map((country) => {
      return {
        ...country,
        name: getCountryNameByCode(country.alpha3Code, locale),
      };
    });
    setCountries(countryData);

    const options = {
      keys: ["name", "alpha3"],
      includeScore: true,
    };
    setFuse(new Fuse(countryData, options));
  }, [allCountries, locale]);

  useEffect(() => {
    if (!selectedCountry?.name) return;
    setQuery(selectedCountry.name);
  }, [selectedCountry]);

  // useEffect(() => {
  //   // TODO this does not work as expected and I (Tade) am not sure what this even is supposed to do
  //   if (query === "") {
  //     setSelectedCountry(null);
  //   } else {
  //     const country = countries?.find((country) => country?.name === query);
  //     if (country) {
  //       setSelectedCountry(country);
  //     } else {
  //       setSelectedCountry(null);
  //     }
  //   }
  // }, [query, countries, selectedCountry]);

  const searchCountry = (event: AutoCompleteCompleteEvent) => {
    if (!fuse) return;

    let filteredCountries: CountryDataType[] = [];
    if (!event.query.trim().length) {
      filteredCountries = countries ? [...countries] : [];
    } else {
      const results = fuse.search(event.query);
      filteredCountries = results.map((result) => result.item);
    }
    setFilteredCountries(filteredCountries);
  };

  const countryTemplate = (item: CountryDataType) => {
    return (
      <div className="flex items-center">
        <SmallFlag countryCode={item.alpha3Code} />
        <div className="ml-2">{item.name}</div>
      </div>
    );
  };

  const autoCompleteRef = useRef<AutoComplete>(null);

  function blur() {
    setTimeout(() => {
      if (!autoCompleteRef?.current) return;
      autoCompleteRef.current.getElement().querySelector("input")?.blur();
    }, 100);
  }

  useEffect(() => {
    if (focusInputField) {
      if (autoCompleteRef.current) {
        autoCompleteRef.current.focus();
      }
    }
  }, [focusInputField]);

  return (
    <>
      <AutoComplete
        ref={autoCompleteRef}
        value={selectedCountry}
        suggestions={filteredCountries}
        completeMethod={searchCountry}
        field={"name"}
        onChange={(e) => setSelectedCountry(e.value)}
        dropdown
        dropdownMode="blank"
        itemTemplate={countryTemplate}
        placeholder={placeholder}
        autoFocus
        dropdownAutoFocus
        autoHighlight
        forceSelection
        onSelect={(_e) => blur()}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === "Escape") {
            blur();
          }
        }}
      />
    </>
  );
}
