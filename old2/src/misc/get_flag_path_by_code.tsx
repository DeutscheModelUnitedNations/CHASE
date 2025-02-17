/**
 * This function is used to get the path to the flag image for a given country code.
 */

export default function getFlagPathByCode(countryCode: string): string {
  let path = "";

  if (countryCode.startsWith("nsa_")) {
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
    ].includes(countryCode)
  ) {
    path = "/flags/uno.svg";
  } else if (countryCode === "xxx") {
    path = "/flags/xxx.svg";
  } else {
    path = `/flags/${countryCode}.svg`;
  }

  return path;
}
