import { Elysia, t } from "elysia";
import { permissionsPlugin } from "../auth/permissions";

export const time = new Elysia().use(permissionsPlugin).get(
  "/timestamp",
  async ({ permissions }) => {
    permissions.mustBeLoggedIn();
    return Date.now();
  },
  {
    response: t.Number(),
    detail: {
      description:
        "Get the timestamp of the current time in the backend. Can be used for sync with frontend system timers",
    },
  }
);
