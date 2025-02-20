import { Elysia } from "elysia";
import { db } from "../../../prisma/db";
import { permissionsPlugin } from "../auth/permissions";

export const user = new Elysia().use(permissionsPlugin).get(
  "/conference/:conferenceId/user/:userId/delegation",
  async ({ params: { conferenceId, userId }, permissions }) => {
    permissions.mustBeLoggedIn(); // TODO
    return await db.delegation.findFirst({
      where: {
        conferenceId,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        nation: true,
      },
    });
  },
  {
    detail: {
      description: "Get the delegation of a user in this conference",
    },
  },
);
