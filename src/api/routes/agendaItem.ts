import { t, Elysia } from "elysia";
import { db } from "../../../prisma/db";
import { SpeakersListCategory } from "../../../prisma/generated/schema/SpeakersListCategory";
import { permissionsPlugin } from "../auth/permissions";
import {
  AgendaItemInputCreate,
  AgendaItemPlainInputUpdate,
} from "@prisma/generated/schema/AgendaItem";

export const agendaItem = new Elysia({
  prefix: "/conference/:conferenceId/committee/:committeeId",
})
  .use(permissionsPlugin)
  .get(
    "/agendaItem",
    async ({ params, permissions }) => {
      return await db.agendaItem.findMany({
        where: {
          committee: {
            id: params.committeeId,
            conferenceId: params.conferenceId,
          },
          AND: [permissions.allowDatabaseAccessTo("list").AgendaItem],
        },
      });
    },
    {
      detail: {
        description: "Get all agenda items in this committee",
      },
    },
  )
  .post(
    "/agendaItem",
    async ({ body, params: { conferenceId, committeeId }, permissions }) => {
      //TODO is this used? @TadeSF
      // const committeeHasActiveAgendaItem = !!(await db.agendaItem.findFirst({
      //   where: {
      //     committeeId,
      //     isActive: true,
      //   },
      // }));
      permissions.checkIf((user) => user.can("create", "AgendaItem"));

      const agendaItem = await db.agendaItem.create({
        data: {
          committee: {
            connect: {
              id: committeeId,
              conferenceId,
            },
          },
          title: body.title,
          description: body.description,
        },
      });
      await db.speakersList.createMany({
        data: [
          {
            type: SpeakersListCategory.SPEAKERS_LIST,
            agendaItemId: agendaItem.id,
            speakingTime: 180,
          },
          {
            type: SpeakersListCategory.COMMENT_LIST,
            agendaItemId: agendaItem.id,
            speakingTime: 30,
          },
        ],
      });
      return agendaItem;
    },
    {
      body: t.Pick(AgendaItemInputCreate, ["title", "description"]),
      detail: {
        description: "Create a new agenda item in this committee",
      },
    },
  )
  .get(
    "/agendaItem/active",
    async ({ params: { committeeId }, permissions }) => {
      const r = await db.agendaItem.findFirstOrThrow({
        where: {
          committeeId,
          isActive: true,
          AND: [permissions.allowDatabaseAccessTo("list").AgendaItem],
        },
        include: {
          speakerLists: true,
        },
      });

      return r;
    },
    {
      detail: {
        description: "Get all active agenda items in this committee",
      },
    },
  )
  .get(
    "/agendaItem/active/:type",
    async ({ params: { conferenceId, committeeId, type }, permissions }) => {
      const r = await db.agendaItem.findFirstOrThrow({
        where: {
          committee: {
            id: committeeId,
            conferenceId,
          },
          isActive: true,
          AND: [permissions.allowDatabaseAccessTo("list").AgendaItem],
        },
        include: {
          speakerLists: {
            where: {
              type: type as $Enums.SpeakersListCategory,
            },
          },
        },
      });

      return r;
    },
    {
      detail: {
        description: "Get all active agenda items in this committee",
      },
    },
  )
  .get(
    "/agendaItem/:agendaItemId",
    async ({
      params: { conferenceId, committeeId, agendaItemId },
      permissions,
    }) => {
      return await db.agendaItem
        .findUniqueOrThrow({
          where: {
            id: agendaItemId,
            committee: { id: committeeId, conferenceId },
            AND: [permissions.allowDatabaseAccessTo().AgendaItem],
          },
        })
        .then((a) => ({ ...a, description: a.description || undefined }));
    },
    {
      detail: {
        description: "Get a single agenda item by id",
      },
    },
  )
  .post(
    "/agendaItem/:agendaItemId/activate",
    async ({
      params: { conferenceId, committeeId, agendaItemId },
      permissions,
    }) => {
      return await db.$transaction([
        db.agendaItem.update({
          where: {
            id: agendaItemId,
            committee: { id: committeeId, conferenceId },
            AND: [permissions.allowDatabaseAccessTo("update").AgendaItem],
          },
          data: {
            isActive: true,
          },
        }),
        db.agendaItem.updateMany({
          where: {
            committeeId,
            id: { not: agendaItemId },
          },
          data: {
            isActive: false,
          },
        }),
      ]);
    },
    {
      detail: {
        description: "Activate an agenda item by id",
      },
    },
  )
  .delete(
    "/agendaItem/:agendaItemId",
    async ({
      params: { conferenceId, committeeId, agendaItemId },
      permissions,
    }) => {
      return await db.agendaItem.delete({
        where: {
          id: agendaItemId,
          committee: { id: committeeId, conferenceId },
          AND: [permissions.allowDatabaseAccessTo("delete").AgendaItem],
        },
      });
    },
    {
      detail: {
        description: "Delete an agenda item by id",
      },
    },
  )
  .patch(
    "/agendaItem/:agendaItemId",
    async ({
      params: { conferenceId, committeeId, agendaItemId },
      body,
      permissions,
    }) => {
      return db.agendaItem.update({
        where: {
          id: agendaItemId,
          committee: { id: committeeId, conferenceId },
          AND: [permissions.allowDatabaseAccessTo("update").AgendaItem],
        },
        data: {
          isActive: body.isActive,
          title: body.title,
          description: body.description,
        },
      });
    },
    {
      body: AgendaItemPlainInputUpdate,
      detail: {
        description: "Update an agenda item by id",
      },
    },
  );
