import { SimSimSeed } from "./custom_seeds/seed_simsim";
import { $Enums, PrismaClient } from "./generated/client";
const prisma = new PrismaClient();

export const allCountries = [
  { alpha3Code: "afg" },
  { alpha3Code: "alb" },
  { alpha3Code: "dza" },
  { alpha3Code: "and" },
  { alpha3Code: "ago" },
  { alpha3Code: "atg" },
  { alpha3Code: "arg" },
  { alpha3Code: "arm" },
  { alpha3Code: "aus" },
  { alpha3Code: "aut" },
  { alpha3Code: "aze" },
  { alpha3Code: "bhs" },
  { alpha3Code: "bhr" },
  { alpha3Code: "bgd" },
  { alpha3Code: "brb" },
  { alpha3Code: "blr" },
  { alpha3Code: "bel" },
  { alpha3Code: "blz" },
  { alpha3Code: "ben" },
  { alpha3Code: "btn" },
  { alpha3Code: "bol" },
  { alpha3Code: "bih" },
  { alpha3Code: "bwa" },
  { alpha3Code: "bra" },
  { alpha3Code: "brn" },
  { alpha3Code: "bgr" },
  { alpha3Code: "bfa" },
  { alpha3Code: "bdi" },
  { alpha3Code: "khm" },
  { alpha3Code: "cmr" },
  { alpha3Code: "can" },
  { alpha3Code: "cpv" },
  { alpha3Code: "caf" },
  { alpha3Code: "tcd" },
  { alpha3Code: "chl" },
  { alpha3Code: "chn" },
  { alpha3Code: "col" },
  { alpha3Code: "com" },
  { alpha3Code: "cog" },
  { alpha3Code: "cod" },
  { alpha3Code: "cri" },
  { alpha3Code: "civ" },
  { alpha3Code: "hrv" },
  { alpha3Code: "cub" },
  { alpha3Code: "cyp" },
  { alpha3Code: "cze" },
  { alpha3Code: "dnk" },
  { alpha3Code: "dji" },
  { alpha3Code: "dma" },
  { alpha3Code: "dom" },
  { alpha3Code: "ecu" },
  { alpha3Code: "egy" },
  { alpha3Code: "slv" },
  { alpha3Code: "gnq" },
  { alpha3Code: "eri" },
  { alpha3Code: "est" },
  { alpha3Code: "eth" },
  { alpha3Code: "fji" },
  { alpha3Code: "fin" },
  { alpha3Code: "fra" },
  { alpha3Code: "gab" },
  { alpha3Code: "gmb" },
  { alpha3Code: "geo" },
  { alpha3Code: "deu" },
  { alpha3Code: "gha" },
  { alpha3Code: "grc" },
  { alpha3Code: "grd" },
  { alpha3Code: "gtm" },
  { alpha3Code: "gin" },
  { alpha3Code: "gnb" },
  { alpha3Code: "guy" },
  { alpha3Code: "hti" },
  { alpha3Code: "hnd" },
  { alpha3Code: "hun" },
  { alpha3Code: "isl" },
  { alpha3Code: "ind" },
  { alpha3Code: "idn" },
  { alpha3Code: "irn" },
  { alpha3Code: "irq" },
  { alpha3Code: "irl" },
  { alpha3Code: "isr" },
  { alpha3Code: "ita" },
  { alpha3Code: "jam" },
  { alpha3Code: "jpn" },
  { alpha3Code: "jor" },
  { alpha3Code: "kaz" },
  { alpha3Code: "ken" },
  { alpha3Code: "kir" },
  { alpha3Code: "prk" },
  { alpha3Code: "kor" },
  { alpha3Code: "kwt" },
  { alpha3Code: "kgz" },
  { alpha3Code: "lao" },
  { alpha3Code: "lva" },
  { alpha3Code: "lbn" },
  { alpha3Code: "lso" },
  { alpha3Code: "lbr" },
  { alpha3Code: "lby" },
  { alpha3Code: "lie" },
  { alpha3Code: "ltu" },
  { alpha3Code: "lux" },
  { alpha3Code: "mkd" },
  { alpha3Code: "mdg" },
  { alpha3Code: "mwi" },
  { alpha3Code: "mys" },
  { alpha3Code: "mdv" },
  { alpha3Code: "mli" },
  { alpha3Code: "mlt" },
  { alpha3Code: "mhl" },
  { alpha3Code: "mrt" },
  { alpha3Code: "mus" },
  { alpha3Code: "mex" },
  { alpha3Code: "fsm" },
  { alpha3Code: "mar" },
  { alpha3Code: "mda" },
  { alpha3Code: "mco" },
  { alpha3Code: "mng" },
  { alpha3Code: "mne" },
  { alpha3Code: "moz" },
  { alpha3Code: "mmr" },
  { alpha3Code: "nam" },
  { alpha3Code: "nru" },
  { alpha3Code: "npl" },
  { alpha3Code: "nld" },
  { alpha3Code: "nzl" },
  { alpha3Code: "nic" },
  { alpha3Code: "ner" },
  { alpha3Code: "nga" },
  { alpha3Code: "nor" },
  { alpha3Code: "omn" },
  { alpha3Code: "pak" },
  { alpha3Code: "plw" },
  { alpha3Code: "pan" },
  { alpha3Code: "png" },
  { alpha3Code: "pry" },
  { alpha3Code: "per" },
  { alpha3Code: "phl" },
  { alpha3Code: "pol" },
  { alpha3Code: "prt" },
  { alpha3Code: "qat" },
  { alpha3Code: "rou" },
  { alpha3Code: "rus" },
  { alpha3Code: "rwa" },
  { alpha3Code: "kna" },
  { alpha3Code: "lca" },
  { alpha3Code: "vct" },
  { alpha3Code: "wsm" },
  { alpha3Code: "smr" },
  { alpha3Code: "stp" },
  { alpha3Code: "sau" },
  { alpha3Code: "sen" },
  { alpha3Code: "srb" },
  { alpha3Code: "syc" },
  { alpha3Code: "sle" },
  { alpha3Code: "sgp" },
  { alpha3Code: "svk" },
  { alpha3Code: "svn" },
  { alpha3Code: "slb" },
  { alpha3Code: "som" },
  { alpha3Code: "zaf" },
  { alpha3Code: "ssd" },
  { alpha3Code: "esp" },
  { alpha3Code: "lka" },
  { alpha3Code: "sdn" },
  { alpha3Code: "sur" },
  { alpha3Code: "swz" },
  { alpha3Code: "swe" },
  { alpha3Code: "che" },
  { alpha3Code: "syr" },
  { alpha3Code: "tjk" },
  { alpha3Code: "tza" },
  { alpha3Code: "tha" },
  { alpha3Code: "tls" },
  { alpha3Code: "tgo" },
  { alpha3Code: "ton" },
  { alpha3Code: "tto" },
  { alpha3Code: "tun" },
  { alpha3Code: "tur" },
  { alpha3Code: "tkm" },
  { alpha3Code: "tuv" },
  { alpha3Code: "uga" },
  { alpha3Code: "ukr" },
  { alpha3Code: "are" },
  { alpha3Code: "gbr" },
  { alpha3Code: "usa" },
  { alpha3Code: "ury" },
  { alpha3Code: "uzb" },
  { alpha3Code: "vut" },
  { alpha3Code: "ven" },
  { alpha3Code: "vnm" },
  { alpha3Code: "yem" },
  { alpha3Code: "zmb" },
  { alpha3Code: "zwe" },
  { alpha3Code: "unk" }, // TODO Kosovo, only temporary for MUNBW 2024

  { alpha3Code: "unm", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Male General Secretary
  { alpha3Code: "undm", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Male Deputy General Secretary
  { alpha3Code: "unw", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Female General Secretary
  { alpha3Code: "un", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Gender Neutral General Secretary
  { alpha3Code: "undw", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Female Deputy General Secretary
  { alpha3Code: "und", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Gender Neutral Deputy General Secretary
  { alpha3Code: "gsm", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Male Guest Speaker
  { alpha3Code: "gsw", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Female Guest Speaker
  { alpha3Code: "gs", variant: $Enums.NationVariant.SPECIAL_PERSON }, // Gender Neutral Guest Speaker
  { alpha3Code: "uno", variant: $Enums.NationVariant.SPECIAL_PERSON }, // MISC UN Official

  { alpha3Code: "nsa_amn", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Amnesty International
  { alpha3Code: "nsa_gates", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Bill & Melinda Gates Foundation
  { alpha3Code: "nsa_gnwp", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Global Network of Women Peacekeepers
  { alpha3Code: "nsa_gp", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Greenpeace International
  { alpha3Code: "nsa_hrw", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Human Rights Watch
  { alpha3Code: "nsa_iog", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // International
  { alpha3Code: "nsa_icrc", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // International Red Cross
  { alpha3Code: "nsa_icg", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // International Crisis Group
  { alpha3Code: "nsa_ippnw", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // International Physicians for the Prevention of Nuclear War
  { alpha3Code: "nsa_mercy", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Mercy Corps
  { alpha3Code: "nsa_unwatch", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // UN Watch
  { alpha3Code: "nsa_whh", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Welthungerhilfe
  { alpha3Code: "nsa_wef", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // World Economic Forum
  { alpha3Code: "nsa_dwb", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Doctors Without Borders
  { alpha3Code: "nsa_dpa", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Data-Pop Alliance
  { alpha3Code: "nsa_oxf", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Oxfam International
  { alpha3Code: "nsa_rwb", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Reporters Without Borders
];

try {
  /*
   * -------------
   *   Base Data
   * -------------
   */

  console.info("Seeding Database with alpha3Codes");

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

  await SimSimSeed(prisma);

  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
