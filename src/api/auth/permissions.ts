import Elysia from "elysia";
import { type Action, defineAbilitiesForSession } from "./abilities/abilities";
import type { ExtractPluginParamType } from "../services/pluginParamExtractor";
import { oidcPlugin } from "./oidc";
import { accessibleBy } from "@casl/prisma";

export const permissionsPlugin = new Elysia({
  name: "permissions",
})
  .use(oidcPlugin)
  .resolve(({ oidc, error }) => {
    const abilities = defineAbilitiesForSession(oidc);
    let hasBeenCalled = false;
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
        allowDatabaseAccessTo: (action: Action = "read") => {
          hasBeenCalled = true;
          return accessibleBy(abilities, action);
        },
        /**
         * Utility that raises and error if the permissions check fails.
         * Allows for readable flow of permission checks which resemble natural language like this:
         *
         * ```ts
         * permissions.checkIf((user) => user.can("create", "Committee"));
         * ```
         */
        checkIf: (perms: boolean | ((a: typeof abilities) => boolean)) => {
          hasBeenCalled = true;
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
        getLoggedInUserOrThrow: () => {
          hasBeenCalled = true;
          if (!oidc || !oidc.user) {
            throw error("Unauthorized", "Permission check failed.");
          }
          return oidc.user;
        },
        werePermissionsChecked: () => hasBeenCalled,
        /**
         * Disable the warning that is emitted when permissions are not checked for this handler
         */
        disablePermissionCheckWarning: () => {
          hasBeenCalled = true;
        },
      },
    };
  })
  .as("plugin");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _typeDummy = new Elysia().use(permissionsPlugin);

export type PermissionsType = ExtractPluginParamType<
  typeof _typeDummy
>["permissions"];
