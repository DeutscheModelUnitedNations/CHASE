import { Elysia, t } from "elysia";
import { permissionsPlugin } from "../auth/permissions";
import { oidcPlugin } from "../auth/oidc";

export const reportError = new Elysia()
  .use(oidcPlugin)
  .use(permissionsPlugin)
  .post(
    "/report-error",
    async ({ permissions, body, session }) => {
      permissions.getLoggedInUserOrThrow();
      console.error(`
==============
Incoming error report by ${session.data?.user?.name} (${
        session.data?.user?.email
      }) :
    message: ${body.message}
    source: ${body.source}
    lineno: ${body.lineno}
    colno: ${body.colno}
    error: ${JSON.stringify(body.error)}
==============
`);
    },
    {
      body: t.Object({
        message: t.Any(),
        source: t.Optional(t.String()),
        lineno: t.Optional(t.Number()),
        colno: t.Optional(t.Number()),
        error: t.Optional(t.Any()),
      }),
      detail: {},
    },
  );
