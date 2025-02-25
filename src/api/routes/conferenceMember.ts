import { t, Elysia } from "elysia";
import { db } from "../../../prisma/db";
import {
  ConferenceMember,
  // ConferenceMemberPlain,
} from "../../../prisma/generated/schema/ConferenceMember";
import { permissionsPlugin } from "../auth/permissions";

const ConferenceMemberCreationBody = t.Object({
  data: t.Pick(ConferenceMember, ["role"]),
  count: t.Number({ default: 1, minimum: 1 }),
});

export const conferenceMember = new Elysia({
  prefix: "/conference/:conferenceId",
})
  .use(permissionsPlugin)
  .get(
    "/member",
    async ({ params: { conferenceId }, permissions }) => {
      return await db.conferenceMember.findMany({
        where: {
          conferenceId,
          AND: [permissions.allowDatabaseAccessTo("list").ConferenceMember],
        },
      });
    },
    {
      detail: {
        description: "Get all conference-members in this conference",
      },
    },
  )
  .post(
    "/member",
   async ({ params: { conferenceId }, body, permissions }) => {
      permissions.checkIf((user) => user.can("create", "ConferenceMember"));
      return await db.conferenceMember.createMany({
        data: new Array(body.count).fill({
          role: body.data.role,
          conferenceId,
        }),
      });
    },
    {
      body: ConferenceMemberCreationBody,
      detail: {
        description:
          "Create a new conference-member in this conference. Must provide a role and count (how many members of this role to create) in the body.",
      },
    },
  )
  .delete(
    "/member",
    async ({ params: { conferenceId }, permissions }) => {
      return await db.conferenceMember.deleteMany({
        where: {
          conferenceId,
          AND: [permissions.allowDatabaseAccessTo("delete").ConferenceMember],
        },
      });
    },
    {
      detail: {
        description: "Delete all conference-members in this conference",
      },
    },
  )
  .delete(
    "/member/:memberId",
   async ({ params: { memberId }, permissions }) => {
      return await db.conferenceMember.delete({
        where: {
          id: memberId,
          AND: [permissions.allowDatabaseAccessTo("delete").ConferenceMember],
        },
      });
    },
    {
      detail: {
        description: "Delete a specific conference-member in this conference",
      },
    },
  );
