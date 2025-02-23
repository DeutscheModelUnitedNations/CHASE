import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForAgendaItem = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can(["create", "delete", "update"], "AgendaItem", {
      committee: {
        conference: {
          members: { some: { user: { id: user.sub }, role: "ADMIN" } },
        },
      },
    });

    can(["list", "read"], "AgendaItem", {
      committee: {
        conference: {
          members: { some: { user: { id: user.sub } } },
        },
        members: {
          some: { user: { id: user.sub } },
        },
      },
    });

    can("update", "AgendaItem", ["isActive"], {
      committee: {
        conference: {
          members: {
            some: {
              user: { id: user.sub },
              role: {
                in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR"],
              },
            },
          },
        },
      },
    });
  }
};
