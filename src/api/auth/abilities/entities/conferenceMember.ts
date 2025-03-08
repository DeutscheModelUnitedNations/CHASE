import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForConferenceMembers = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    // biome-ignore lint/suspicious/noExplicitAny:
    can("manage" as any, "ConferenceMember", {
      conference: {
        members: { some: { user: { id: user.sub }, role: "ADMIN" } },
      },
    });
  }
};
