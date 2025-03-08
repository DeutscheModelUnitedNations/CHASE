import { $Enums, PrismaClient } from "@prisma/client";
import delegationData from "./dmun_simsim.json";
import { mockedDefaultUser } from "../db";
const prisma = new PrismaClient();

try {
  /*
   * --------------------
   *   DMUN SIMSIM Data
   * --------------------
   */
  const conference = await prisma.conference.upsert({
    where: {
      name: "DMUN SimSim",
    },
    update: {},
    create: {
      name: "DMUN SimSim",
    },
  });
  console.info("\n----------------\n");
  console.info(`Created a DMUN SimSim Conference with the ID ${conference.id}`);

  // Committees

  for (let i = 0; i < 8; i++) {
    const committee = await prisma.committee.create({
      data: {
        conferenceId: conference.id,
        abbreviation: `Sim${i + 1}`,
        name: `SimSim ${i + 1}`,
        category: "COMMITTEE",
      },
    });

    console.info(`\nCreated Committee ${i + 1}`);

    // Committee seeding

    const agendaItem = await prisma.agendaItem.create({
      data: {
        committeeId: committee.id,
        title: "Kindersoldaten",
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
      const delegation = await prisma.delegation.upsert({
        where: {
          conferenceId_nationAlpha3Code: {
            conferenceId: conference.id,
            nationAlpha3Code: data.alpha3Code,
          },
        },
        create: {
          conference: { connect: { id: conference.id } },
          nation: { connect: { alpha3Code: data.alpha3Code } },
        },
        update: {},
      });
      console.info(
        `  - Created Delegation for ${data.alpha3Code} with ID ${delegation.id}`,
      );

      await prisma.committeeMember.create({
        data: {
          committeeId: committee.id,
          delegationId: delegation.id,
        },
      });
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

      const delegation = await prisma.delegation.upsert({
        where: {
          conferenceId_nationAlpha3Code: {
            conferenceId: conference.id,
            nationAlpha3Code: nonStateActor.alpha3Code,
          },
        },
        create: {
          conference: { connect: { id: conference.id } },
          nation: { connect: { alpha3Code: nonStateActor.alpha3Code } },
        },
        update: {},
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
