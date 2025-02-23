import { t, Elysia } from "elysia";
import { db } from "../../../prisma/db";
import { ConferenceCreateToken } from "../../../prisma/generated/schema/ConferenceCreateToken";
import { User } from "../../../prisma/generated/schema/User";
import { permissionsPlugin } from "../auth/permissions";
import { oidcPlugin } from "../auth/oidc";
import {
  ConferencePlainInputCreate,
  ConferencePlainInputUpdate,
} from "@prisma/generated/schema/Conference";
// import { ConferenceRole } from "../../prisma/generated/schema/ConferenceRole";

export const conference = new Elysia()
  .use(oidcPlugin)
  .use(permissionsPlugin)
  .get(
    "/conference",
    ({ permissions }) =>
      db.conference.findMany({
        where: permissions.allowDatabaseAccessTo("list").Conference,
      }),
    {
      detail: {
        description: "Get all conferences",
      },
    },
  )
  .post(
    "/conference",
    ({ body, oidc, permissions }) =>
      db.$transaction(async (tx) => {
        permissions.checkIf((a) => a.can("create", "Conference"));

        await tx.conferenceCreateToken.delete({
          where: { token: body.token },
        });

        return tx.conference.create({
          data: {
            name: body.name,
            start: body.start,
            end: body.end,
            members: {
              create: {
                role: "ADMIN",
                user: {
                  connect: {
                    id: oidc?.user?.id,
                  },
                },
              },
            },
          },
        });
      }),
    {
      body: t.Composite([
        ConferencePlainInputCreate,
        t.Pick(ConferenceCreateToken, ["token"]),
      ]),
      detail: {
        description: "Create a new conference, consumes a token",
      },
    },
  )
  .get(
    "/conference/:conferenceId",
    ({ params, permissions }) =>
      db.conference.findUniqueOrThrow({
        where: {
          id: params.conferenceId,
          AND: [permissions.allowDatabaseAccessTo().Conference],
        },
      }),
    {
      detail: {
        description: "Get a single conference by id",
      },
    },
  )
  .patch(
    "/conference/:conferenceId",
    ({ params, permissions, body }) =>
      db.conference.update({
        where: {
          id: params.conferenceId,
          AND: [permissions.allowDatabaseAccessTo("update").Conference],
        },
        data: body,
      }),
    {
      body: ConferencePlainInputUpdate,
      detail: {
        description: "Update a conference by id",
      },
    },
  )
  .patch(
    "/conference/:conferenceId/addAdmin",
    ({ params, body, permissions }) =>
      db.conferenceMember.upsert({
        where: {
          userId_conferenceId: {
            conferenceId: params.conferenceId,
            userId: body.user.id,
          },
          AND: [
            permissions.allowDatabaseAccessTo("create").ConferenceMember,
            permissions.allowDatabaseAccessTo("update").ConferenceMember,
          ],
        },
        update: {
          role: "ADMIN",
        },
        create: {
          role: "ADMIN",
          user: {
            connect: {
              id: body.user.id,
            },
          },
          conference: {
            connect: {
              id: params.conferenceId,
            },
          },
        },
      }),
    {
      body: t.Object({
        user: t.Pick(User, ["id"]),
      }),
      detail: {
        description: "Add an admin to a conference",
      },
    },
  )
  .delete(
    "/conference/:conferenceId",
    ({ params, permissions }) =>
      db.conference.delete({
        where: {
          id: params.conferenceId,
          AND: [permissions.allowDatabaseAccessTo("delete").Conference],
        },
      }),
    {
      detail: {
        description: "Delete a conference by id",
      },
    },
  )
  .get(
    "/conference/:conferenceId/getOwnRole",
    async ({ oidc, permissions }) =>
      (
        await db.conferenceMember.findFirstOrThrow({
          where: {
            userId: oidc?.user?.id,
            AND: [permissions.allowDatabaseAccessTo("read").ConferenceMember],
          },
        })
      ).role,
    {
      detail: {
        description: "Check if you are an admin of a conference.",
      },
    },
  )
  // .post(
  //   "/conference/:conferenceId/populateMembers",
  //   async ({ body, params, permissions }) => {
  //     return Promise.all(
  //       body.map((userData) =>
  //         db.$transaction(async (tx) => {
  //           const email = await tx.email.findFirst({
  //             where: { email: userData.email },
  //             include: { user: true },
  //           });
  //           let user = email?.user;
  //           if (!email) {
  //             user = await tx.user.create({
  //               data: {
  //                 name: userData.name,
  //                 emails: {
  //                   create: {
  //                     email: userData.email,
  //                     validated: true,
  //                   },
  //                 },
  //               },
  //             });
  //           }

  //           return tx.conferenceMember.upsert({
  //             where: {
  //               userId_conferenceId: {
  //                 conferenceId: params.conferenceId,
  //                 // biome-ignore lint/style/noNonNullAssertion: <explanation>
  //                 userId: user!.id,
  //               },
  //               AND: [
  //                 permissions.allowDatabaseAccessTo("create").ConferenceMember,
  //               ],
  //             },
  //             create: {
  //               role: userData.role,
  //               user: {
  //                 connect: {
  //                   // biome-ignore lint/style/noNonNullAssertion: <explanation>
  //                   id: user!.id,
  //                 },
  //               },
  //               conference: {
  //                 connect: {
  //                   id: params.conferenceId,
  //                 },
  //               },
  //             },
  //             update: {
  //               role: userData.role,
  //             },
  //           });
  //         }),
  //       ),
  //     );
  //   },
  //   {
  //     body: t.Array(
  //       t.Object({
  //         name: t.Index(User, ["name"]),
  //         role: t.Index(ConferenceMember, ["role"]),
  //         email: t.Index(Email, ["email"]),
  //       }),
  //     ),
  //     detail: {
  //       description: "Add conference members based on input data.",
  //     },
  //   },
  // );
