import { $Enums, PrismaClient } from "../generated/client";
import delegationData from "./bbvn_berlin_2024.json";
import { alpha2ToAlpha3 } from "../countryCodeUtils";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   BBVN Berlin 2024 Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "BBVN Berlin 2024",
    },
    update: {},
    create: {
      name: "BBVN Berlin 2024",
      start: new Date("2024-12-01"),
      end: new Date("2024-12-02"),
    },
  });
  console.info("\n----------------\n");
  console.info(
    `Created a BBVN Berlin 2024 Conference with the ID ${conference.id}`,
  );

  // Committees

  const committees = {} as {
    GV: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
  };

  committees.GV = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "GV",
      name: "Generalversammlung",
      category: "COMMITTEE",
    },
  });

  console.info("\nCreated Committees:");
  console.info(
    `  - Created ${committees.GV.abbreviation} with ID ${committees.GV.id}`,
  );

  // Committee seeding

  const agendaItems = {
    GV: ["Zugang zu erneuerbaren Energien im Rahmen der Agenda 2030"],
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
        nation: { connect: { alpha3Code: alpha2ToAlpha3(data.alpha2Code) } },
      },
    });
    console.info(
      `  - Created Delegation for ${alpha2ToAlpha3(data.alpha2Code)} with ID ${
        delegation.id
      }`,
    );

    if (data.GV) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.GV?.id,
          delegationId: delegation.id,
        },
      });
    }
  }

  // Non-State Actors
  console.info("\nCreated Non-State Actor CommitteeMemberships:");

  const nonStateActors: string[] = [];

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
