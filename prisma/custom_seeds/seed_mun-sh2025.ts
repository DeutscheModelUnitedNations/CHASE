import { $Enums, PrismaClient } from "@prisma/client";
import delegationData from "./mun-sh2025_delegations.json";
import { mockedDefaultUser } from "@prisma/db";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   MUN-SH 2025 Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "MUN-SH 2025",
    },
    update: {},
    create: {
      name: "MUN-SH 2025",
      start: new Date("2025-03-06"),
      end: new Date("2025-03-10"),
    },
  });
  console.info("\n----------------\n");
  console.info(`Created a MUN-SH 2025 Conference with the ID ${conference.id}`);

  // Committees

  const committees = {} as {
    GV: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    WiSo: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    SR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    IMO: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    MRR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    KFK: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    RKL: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
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

  committees.IMO = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "IMO",
      name: "Internationale Seeschifffahrtsorganisation",
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

  committees.KFK = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "KFK",
      name: "Kommission für Friedenskonsolidierung",
      category: "COMMITTEE",
      parentId: committees.GV?.id,
    },
  });

  committees.RKL = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "RKL",
      name: "Regionalkommission für Lateinamerika und die Karibik",
      category: "COMMITTEE",
      parentId: committees.WiSo?.id,
    },
  });

  console.info("\nCreated Committees");

  // Committee seeding

  const agendaItems = {
    GV: [
      "Umgang mit Desinformationskampagnen",
      "Die Finanzierungskrise der UN",
      "KFK: Die Rolle indigener Völker in der Friedenssicherung in Kolumbien",
      "KFK: Korruptionsbekämpfung in Post-Konflikt Gebieten",
      "KFK: Menschen mit kriegsbedingten Behinderungen in Postkonfliktgebieten",
    ],

    WiSo: [
      "Bekämpfung von Hunger und Mangelernährung",
      "Eine internationale Konvention für globale Steuern (UN-Steuerkonvention)",
      "RKL: Ausbeutung im Rahmen der Kaffeeproduktion",
      "RKL: Soziale Neuausrichtung von Städten",
      "RKL: Bekämpfung ethnisch bedingter sozialer Ungleichheiten",
    ],

    SR: [
      "Cyberkriminalität und internationale Sicherheit",
      "Konflikt in Burkina Faso",
      "Aktuelles: Die Lage in Syrien",
    ],

    MRR: [
      "Maschinelles Lernen als Diskriminierungsverstärker",
      "Menschenrechtsverletzungen durch Naturschutzprojekte",
      "Generationengerechtigkeit und Menschenrechte",
    ],

    IMO: [
      "Potenziale und Risiken von marinen Geoengineering-Technologien",
      "Abbau von Bodenschätzen in der Antarktis",
      "Migration auf See",
    ],

    KFK: [
      "Die Rolle indigener Völker in der Friedenssicherung in Kolumbien",
      "Korruptionsbekämpfung in Post-Konflikt Gebieten",
      "Menschen mit kriegsbedingten Behinderungen in Postkonfliktgebieten",
    ],

    RKL: [
      "Ausbeutung im Rahmen der Kaffeeproduktion",
      "Soziale Neuausrichtung von Städten",
      "Bekämpfung ethnisch bedingter sozialer Ungleichheiten",
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

  for (const data of delegationData.delegations) {
    console.log(data);
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

    if (data.IMO) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.IMO?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.KFK) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.KFK?.id,
          delegationId: delegation.id,
        },
      });
    }

    if (data.RKL) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.RKL?.id,
          delegationId: delegation.id,
        },
      });
    }
  }

  // Non-State Actors
  console.info("\nCreated Non-State Actor CommitteeMemberships:");

  for (const baseDataNSA of delegationData.nonStateActors) {
    const nonStateActor = await prisma.nation.upsert({
      where: {
        alpha3Code: `nsa_${baseDataNSA.abbreviation}`,
      },
      update: {},
      create: {
        alpha3Code: `nsa_${baseDataNSA.abbreviation}`,
        alpha2Code: `nsa_${baseDataNSA.abbreviation}`,
        variant: $Enums.NationVariant.NON_STATE_ACTOR,
      },
    });

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

  await prisma.conferenceMember.create({
    data: {
      conferenceId: conference.id,
      role: $Enums.ConferenceRole.ADMIN,
      userId: mockedDefaultUser.id,
    },
  });

  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
