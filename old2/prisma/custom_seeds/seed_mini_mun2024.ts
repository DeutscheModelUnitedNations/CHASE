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
      name: "MINI-MUN 2024",
    },
    update: {},
    create: {
      name: "MINI-MUN 2024",
      start: new Date("2024-07-18"),
      end: new Date("2024-07-18"),
    },
  });
  console.info("\n----------------\n");
  console.info(
    `Created a MINI-MUN 2024 Conference with the ID ${conference.id}`,
  );

  // Committees

  const committees = {} as {
    SR: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
  };

  committees.SR = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "SR",
      name: "Sicherheitsrat",
      category: "COMMITTEE",
    },
  });

  console.info("\nCreated Committees:");
  console.info(
    `  - Created ${committees.SR.abbreviation} with ID ${committees.SR.id}`,
  );

  // Committee seeding

  const agendaItems = {
    SR: ["Desinfektion Kampagnen"],
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

    if (data.SR) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committees.SR?.id,
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
