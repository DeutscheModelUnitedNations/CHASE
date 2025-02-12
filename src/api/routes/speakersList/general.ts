import { t, Elysia } from "elysia";
import { db } from "../../../../prisma/db";
import { openApiTag } from "../../util/openApiTags";
import { SpeakersListCategory } from "../../../../prisma/generated/schema/SpeakersListCategory";
import { permissionsPlugin } from "../../auth/permissions";

export const speakersListGeneral = new Elysia({
  prefix: "/conference/:conferenceId/committee/:committeeId",
})
  .use(permissionsPlugin)
  .get(
    "/speakersList",
    async ({ params: { committeeId }, permissions }) => {
      const speakersList = await db.speakersList.findMany({
        where: {
          agendaItem: {
            committeeId,
            isActive: true,
          },
          AND: [permissions.allowDatabaseAccessTo("list").SpeakersList],
        },
        include: {
          speakers: {
            include: {
              committeeMember: {
                include: {
                  delegation: {
                    include: {
                      nation: {
                        select: {
                          alpha3Code: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      });

      return speakersList;
    },
    {
      detail: {
        description: "Get all speakers lists in this committee",
      },
    }
  )
  .get(
    "/speakersList/:type",
    async ({ params: { committeeId, type }, permissions }) => {
      return await db.speakersList.findFirst({
        where: {
          agendaItem: {
            committeeId,
            isActive: true,
          },
          type,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakersList],
        },
        include: {
          speakers: {
            include: {
              committeeMember: {
                select: {
                  id: true,
                  userId: true,
                  delegation: {
                    select: {
                      id: true,
                      nation: {
                        select: {
                          alpha3Code: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            orderBy: {
              position: "asc",
            },
          },
          agendaItem: {
            select: {
              id: true,
              committee: {
                select: {
                  allowDelegationsToAddThemselvesToSpeakersList: true,
                },
              },
            },
          },
        },
      });
    },
    {
      params: t.Object({
        type: SpeakersListCategory,
        committeeId: t.String(),
        conferenceId: t.String(),
      }),
      detail: {
        description: "Get a single speakers list by type",
      },
    }
  );
