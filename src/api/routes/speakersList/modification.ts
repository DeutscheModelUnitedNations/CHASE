import { t, Elysia } from "elysia";
import { db } from "../../../../prisma/db";
import { permissionsPlugin } from "../../auth/permissions";

function calculateTimeLeft(
  startTimestamp: Date | null | undefined,
  stopTimestamp: Date,
  speakingTime: number | null | undefined
): number {
  if (startTimestamp && speakingTime) {
    const timeElapsed =
      (stopTimestamp.getTime() - startTimestamp.getTime()) / 1000;
    return Math.floor(speakingTime - timeElapsed);
  }
  return 0;
}

export const speakersListModification = new Elysia({
  prefix: "/speakersList/:speakersListId",
})
  .use(permissionsPlugin)
  .post(
    "/setSpeakingTime",
    async ({ params: { speakersListId }, body, permissions }) => {
      const speakersList = await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          speakingTime: body.speakingTime,
        },
      });

      return speakersList;
    },
    {
      body: t.Object({
        speakingTime: t.Number(),
      }),
      detail: {
        description: "Set the time for a speakers list",
      },
    }
  )

  .post(
    "/close",
    async ({ params: { speakersListId }, permissions }) => {
      const speakersList = await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          isClosed: true,
        },
      });

      return speakersList;
    },
    {
      detail: {
        description: "Close a speakers list",
      },
    }
  )

  .post(
    "/open",
    async ({ params: { speakersListId }, permissions }) => {
      const speakersList = await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          isClosed: false,
        },
      });

      return speakersList;
    },
    {
      detail: {
        description: "Open a speakers list",
      },
    }
  )
  .post(
    "/startTimer",
    async ({ params: { speakersListId }, set, permissions }) => {
      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakersList],
        },
        include: {
          agendaItem: {
            select: {
              speakerLists: {
                select: {
                  id: true,
                  type: true,
                },
              },
            },
          },
        },
      });

      if (!speakersList) {
        set.status = "Not Found";
        throw new Error("Speakers List not found");
      }

      return await db.$transaction(async (tx) => {
        if (speakersList.type === "COMMENT_LIST") {
          await tx.speakersList.update({
            where: {
              id: speakersList.agendaItem.speakerLists.find(
                (sl) => sl.type === "SPEAKERS_LIST"
              )?.id,
            },
            data: {
              startTimestamp: null,
              timeLeft: speakersList.speakingTime,
            },
          });
        } else if (speakersList.type === "SPEAKERS_LIST") {
          await tx.speakersList.update({
            where: {
              id: speakersList.agendaItem.speakerLists.find(
                (sl) => sl.type === "COMMENT_LIST"
              )?.id,
            },
            data: {
              startTimestamp: null,
            },
          });
        }

        await tx.speakersList.update({
          where: {
            id: speakersListId,
          },
          data: {
            startTimestamp: new Date(Date.now()),
            timeLeft: speakersList?.timeLeft ?? speakersList?.speakingTime,
          },
        });
      });
    },
    {
      detail: {
        description: "Start the timer for a speakers list",
      },
    }
  )

  .post(
    "/stopTimer",
    async ({ params: { speakersListId }, permissions }) => {
      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
        },
      });

      return await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          timeLeft: calculateTimeLeft(
            speakersList?.startTimestamp,
            new Date(Date.now()),
            speakersList?.timeLeft
          ),
          startTimestamp: null,
        },
      });
    },
    {
      detail: {
        description: "Stop the timer for a speakers list",
      },
    }
  )

  .post(
    "/resetTimer",
    async ({ params: { speakersListId }, permissions }) => {
      const SpeakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
      });

      return await db.speakersList.update({
        where: {
          id: speakersListId,
        },
        data: {
          startTimestamp: SpeakersList?.startTimestamp
            ? new Date(Date.now())
            : null,
          timeLeft: SpeakersList?.speakingTime,
        },
      });
    },
    {
      detail: {
        description: "Reset the timer for a speakers list",
      },
    }
  )

  .post(
    "/increaseSpeakingTime",
    async ({ params: { speakersListId }, body, set, permissions }) => {
      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
        },
      });

      if (!speakersList?.timeLeft) {
        set.status = "Bad Request";
        throw new Error("No time set, increase not possible");
      }

      return await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          timeLeft: speakersList?.timeLeft + body.amount,
        },
      });
    },
    {
      body: t.Object({
        amount: t.Number(),
      }),
      detail: {
        description: "Increase the speaking time for a speakers list",
      },
    }
  )

  .post(
    "/decreaseSpeakingTime",
    async ({ params: { speakersListId }, body, set, permissions }) => {
      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
        },
      });

      if (!speakersList?.timeLeft) {
        set.status = "Bad Request";
        throw new Error("No time set, decrease not possible");
      }

      return await db.speakersList.update({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
        },
        data: {
          timeLeft: speakersList?.timeLeft - body.amount,
        },
      });
    },
    {
      body: t.Object({
        amount: t.Number(),
      }),
      detail: {
        description: "Decrease the speaking time for a speakers list",
      },
    }
  );
