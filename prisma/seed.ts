import { SimSimSeed } from "./custom_seeds/seed_simsim";
import { $Enums, PrismaClient } from "@prisma/client";
import baseCountries from "world-countries";
import { mockedDefaultUser } from "./db";
const prisma = new PrismaClient();

export const specialCountries: {
  alpha3Code: string;
  alpha2Code: string;
  variant: $Enums.NationVariant;
}[] = [
  {
    alpha3Code: "unm",
    alpha2Code: "unm",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Male General Secretary
  {
    alpha3Code: "undm",
    alpha2Code: "undm",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Male Deputy General Secretary
  {
    alpha3Code: "unw",
    alpha2Code: "unw",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Female General Secretary
  {
    alpha3Code: "un",
    alpha2Code: "un",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Gender Neutral General Secretary
  {
    alpha3Code: "undw",
    alpha2Code: "undw",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Female Deputy General Secretary
  {
    alpha3Code: "und",
    alpha2Code: "und",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Gender Neutral Deputy General Secretary
  {
    alpha3Code: "gsm",
    alpha2Code: "gsm",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Male Guest Speaker
  {
    alpha3Code: "gsw",
    alpha2Code: "gsw",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Female Guest Speaker
  {
    alpha3Code: "gs",
    alpha2Code: "gs",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // Gender Neutral Guest Speaker
  {
    alpha3Code: "uno",
    alpha2Code: "uno",
    variant: $Enums.NationVariant.SPECIAL_PERSON,
  }, // MISC UN Official

  {
    alpha3Code: "nsa_amn",
    alpha2Code: "nsa_amn",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Amnesty International
  {
    alpha3Code: "nsa_gates",
    alpha2Code: "nsa_gates",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Bill & Melinda Gates Foundation
  {
    alpha3Code: "nsa_gnwp",
    alpha2Code: "nsa_gnwp",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Global Network of Women Peacekeepers
  {
    alpha3Code: "nsa_gp",
    alpha2Code: "nsa_gp",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Greenpeace International
  {
    alpha3Code: "nsa_hrw",
    alpha2Code: "nsa_hrw",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Human Rights Watch
  {
    alpha3Code: "nsa_iog",
    alpha2Code: "nsa_iog",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // International
  {
    alpha3Code: "nsa_icrc",
    alpha2Code: "nsa_icrc",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // International Red Cross
  {
    alpha3Code: "nsa_icg",
    alpha2Code: "nsa_icg",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // International Crisis Group
  {
    alpha3Code: "nsa_ippnw",
    alpha2Code: "nsa_ippnw",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // International Physicians for the Prevention of Nuclear War
  {
    alpha3Code: "nsa_mercy",
    alpha2Code: "nsa_mercy",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Mercy Corps
  {
    alpha3Code: "nsa_unwatch",
    alpha2Code: "nsa_unwatch",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // UN Watch
  {
    alpha3Code: "nsa_whh",
    alpha2Code: "nsa_whh",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Welthungerhilfe
  {
    alpha3Code: "nsa_wef",
    alpha2Code: "nsa_wef",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // World Economic Forum
  {
    alpha3Code: "nsa_dwb",
    alpha2Code: "nsa_dwb",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Doctors Without Borders
  {
    alpha3Code: "nsa_dpa",
    alpha2Code: "nsa_dpa",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Data-Pop Alliance
  {
    alpha3Code: "nsa_oxf",
    alpha2Code: "nsa_oxf",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Oxfam International
  {
    alpha3Code: "nsa_rwb",
    alpha2Code: "nsa_rwb",
    variant: $Enums.NationVariant.NON_STATE_ACTOR,
  }, // Reporters Without Borders
];

try {
  /*
   * -------------
   *   Base Data
   * -------------
   */

  console.info("Seeding Database with alpha3Codes");

  const allCountries = [
    ...baseCountries
      .filter((x) => x.unMember)
      .map((x) => ({
        alpha3Code: x.cca3.toLowerCase(),
        alpha2Code: x.cca2.toLowerCase(),
        variant: $Enums.NationVariant.NATION,
      })),
    ...specialCountries,
  ];

  const countries = await Promise.all(
    allCountries.map((country) => {
      console.info(`--> Creating ${JSON.stringify(country)}`);
      return prisma.nation.upsert({
        where: {
          alpha3Code: country.alpha3Code,
        },
        create: country,
        update: country,
      });
    }),
  );
  console.info(
    `==> Created ${countries.length} countries as base country data`,
  );

  console.info("\nSeeding Database with SimSim Committees and Users");

  // await prisma.user.create({
  //   data: mockedDefaultUser,
  // });

  await SimSimSeed(prisma);

  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
