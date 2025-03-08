import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForConference = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    // can("create", "Conference"); // also requires creation token
    can(["list", "read"], "Conference", {
      OR: [
        { members: { some: { user: { id: user.sub } } } },
        {
          committees: {
            some: { members: { some: { user: { id: user.sub } } } },
          },
        },
      ],
    });
    can(["update", "delete"], "Conference", {
      members: { some: { user: { id: user.sub }, role: "ADMIN" } },
    });
  }
};
