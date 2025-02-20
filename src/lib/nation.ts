import {
  type AvailableLanguageTag,
  availableLanguageTags,
  languageTag,
} from "@/paraglide/runtime";
import allNations from "world-countries";

function nationCodeToLocalName(
  code: string,
  locale = languageTag(),
  official = false,
) {
  const getTranslationCode = (locale: string) => {
    switch (locale) {
      case "de":
        return "deu";
      case "en":
        return "eng";
      default:
        return "eng";
    }
  };

  const nation = allNations.find((nation) => {
    if (code.length === 2) return nation.cca2 === code.toUpperCase();
    return nation.cca3 === code.toUpperCase();
  });

  if (!nation) {
    return "N/A";
  }

  let translation;

  if (getTranslationCode(locale) === "eng") {
    translation = nation.name;
  } else {
    if (
      !nation.translations ||
      !nation.translations[getTranslationCode(locale)]
    ) {
      return "N/A";
    }
    translation = nation.translations[getTranslationCode(locale)];
  }

  if (official) {
    return translation.official;
  }
  return translation.common;
}

// we build an index of nation codes to translation objects
type TranslationObject = { [key in AvailableLanguageTag]: string };
export const NationIso3ToLocalNamesMap = new Map<string, TranslationObject>();

for (const nation of allNations) {
  const translationObject: TranslationObject = {} as any;
  for (const languageTag of availableLanguageTags) {
    translationObject[languageTag] = nationCodeToLocalName(
      nation.cca3,
      languageTag,
    );
  }
  NationIso3ToLocalNamesMap.set(nation.cca3, translationObject);
}

Object.freeze(NationIso3ToLocalNamesMap);

export const getFullTranslatedCountryNameFromISO3Code = (iso3Code: string) => {
  const found = NationIso3ToLocalNamesMap.get(iso3Code.toUpperCase());
  if (found) return found[languageTag()];

  console.warn("Could not translate country code", iso3Code);
  return "N/A";
};

/**
 * This function is used to get the path to the flag image for a given country code.
 */
export default function getFlagPathByCode(code: string): string {
  let path = "";

  if (code.startsWith("nsa_")) {
    // path = `/nsa_logos/${countryCode}.png`;
    // TODO - this is a temporary solution until we have the correct logos
    path = "/flags/nsa.svg";
  } else if (
    [
      "unm",
      "unw",
      "gsm",
      "gsw",
      "uno",
      "undw",
      "undm",
      "und",
      "un",
      "gs",
    ].includes(code)
  ) {
    path = "/flags/uno.svg";
  } else if (code === "xxx") {
    path = "/flags/xxx.svg";
  } else {
    path = `/flags/${code}.svg`;
  }

  return path;
}
