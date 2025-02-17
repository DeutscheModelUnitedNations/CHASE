import Elysia from "elysia";
import { sessionPlugin } from "./session";
import { type Action, defineAbilitiesForSession } from "./abilities/abilities";
import { accessibleBy } from "./abilities/casl-prisma";
import type { ExtractPluginParamType } from "../helpers/pluginParamExtractor";

export const permissionsPlugin = new Elysia({
  name: "permissions",
})
  .use(sessionPlugin)
  .derive({ as: "scoped" }, ({ session, error }) => {
    if (!session) throw new Error("Invalid state: session not found.");
    const abilities = defineAbilitiesForSession(session);
    return {
      permissions: {
        abilities,
        /**
         * Prisma utility for running authorized database calls. Should be used in WHERE conditions in queries like this:
         *
         * ```ts
         * db.committee.deleteMany({
         *   where: {
         *     conferenceId: params.conferenceId,
         *     AND: [permissions.allowDatabaseAccessTo("delete").Committee],
         *   }
         * })
         * ```
         * The default operation is "read".
         */
        allowDatabaseAccessTo: (action: Action = "read") =>
          accessibleBy(abilities, action),
        /**
         * Utility that raises and error if the permissions check fails.
         * Allows for readable flow of permission checks which resemble natural language like this:
         *
         * ```ts
         * permissions.checkIf((user) => user.can("create", "Committee"));
         * ```
         */
        checkIf: (perms: boolean | ((a: typeof abilities) => boolean)) => {
          if (typeof perms === "boolean") {
            if (!perms) {
              throw error("Unauthorized", "Permission check failed.");
            }
          } else {
            if (!perms(abilities)) {
              throw error("Unauthorized", "Permission check failed.");
            }
          }
        },
        mustBeLoggedIn: () => {
          if (!session.data?.loggedIn) {
            throw error("Unauthorized", "You are not logged in.");
          }
        },
      },
    };
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _typeDummy = new Elysia().use(permissionsPlugin);

export type PermissionsType = ExtractPluginParamType<
  typeof _typeDummy
>["permissions"];
