import { $Enums, PrismaClient } from "@prisma/client";
import delegationData from "./dmun_ego.json";
import { mockedDefaultUser } from "@prisma/db";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   DMUN EGO Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "DMUN EGO",
    },
    update: {},
    create: {
      name: "DMUN EGO",
    },
  });
  console.info("\n----------------\n");
  console.info(`Created a DMUN EGO Conference with the ID ${conference.id}`);

  // Committees
  const committee = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: `EGO`,
      name: `Einführung in die Geschäftsordnung`,
      category: "COMMITTEE",
    },
  });

  console.info(`\nCreated Committee EGO`);

  // Committee seeding

  const agendaItem = await prisma.agendaItem.create({
    data: {
      committeeId: committee.id,
      title: "Umgang mit der Globalisierung",
      isActive: true,
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

  console.info("\nCreated Agenda Items");

  // Delegations
  console.info("\nCreated Delegations:");

  for (const data of delegationData.delegations) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: data.alpha3Code } },
      },
    });
    console.info(
      `  - Created Delegation for ${data.alpha3Code} with ID ${delegation.id}`,
    );

    if (committee) {
      await prisma.committeeMember.create({
        data: {
          committeeId: committee.id,
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
