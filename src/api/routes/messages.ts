import { t, Elysia } from "elysia";
import { db } from "../../../prisma/db";
import { MessageInputCreate } from "@prisma/generated/schema/Message";
import { $Enums } from "../../../prisma/generated/client";
import { MessageStatus } from "../../../prisma/generated/schema/MessageStatus";
import { permissionsPlugin } from "../auth/permissions";

export const messages = new Elysia()
  .use(permissionsPlugin)
  .get(
    "/conference/:conferenceId/messages/researchService",
    async ({ params: { conferenceId }, permissions }) => {
      return await db.message.findMany({
        where: {
          committee: {
            conferenceId,
          },
          forwarded: true,
          NOT: {
            status: {
              has: $Enums.MessageStatus.ARCHIVED,
            },
          },
          AND: [permissions.allowDatabaseAccessTo("list").Message],
        },
        include: {
          author: {
            select: {
              id: true,
              email: true,
              family_name: true,
              given_name: true,
            },
          },
        },
        orderBy: {
          timestamp: "asc",
        },
      });
    },
    {
      detail: {
        description: "Get all research service messages in this conference",
      },
    },
  )

  .get(
    "/conference/:conferenceId/committee/:committeeId/messages",
    async ({ params: { committeeId }, permissions }) => {
      return await db.message.findMany({
        where: {
          committeeId,
          forwarded: false,
          NOT: {
            status: {
              has: $Enums.MessageStatus.ARCHIVED,
            },
          },
          AND: [permissions.allowDatabaseAccessTo("list").Message],
        },
        include: {
          author: {
            select: {
              id: true,
              email: true,
              family_name: true,
              given_name: true,
            },
          },
        },
        orderBy: {
          timestamp: "asc",
        },
      });
    },
    {
      detail: {
        description: "Get all messages for the chair in this committee",
      },
    },
  )

  .post(
    "/conference/:conferenceId/committee/:committeeId/messages",
    async ({ body, params: { committeeId }, permissions }) => {
      permissions.checkIf((user) => user.can("create", "Message"));
      return await db.message.create({
        data: {
          committee: { connect: { id: committeeId } },
          subject: body.subject,
          message: body.message,
          author: body.author,
          timestamp: new Date(Date.now()),
          metaEmail: body.metaEmail,
          metaDelegation: body.metaDelegation,
          metaCommittee: body.metaCommittee,
          metaAgendaItem: body.metaAgendaItem,
          category: body.category,
        },
      });
    },
    {
      body: t.Pick(MessageInputCreate, [
        "subject",
        "message",
        "author",
        "metaEmail",
        "metaDelegation",
        "metaCommittee",
        "metaAgendaItem",
        "category",
      ]),
      detail: {
        description: "Create a new message",
      },
    },
  )

  .get(
    "/conference/:conferenceId/messages/count",
    async ({ params: { conferenceId }, permissions }) => {
      return await db.message.count({
        where: {
          committee: {
            conferenceId,
          },
          forwarded: true,
          status: {
            has: $Enums.MessageStatus.UNREAD,
          },
          AND: [permissions.allowDatabaseAccessTo("list").Message],
        },
      });
    },
    {
      detail: {
        description:
          "Get the number of unread messages to the research service in this conference",
      },
    },
  )

  .get(
    "/conference/:conferenceId/committee/:committeeId/messages/count",
    async ({ params: { committeeId }, permissions }) => {
      return await db.message.count({
        where: {
          committeeId,
          forwarded: false,
          status: {
            has: $Enums.MessageStatus.UNREAD,
          },
          AND: [permissions.allowDatabaseAccessTo("list").Message],
        },
      });
    },
    {
      detail: {
        description:
          "Get the number of unread messages for the chair in this committee",
      },
    },
  )

  .post(
    "/message/:messageId/setStatus",
    async ({ body, params, permissions }) => {
      return await db.message.update({
        where: {
          id: params.messageId,
          AND: [permissions.allowDatabaseAccessTo("update").Message],
        },
        data: {
          status: {
            push: body.status,
          },
        },
      });
    },
    {
      body: t.Object({ status: MessageStatus }),
      detail: {
        description: "Set a Status for a message from the MessageStatus enum",
      },
    },
  )

  .post(
    "/message/:messageId/removeStatus",
    async ({ body, params: { messageId }, set, permissions }) => {
      const message = await db.message.findUnique({
        where: { id: messageId },
      });

      if (!message) {
        set.status = "Not Found";
        throw new Error("Message not found");
      }

      if (!body?.status) {
        set.status = "Bad Request";
        throw new Error("Status is required");
      }

      if (!message.status.includes(body.status as $Enums.MessageStatus)) {
        set.status = "Bad Request";
        throw new Error("Message does not have this status");
      }

      const updatedArray: $Enums.MessageStatus[] = message.status.filter(
        (status) => status !== body.status,
      );

      return await db.message.update({
        where: {
          id: messageId,
          AND: [permissions.allowDatabaseAccessTo("update").Message],
        },
        data: {
          status: updatedArray,
        },
      });
    },
    {
      body: t.Object({ status: t.String() }),
      detail: {
        description: "Set a Status for a message from the MessageStatus enum",
      },
    },
  )

  .post(
    "/message/:messageId/forwardToResearchService",
    async ({ params: { messageId }, permissions }) => {
      return await db.message.update({
        where: {
          id: messageId,
          AND: [permissions.allowDatabaseAccessTo("update").Message],
        },
        data: {
          forwarded: true,
        },
      });
    },
    {
      detail: {
        description: "Forward a message to the research service",
      },
    },
  );
