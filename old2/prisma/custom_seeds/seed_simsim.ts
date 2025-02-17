import { faker } from "@faker-js/faker";
import { $Enums, PrismaClient } from "../generated/client";

//
export async function SimSimSeed(prisma?: PrismaClient) {
  if (prisma === undefined) {
    // biome-ignore lint/style/noParameterAssign: This is a valid use case
    prisma = new PrismaClient();
  }
  // Conference for a SimSim
  const conferenceName = `${faker.color.human()} ${faker.animal.type()} SimSim Konferenz`;
  const conference = await prisma.conference.upsert({
    where: {
      name: conferenceName,
    },
    update: {},
    create: {
      name: conferenceName,
    },
  });

  // Two SimSim committees
  const committees = {} as {
    Sim1: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
    Sim2: Awaited<ReturnType<typeof prisma.committee.create>> | undefined;
  };

  committees.Sim1 = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "Sim1",
      name: `${faker.science.chemicalElement().name} SimSim`,
      category: "COMMITTEE",
    },
  });

  committees.Sim2 = await prisma.committee.create({
    data: {
      conferenceId: conference.id,
      abbreviation: "Sim2",
      name: `${faker.science.chemicalElement().name} SimSim`,
      category: "COMMITTEE",
    },
  });

  // Conference members

  for (let i = 0; i < 3; i++) {
    await prisma.conferenceMember.create({
      data: {
        conferenceId: conference.id,
        role: "ADMIN",
      },
    });
  }

  for (let i = 0; i < 21; i++) {
    await prisma.conferenceMember.create({
      data: {
        conferenceId: conference.id,
        role: "CHAIR",
      },
    });
  }

  const agendaItems = [
    "Nachhaltige wirtschaftliche Entwicklung in den am wenigsten entwickelten Ländern",
    "Umgang mit klimatischen Kipppunkten",
    "Globales Erinnern an Kolonialismus",

    "Situation in der Ukraine",
    "Bekämpfung illegaler Waffenlieferungen an nichtstaatliche Akteure",
    "Planetare Verteidigung",
  ];

  let i = 0;
  for (const committee of Object.values(committees)) {
    if (committee) {
      for (let j = 0; j < 3; j++) {
        const agendaItem = await prisma.agendaItem.create({
          data: {
            committeeId: committee.id,
            title: agendaItems[i] || "Dummy Agenda Item",
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
        i++;
      }
    }
  }

  const allCountries = [
    { alpha3Code: "atg" },
    { alpha3Code: "aut" },
    { alpha3Code: "brb" },
    { alpha3Code: "blr" },
    { alpha3Code: "bel" },
    { alpha3Code: "bol" },
    { alpha3Code: "bra" },
    { alpha3Code: "cmr" },
    { alpha3Code: "can" },
    { alpha3Code: "chl" },
    { alpha3Code: "chn" },
    { alpha3Code: "cub" },
    { alpha3Code: "cze" },
    { alpha3Code: "egy" },
    { alpha3Code: "fra" },
    { alpha3Code: "deu" },
    { alpha3Code: "isl" },
    { alpha3Code: "ita" },
    { alpha3Code: "jam" },
    { alpha3Code: "jpn" },
    { alpha3Code: "lie" },
    { alpha3Code: "mex" },
    { alpha3Code: "pol" },
    { alpha3Code: "rus" },
    { alpha3Code: "esp" },
    { alpha3Code: "uga" },
    { alpha3Code: "ukr" },
    { alpha3Code: "gbr" },
    { alpha3Code: "usa" },
    { alpha3Code: "zwe" },

    { alpha3Code: "nsa_amn", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Amnesty International
    { alpha3Code: "nsa_gnwp", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Global Network of Women Peacekeepers
    { alpha3Code: "nsa_gp", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Greenpeace
    { alpha3Code: "nsa_hrw", variant: $Enums.NationVariant.NON_STATE_ACTOR }, // Human Rights Watch
  ];

  for (const country of allCountries.filter((c) => !c.variant)) {
    const delegation = await prisma.delegation.create({
      data: {
        conference: { connect: { id: conference.id } },
        nation: { connect: { alpha3Code: country.alpha3Code } },
      },
    });

    await prisma.committeeMember.createMany({
      data: [
        {
          committeeId: committees.Sim1?.id,
          delegationId: delegation.id,
        },
        {
          committeeId: committees.Sim2?.id,
          delegationId: delegation.id,
        },
      ],
    });
  }

  for (const nonStateActor of allCountries.filter(
    (c) => c.variant === $Enums.NationVariant.NON_STATE_ACTOR,
  )) {
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
      }
    }
  }

  // Special Persons

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
      }
    }
  }

  // Create dummy users for all conference- and committee-members
  // biome-ignore lint/suspicious/noExplicitAny: This is only a seeding file and therefore not part of the application
  const users: any = [];

  const allConferenceMembers = await prisma.conferenceMember.findMany({
    where: {
      conferenceId: conference.id,
    },
  });

  for (const member of allConferenceMembers) {
    const data = {
      email: faker.internet.email(),
      password: "chase",
      role: member.role,
    };

    console.info(`${data.email},${data.password},${data.role}`);

    const user = await prisma.user.create({
      data: {
        name: data.email,
        emails: {
          create: {
            email: data.email,
            validated: true,
          },
        },
        passwords: {
          create: {
            passwordHash: await Bun.password.hash(data.password),
          },
        },
      },
    });

    await prisma.conferenceMember.update({
      where: {
        id: member.id,
      },
      data: {
        userId: user.id,
      },
    });

    users.push(data);
  }

  const allSim1Members = await prisma.committeeMember.findMany({
    where: {
      committeeId: committees.Sim1?.id,
    },
  });

  for (const member of allSim1Members) {
    const data = {
      email: faker.internet.email(),
      password: "chase",
      role: "SimSim 1 Delegate",
    };

    const user = await prisma.user.create({
      data: {
        name: data.email,
        emails: {
          create: {
            email: data.email,
            validated: true,
          },
        },
        passwords: {
          create: {
            passwordHash: await Bun.password.hash(data.password),
          },
        },
      },
    });

    await prisma.committeeMember.update({
      where: {
        id: member.id,
      },
      data: {
        userId: user.id,
      },
    });

    const committeeMember = await prisma.committeeMember.findUnique({
      where: {
        id: member.id,
      },
      include: {
        delegation: {
          include: {
            nation: true,
          },
        },
      },
    });

    console.info(
      `${data.email},${data.password},${data.role},${committeeMember?.delegation?.nation?.alpha3Code}`,
    );

    users.push(data);
  }

  const allSim2Members = await prisma.committeeMember.findMany({
    where: {
      committeeId: committees.Sim2?.id,
    },
  });

  for (const member of allSim2Members) {
    const data = {
      email: faker.internet.email(),
      password: "chase",
      role: "SimSim 2 Delegate",
    };

    const user = await prisma.user.create({
      data: {
        name: data.email,
        emails: {
          create: {
            email: data.email,
            validated: true,
          },
        },
        passwords: {
          create: {
            passwordHash: await Bun.password.hash(data.password),
          },
        },
      },
    });

    await prisma.committeeMember.update({
      where: {
        id: member.id,
      },
      data: {
        userId: user.id,
      },
    });

    const committeeMember = await prisma.committeeMember.findUnique({
      where: {
        id: member.id,
      },
      include: {
        delegation: {
          include: {
            nation: true,
          },
        },
      },
    });

    console.info(
      `${data.email},${data.password},${data.role},${committeeMember?.delegation?.nation?.alpha3Code}`,
    );

    users.push(data);
  }

  await prisma.$disconnect();
}
