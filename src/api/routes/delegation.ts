import { t, Elysia } from "elysia";
import { db } from "../../../prisma/db";
import { Nation } from "../../../prisma/generated/schema/Nation";
import { CommitteeMember } from "../../../prisma/generated/schema/CommitteeMember";
import { permissionsPlugin } from "../auth/permissions";

const DelegationBody = t.Pick(Nation, ["alpha3Code"]);

export const delegation = new Elysia({
  prefix: "/conference/:conferenceId",
})
  .use(permissionsPlugin)
  .get(
    "/delegation",
    ({ params: { conferenceId }, permissions }) => {
      return db.delegation.findMany({
        where: {
          conferenceId,
          AND: [permissions.allowDatabaseAccessTo("list").Delegation],
        },
        include: {
          nation: true,
          members: true,
        },
      });
    },
    {
      detail: {
        description: "Get all delegations in this conference",
      },
    },
  )
  .post(
    "/delegation",
    ({ body, params: { conferenceId }, permissions }) => {
      permissions.checkIf((user) => user.can("create", "Delegation"));
      return db.delegation.create({
        data: {
          conference: { connect: { id: conferenceId } },
          nation: { connect: { alpha3Code: body.alpha3Code } },
        },
      });
    },
    {
      body: DelegationBody,
      detail: {
        description: "Create a new delegation in this conference",
      },
    },
  )
  .get(
    "/delegation/:delegationId",
    ({ params: { delegationId }, permissions }) => {
      return db.delegation.findUnique({
        where: {
          id: delegationId,
          AND: [permissions.allowDatabaseAccessTo().Delegation],
        },
        include: {
          members: true,
        },
      });
    },
    {
      detail: {
        description: "Get a specific delegation in this conference",
      },
    },
  )
  .delete(
    "/delegation/:delegationId",
    ({ params: { delegationId }, permissions }) => {
      return db.$transaction([
        db.committeeMember.deleteMany({
          where: {
            id: delegationId,
            AND: [permissions.allowDatabaseAccessTo("delete").CommitteeMember],
          },
        }),
        db.delegation.delete({
          where: {
            id: delegationId,
            AND: [permissions.allowDatabaseAccessTo("delete").Delegation],
          },
        }),
      ]);
    },
    {
      detail: {
        description:
          "Delete a delegation and all its committee members in this conference",
      },
    },
  )
  .post(
    "/delegation/:delegationId/committee/:committeeId",
    async ({ params: { delegationId, committeeId }, permissions }) => {
      return db.$transaction(async (tx) => {
        const committeeMember = await tx.committeeMember.findFirst({
          where: {
            committeeId,
            delegationId,
          },
        });

        if (committeeMember) {
          return tx.committeeMember.delete({
            where: {
              id: committeeMember.id,
              AND: [
                permissions.allowDatabaseAccessTo("delete").CommitteeMember,
              ],
            },
          });
        }

        permissions.checkIf((user) => user.can("create", "CommitteeMember"));

        return await tx.committeeMember.create({
          data: {
            committeeId,
            delegationId,
          },
        });
      });
    },
    {
      detail: {
        description:
          "Connect a committee to a delegation in this conference. If the committee is already connected to the delegation, it will be disconnected.",
      },
    },
  )

  // Presence
  .post(
    "/delegation/:delegationId/presence/:memberId",
    ({ body, params: { delegationId, memberId }, permissions }) => {
      return db.delegation.update({
        where: {
          id: delegationId,
          AND: [permissions.allowDatabaseAccessTo("update").Delegation],
        },
        data: {
          members: {
            update: {
              where: {
                id: memberId,
              },
              data: {
                presence: body.presence,
              },
            },
          },
        },
      });
    },
    {
      body: t.Pick(CommitteeMember, ["presence"]),
      detail: {
        description: "Update a member's presence in a delegation",
      },
    },
  )

  .post(
    "/committee/:committeeId/presence/allAbsent",
    async ({ params: { committeeId }, permissions }) => {
      return await db.committeeMember.updateMany({
        where: {
          committeeId,
          AND: [permissions.allowDatabaseAccessTo("update").CommitteeMember],
        },
        data: {
          presence: "ABSENT",
        },
      });
    },
    {
      detail: {
        description:
          "Get all delegations in a committee with all members absent",
      },
    },
  )
  .post(
    "/committee/:committeeId/presence/allPresent",
    async ({ params: { committeeId }, permissions }) => {
      return await db.committeeMember.updateMany({
        where: {
          committeeId,
          AND: [permissions.allowDatabaseAccessTo("update").CommitteeMember],
        },
        data: {
          presence: "PRESENT",
        },
      });
    },
    {
      detail: {
        description:
          "Get all delegations in a committee with all members absent",
      },
    },
  );
