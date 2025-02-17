import nations from "@/data/nations";
import nonStateActors from "@/data/nsa";
import specialPersons from "@/data/specials";

/**
 * This function is used to get the name of a country in a given language.
 * It uses the country code to find the country in the countries.json file.
 * If the country is not found, it returns "xxx".
 * If the language is not found or specified, it returns the English name.
 */

export default function getCountryNameByCode(
  countryCode: string | null | undefined,
  locale: string,
): string {
  const availableLanguages = [
    "ar",
    "bg",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "eo",
    "es",
    "et",
    "eu",
    "fi",
    "fr",
    "hr",
    "hu",
    "hy",
    "it",
    "ja",
    "ko",
    "lt",
    "nl",
    "no",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sl",
    "sr",
    "sv",
    "th",
    "uk",
    "zh",
    "zh-tw",
  ];

  let languageCode = locale.split("-")[0];

  const combinedTranslations = [
    ...nations,
    ...nonStateActors,
    ...specialPersons,
  ];

  if (availableLanguages.includes(languageCode) === false) {
    languageCode = "en";
  }

  const res = combinedTranslations.find(
    (item) => item.alpha3 === countryCode?.toLowerCase(),
  );
  if (!res) return "–"; // Country not found

  return res[languageCode as keyof typeof res] as string;
}
