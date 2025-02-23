import worldCountries, { type Country } from "world-countries";

export function alpha3ToAlpha2(alpha3: string): string {
  const res = worldCountries.find((country: Country) => {
    if (country.cca3.toLowerCase() === alpha3.toLowerCase()) {
      return country.cca2;
    }
  });
  if (!res) throw new Error("Country not found");
  return res.cca3.toLowerCase();
}

export function alpha2ToAlpha3(alpha2: string): string {
  const res = worldCountries.find((country: Country) => {
    if (country.cca2.toLowerCase() === alpha2.toLowerCase()) {
      return country.cca3;
    }
  });
  if (!res) throw new Error("Country not found");
  return res.cca3.toLowerCase();
}
