import { Elysia } from "elysia";
import { db } from "../../../../prisma/db";
import {
  type PermissionsType,
  permissionsPlugin,
} from "../../auth/permissions";
import { Presence } from "@prisma/client";

async function calculatePosition(
  speakersListId: string,
  permissions: PermissionsType,
) {
  const maxPosition = await db.speakerOnList.aggregate({
    _max: {
      position: true,
    },
    where: {
      speakersListId,
      AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
    },
  });

  const newPosition = (maxPosition._max.position ?? 0) + 1;

  return newPosition;
}

async function createSpeakerOnList(
  speakersListId: string,
  committeeMemberId: string,
  permissions: PermissionsType,
) {
  permissions.checkIf((a) => a.can("create", "SpeakerOnList"));
  return await db.speakerOnList.create({
    data: {
      speakersListId,
      committeeMemberId,
      position: await calculatePosition(speakersListId, permissions),
    },
  });
}

export const speakersListSpeakers = new Elysia({
  prefix: "/speakersList/:speakersListId",
})
  .use(permissionsPlugin)
  .get(
    "",
    async ({ params: { speakersListId }, permissions }) => {
      return await db.speakersList.findUnique({
        where: {
          id: speakersListId,
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
      detail: {
        description: "Get all speakers on the speakers list",
      },
    },
  )

  .post(
    "/addSpeaker/committeeMember/:committeeMemberId",
    async ({ params: { speakersListId, committeeMemberId }, permissions }) => {
      return await createSpeakerOnList(
        speakersListId,
        committeeMemberId,
        permissions,
      );
    },
    {
      detail: {
        description:
          "Add a speaker to the speakers list by chairs via committeeMemberId",
      },
    },
  )

  .post(
    "/addSpeaker/user/:userId",
    async ({ params: { speakersListId, userId }, set, permissions }) => {
      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakersList],
        },
        include: {
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
          speakers: {
            select: {
              committeeMember: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      const committeeMember = await db.committeeMember.findFirst({
        where: {
          userId,
          AND: [permissions.allowDatabaseAccessTo("read").CommitteeMember],
        },
      });

      if (!committeeMember) {
        set.status = "Not Found";
        throw new Error("User not found");
      }

      if (!speakersList) {
        set.status = "Not Found";
        throw new Error("Speakers list not found");
      }

      if (
        !speakersList.agendaItem.committee
          .allowDelegationsToAddThemselvesToSpeakersList
      ) {
        set.status = "Forbidden";
        throw new Error(
          "Speakers list does not allow speakers to add themselves",
        );
      }

      if (speakersList.isClosed) {
        set.status = "Forbidden";
        throw new Error("Speakers list is closed");
      }

      if (committeeMember.presence !== Presence.PRESENT) {
        set.status = "Forbidden";
        throw new Error("CommitteeMember is not present in this committee");
      }

      if (
        speakersList.speakers.some(
          (speaker) => speaker.committeeMember.id === committeeMember.id,
        )
      ) {
        set.status = "Conflict";
        throw new Error("Speaker is already on the list");
      }

      return await createSpeakerOnList(
        speakersListId,
        committeeMember.id,
        permissions,
      ).catch((e) => {
        if (e.code === "P2002") {
          set.status = "Conflict";
          throw new Error("Speaker is already on the list");
        }
        set.status = "Internal Server Error";
        throw new Error("Error adding speaker");
      });
    },
    {
      detail: {
        description: "Add a speaker to the speakers list",
      },
    },
  )

  .post(
    "/addSpeaker/code/:countryCode",
    async ({ params: { speakersListId, countryCode }, set, permissions }) => {
      const committeeMember = await db.committeeMember.findFirst({
        where: {
          delegation: {
            nation: {
              alpha3Code: countryCode,
            },
          },
          AND: [permissions.allowDatabaseAccessTo("read").CommitteeMember],
        },
      });

      if (!committeeMember) {
        set.status = "Not Found";
        throw new Error("Committee member not found");
      }

      return await createSpeakerOnList(
        speakersListId,
        committeeMember.id,
        permissions,
      );
    },
    {
      detail: {
        description:
          "Add a speaker to the speakers list for chairs via countryCode",
      },
    },
  )

  .delete(
    "/removeSpeaker/:speakerId",
    async ({ params: { speakerId }, permissions }) => {
      return await db.speakerOnList.delete({
        where: {
          id: speakerId,
          AND: [permissions.allowDatabaseAccessTo("delete").SpeakerOnList],
        },
      });
    },
    {
      detail: {
        description: "Remove a speaker from the speakers list",
      },
    },
  )

  .delete(
    "/removeSpeaker/user/:userId",
    async ({ params: { speakersListId, userId }, set, permissions }) => {
      const committeeMember = await db.committeeMember.findFirst({
        where: {
          userId,
          AND: [permissions.allowDatabaseAccessTo("read").CommitteeMember],
        },
      });

      if (!committeeMember) {
        set.status = "Not Found";
        throw new Error("Committee member not found");
      }

      return await db.speakerOnList.deleteMany({
        where: {
          speakersListId,
          committeeMemberId: committeeMember.id,
          AND: [permissions.allowDatabaseAccessTo("delete").SpeakerOnList],
        },
      });
    },
    {
      detail: {
        description: "Remove a speaker from the speakers list",
      },
    },
  )

  .delete(
    "/clearList",
    async ({ params: { speakersListId }, permissions }) => {
      return await db.speakerOnList.deleteMany({
        where: {
          speakersListId,
          AND: [permissions.allowDatabaseAccessTo("delete").SpeakerOnList],
        },
      });
    },
    {
      detail: {
        description: "Clear the speakers list",
      },
    },
  )

  .post(
    "/moveSpeaker/:speakerId/up",
    async ({ params: { speakersListId, speakerId }, set, permissions }) => {
      const speaker = await db.speakerOnList.findUnique({
        where: {
          id: speakerId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (!speaker) {
        set.status = "Not Found";
        throw new Error("Speaker not found");
      }

      const previousSpeaker = await db.speakerOnList.findFirst({
        where: {
          speakersListId,
          position: speaker.position - 1,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (!previousSpeaker) {
        return speaker;
      }

      return await db.$transaction([
        db.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: -1,
          },
        }),
        db.speakerOnList.update({
          where: {
            id: previousSpeaker.id,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: speaker.position,
          },
        }),
        db.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: previousSpeaker.position,
          },
        }),
      ]);
    },
    {
      detail: {
        description: "Move a speaker up in the list",
      },
    },
  )

  .post(
    "/moveSpeaker/:speakerId/down",
    async ({ params: { speakersListId, speakerId }, set, permissions }) => {
      const speaker = await db.speakerOnList.findUnique({
        where: {
          id: speakerId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (!speaker) {
        set.status = "Not Found";
        throw new Error("Speaker not found");
      }

      const nextSpeaker = await db.speakerOnList.findFirst({
        where: {
          speakersListId,
          position: speaker.position + 1,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (!nextSpeaker) {
        return speaker;
      }

      return await db.$transaction([
        db.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: -1,
          },
        }),
        db.speakerOnList.update({
          where: {
            id: nextSpeaker.id,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: speaker.position,
          },
        }),
        db.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: nextSpeaker.position,
          },
        }),
      ]);
    },
    {
      detail: {
        description: "Move a speaker down in the list",
      },
    },
  )

  .post(
    "/moveSpeaker/:speakerId/toTheTop",
    async ({ params: { speakersListId, speakerId }, set, permissions }) => {
      const speaker = await db.speakerOnList.findUnique({
        where: {
          id: speakerId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (!speaker) {
        set.status = "Not Found";
        throw new Error("Speaker not found");
      }

      const speakerOriginalPosition = speaker.position;

      // Make sure the speaker is not already the first
      const minPosition = await db.speakerOnList.aggregate({
        _min: {
          position: true,
        },
        where: {
          speakersListId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
      });

      if (minPosition._min.position === speaker.position) {
        set.status = "Locked";
        throw new Error("Speaker is already at the top of the list");
      }

      const allSpeakers = await db.speakerOnList.findMany({
        where: {
          speakersListId,
          position: {
            gte: minPosition._min.position ?? 1,
            lt: speakerOriginalPosition,
          },
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
        orderBy: {
          position: "desc",
        },
      });

      return await db.$transaction(async (tx) => {
        await tx.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: -1,
          },
        });

        for (const s of allSpeakers) {
          await tx.speakerOnList.update({
            where: {
              id: s.id,
              AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
            },
            data: {
              position: s.position + 1,
            },
          });
        }
        await tx.speakerOnList.update({
          where: {
            id: speakerId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakerOnList],
          },
          data: {
            position: minPosition._min.position ?? 1,
          },
        });
      });
    },
    {
      detail: {
        description: "Move a speaker to the top of the list",
      },
    },
  )

  .post(
    "/nextSpeaker",
    async ({ params: { speakersListId }, set, permissions }) => {
      const currentSpeaker = await db.speakerOnList.findFirst({
        where: {
          speakersListId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakerOnList],
        },
        orderBy: {
          position: "asc",
        },
      });

      if (!currentSpeaker) {
        set.status = "Not Found";
        throw new Error("No next speaker found");
      }

      const speakersList = await db.speakersList.findUnique({
        where: {
          id: speakersListId,
          AND: [permissions.allowDatabaseAccessTo("read").SpeakersList],
        },
        include: {
          agendaItem: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!speakersList) {
        set.status = "Not Found";
        throw new Error("Speakers list not found");
      }

      const transaction = [
        db.speakerOnList.delete({
          where: {
            id: currentSpeaker.id,
            AND: [permissions.allowDatabaseAccessTo("delete").SpeakerOnList],
          },
        }),
        db.speakersList.update({
          where: {
            id: speakersListId,
            AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
          },
          data: {
            startTimestamp: null,
            timeLeft: speakersList.speakingTime,
          },
        }),
      ];

      if (speakersList.type === "SPEAKERS_LIST") {
        const correspondingCommentList = await db.speakersList.findFirst({
          where: {
            agendaItemId: speakersList.agendaItem.id,
            type: "COMMENT_LIST",
            AND: [permissions.allowDatabaseAccessTo("read").SpeakersList],
          },
        });

        if (!correspondingCommentList) {
          set.status = "Not Found";
          throw new Error("Corresponding comment list not found");
        }
        return await db.$transaction([
          db.speakerOnList.deleteMany({
            where: {
              speakersListId: correspondingCommentList.id,
              AND: [permissions.allowDatabaseAccessTo("delete").SpeakerOnList],
            },
          }),
          db.speakersList.update({
            where: {
              id: correspondingCommentList.id,
              AND: [permissions.allowDatabaseAccessTo("update").SpeakersList],
            },
            data: {
              startTimestamp: null,
              timeLeft: correspondingCommentList.speakingTime,
            },
          }),
          ...transaction,
        ]);
      }

      return await db.$transaction(transaction);
    },
    {
      detail: {
        description:
          "Remove the current speaker from a speakersList, making the next speaker the current speaker. Also resetting the timer and commentList",
      },
    },
  );
