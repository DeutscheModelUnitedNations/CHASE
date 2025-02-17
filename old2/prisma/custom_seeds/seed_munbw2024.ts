import { $Enums, PrismaClient } from "../generated/client";
import { alpha2ToAlpha3 } from "../countryCodeUtils";
import delegationData from "./munbw2024_delegations.json";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   MUNBW 2024 Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "MUNBW 2024",
    },
    update: {},
    create: {
      name: "MUNBW 2024",
      start: new Date("2024-05-09"),
      end: new Date("2024-05-13"),
    },
  });
  console.info("\n----------------\n");
  console.info(`Created a MUNBW 2024 Conference with the ID ${conference.id}`);

  // Committees

  const committees = {} as {
    GV: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    WiSo: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    SR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    KWT: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    UV: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    IGH: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
  };

  committees.GV = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "GV",
      name: "Generalversammlung",
      category: "COMMITTEE",
    },
  });

  committees.WiSo = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "WiSo",
      name: "Wirtschaft- und Sozialrat",
      category: "COMMITTEE",
    },
  });

  committees.SR = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "SR",
      name: "Sicherheitsrat",
      category: "COMMITTEE",
    },
  });

  committees.KWT = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "KWT",
      name: "Kommission für Wissenschaft und Technologie im Dienste der Entwicklung",
      parentId: committees.WiSo?.id,
      category: "COMMITTEE",
    },
  });

  committees.UV = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "UV",
      name: "Umweltversammlung",
      category: "COMMITTEE",
    },
  });

  committees.IGH = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "IGH",
      name: "Internationaler Gerichtshof",
      category: "ICJ",
    },
  });

  console.info("\nCreated Committees:");
  console.info(
    `  - Created ${committees.GV.abbreviation} with ID ${committees.GV.id}`,
  );
  console.info(
    `  - Created ${committees.WiSo.abbreviation} with ID ${committees.WiSo.id}`,
  );
  console.info(
    `  - Created ${committees.SR.abbreviation} with ID ${committees.SR.id}`,
  );
  console.info(
    `  - Created ${committees.KWT.abbreviation} with ID ${committees.KWT.id}`,
  );
  console.info(
    `  - Created ${committees.UV.abbreviation} with ID ${committees.UV.id}`,
  );
  console.info(
    `  - Created ${committees.IGH.abbreviation} with ID ${committees.IGH.id}`,
  );

  // Committee seeding

  const agendaItems = {
    GV: [
      "Rolle der Vereinten Nationen bei der Förderung staatlicher Entwicklung",
      'Überprüfung der Umsetzung des Aktionsprogramms "Kultur des Friedens"',
    ],

    WiSo: [
      "Förderung von klimafreundlichen und nachhaltigen Finanzstrukturen",
      "Verhinderung und Bekämpfung von schweren Umweltverbrechen",
    ],

    SR: [
      "Desinformationskampagnen und Hybride Kriegsführung in bewaffneten Konflikten",
      "Situation in Mali",
    ],

    KWT: [
      "Förderung technischer Innovation in der nachhaltigen Stadtentwicklung",
      "Soziale und nachhaltige Entwicklung durch die Nutzung digitaler Technologien",
      "Die Rolle von Open Source-Zugang zu Forschung und Technologie",
    ],

    UV: [
      "Tiefsee-Bergbau im Lichte des Abkommens zum Schutz der Meeresökosysteme außerhalb staatlicher Hoheit",
      "Maßnahmen zur Bekämpfung grenzüberschreitender Umwelt- und Naturkatastrophen",
    ],

    IGH: [
      "Antrag der Republik Kosovo auf Erlass von Sofortmaßnahmen gegen das militärische Vorgehen Serbiens gemäß Art. 41 IGH-Statut",
    ],
  };

  for (const committee of Object.keys(committees)) {
    if (committees[committee as keyof typeof committees]) {
      for (const [index, itemTemplate] of agendaItems[
        committee as keyof typeof committees
      ].entries()) {
        const agendaItem = await prisma.agendaItem.create({
          data: {
            committeeId:
              committees[committee as keyof typeof committees]?.id || "0",
            title: itemTemplate || "Dummy Agenda Item",
            isActive: index === 0,
          },
        });
        await prisma.speakersList.createMany({
          data: [
            {
              type: "SPEAKERS_LIST",
              agendaItemId: agendaItem.id,
              speakingTime: 180,
              timeLeft: 180,
            },
            {
              type: "COMMENT_LIST",
              agendaItemId: agendaItem.id,
              speakingTime: 30,
              timeLeft: 30,
            },
          ],
        });
      }
    }
  }

  console.info("\nCreated Agenda Items");

  // Delegations
  console.info("\nCreated Delegations:");

  for (const data of delegationData) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: alpha2ToAlpha3(data.alpha2Code) } },
      },
    });
    console.info(
      `  - Created Delegation for ${data.nation} with ID ${delegation.id}`,
    );

    if (data.GV) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.GV?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.WiSo) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.WiSo?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.SR) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.SR?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.KWT) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.KWT?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.UV) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.UV?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.IGH) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.IGH?.id,
          delegationId: delegation.id,
        },
      });
    }
  }

  // Non-State Actors
  console.info("\nCreated Non-State Actor CommitteeMemberships:");

  const nonStateActors = [
    "nsa_hrw",
    "nsa_gp",
    "nsa_dwb",
    "nsa_dpa",
    "nsa_oxf",
    "nsa_rwb",
  ];

  for (const nonStateActor of nonStateActors) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: nonStateActor } },
      },
    });

    for (const committee of Object.values(committees)) {
      if (committee) {
        await prisma.committeeMember.create({
          data: {
            committeeId: committee.id,
            delegationId: delegation.id,
          },
        });
        console.info(
          `  - Created CommitteeMembership for ${nonStateActor} in ${committee.abbreviation}`,
        );
      }
    }
  }

  // Special Persons
  console.info("\nCreated Special Persons CommitteeMemberships:");

  const specialPersons = await prisma.nation.findMany({
    where: {
      variant: $Enums.NationVariant.SPECIAL_PERSON,
    },
  });

  for (const specialPerson of specialPersons) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: specialPerson.alpha3Code } },
      },
    });

    for (const committee of Object.values(committees)) {
      if (committee) {
        await prisma.committeeMember.create({
          data: {
            committeeId: committee.id,
            delegationId: delegation.id,
          },
        });
        console.info(
          `  - Created CommitteeMembership for ${specialPerson.alpha3Code} in ${committee.abbreviation}`,
        );
      }
    }
  }

  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
