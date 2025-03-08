import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForDelegation = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can(["create", "update", "delete"], "Delegation", {
      conference: {
        members: { some: { user: { id: user.sub }, role: "ADMIN" } },
      },
    });

    can(["read", "list"], "Delegation", {
      conference: {
        members: {
          some: {
            user: { id: user.sub },
            role: { in: ["ADMIN", "PARTICIPANT_CARE"] },
          },
        },
      },
    });
  }
};
