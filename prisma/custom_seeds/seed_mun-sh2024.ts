import { $Enums, PrismaClient } from "../generated/client";
import delegationData from "./mun-sh_delegations.json";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   MUN-SH 2024 Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "MUN-SH 2024",
    },
    update: {},
    create: {
      name: "MUN-SH 2024",
      start: new Date("2024-03-07"),
      end: new Date("2024-03-11"),
    },
  });
  console.info("\n----------------\n");
  console.info(`Created a MUN-SH 2024 Conference with the ID ${conference.id}`);

  // Committees

  const committees = {} as {
    GV: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    HA1: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    WiSo: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    SR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    MRR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    WHO: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    IAEO: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
  };

  committees.GV = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "GV",
      name: "Generalversammlung",
      category: "COMMITTEE",
    },
  });

  committees.HA1 = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "HA1",
      name: "Hauptausschuss 1",
      category: "COMMITTEE",
      parentId: committees.GV?.id,
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

  committees.MRR = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "MRR",
      name: "Menschenrechtsrat",
      category: "COMMITTEE",
    },
  });

  committees.WHO = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "WHO",
      name: "Weltgesundheitsversammlung",
      category: "COMMITTEE",
    },
  });

  committees.IAEO = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "IAEO",
      name: "Generalkonferenz der Internationalen Atomenergieorganisation",
      category: "COMMITTEE",
    },
  });

  console.info("\nCreated Committees:");
  console.info(
    `  - Created ${committees.GV.abbreviation} with ID ${committees.GV.id}`,
  );
  console.info(
    `  - Created ${committees.HA1.abbreviation} with ID ${committees.HA1.id}`,
  );
  console.info(
    `  - Created ${committees.WiSo.abbreviation} with ID ${committees.WiSo.id}`,
  );
  console.info(
    `  - Created ${committees.SR.abbreviation} with ID ${committees.SR.id}`,
  );
  console.info(
    `  - Created ${committees.MRR.abbreviation} with ID ${committees.MRR.id}`,
  );
  console.info(
    `  - Created ${committees.WHO.abbreviation} with ID ${committees.WHO.id}`,
  );
  console.info(
    `  - Created ${committees.IAEO.abbreviation} with ID ${committees.IAEO.id}`,
  );

  // Committee seeding

  const agendaItems = {
    GV: [
      "Nachhaltige wirtschaftliche Entwicklung in den am wenigsten entwickelten Ländern",
      "Umgang mit klimatischen Kipppunkten",
      "Globales Erinnern an Kolonialismus",
    ],

    HA1: [
      "Situation in der Ukraine",
      "Bekämpfung illegaler Waffenlieferungen an nichtstaatliche Akteure",
      "Planetare Verteidigung",
    ],

    WiSo: [
      "Förderung von Kreislaufwirtschaft",
      "Umgang mit klimawandelbedingter Migration",
      "Rolle von künstlicher Intelligenz für die nachhaltige Entwicklung",
    ],

    SR: [
      "Aktuelles",
      "Situation in Haiti",
      "Bedeutung natürlicher Ressourcen für bewaffnete Konflikte",
    ],

    MRR: [
      "Verantwortung von Unternehmen für Menschenrechte entlang globaler Lieferketten",
      "Umsetzung des Rechts auf eine saubere Umwelt",
      "Menschenrechtslage in der Demokratischen Republik Kongo",
    ],

    WHO: [
      "Verbesserung der psychischen Gesundheitsversorgung",
      "Bekämpfung der Folgeerkranungen von Fehl- und Mangelernährung",
      "Sicherung des Zugangs zu Verhütungsmitteln",
    ],

    IAEO: [
      "Sicherheit kerntechnischer Anlagen in Konfliktgebieten",
      "Auswirkungen von Uranabbau, -nutzung und -lagerung auf indigene Bevölkerungen",
      "Rolle der Kernenergie für die Umsetzung von SDG 7",
    ],
  };

  for (const committee of Object.keys(committees)) {
    if (committees[committee as keyof typeof committees]) {
      for (const itemTemplate of agendaItems[
        committee as keyof typeof committees
      ]) {
        const agendaItem = await prisma.agendaItem.create({
          data: {
            committeeId:
              committees[committee as keyof typeof committees]?.id || "0",
            title: itemTemplate || "Dummy Agenda Item",
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
        nation: { connect: { alpha3Code: data.alpha3Code } },
      },
    });
    console.info(
      `  - Created Delegation for ${data.alpha3Code} with ID ${delegation.id}`,
    );

    if (data.GV) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.GV?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.HA1) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.HA1?.id,
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

    if (data.MRR) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.MRR?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.WHO) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.WHO?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.IAEO) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.IAEO?.id,
          delegationId: delegation.id,
        },
      });
    }
  }

  // Non-State Actors
  console.info("\nCreated Non-State Actor CommitteeMemberships:");

  const nonStateActors = await prisma.nation.findMany({
    where: {
      variant: $Enums.NationVariant.NON_STATE_ACTOR,
    },
  });

  for (const nonStateActor of nonStateActors) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: nonStateActor.alpha3Code } },
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
          `  - Created CommitteeMembership for ${nonStateActor.alpha3Code} in ${committee.abbreviation}`,
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
