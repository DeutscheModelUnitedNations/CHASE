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
