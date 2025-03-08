import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForMessages = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can("create", "Message", {
      committee: {
        OR: [
          {
            conference: {
              members: {
                some: {
                  user: { id: user.sub },
                  role: {
                    in: [
                      "ADMIN",
                      "CHAIR",
                      "COMMITTEE_ADVISOR",
                      "SECRETARIAT",
                      "NON_STATE_ACTOR",
                    ],
                  },
                },
              },
            },
          },
          {
            members: {
              some: {
                user: { id: user.sub },
              },
            },
          },
        ],
      },
    });

    can(["update", "list", "read"], "Message", {
      committee: {
        conference: {
          members: {
            some: {
              user: { id: user.sub },
              role: {
                in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR", "SECRETARIAT"],
              },
            },
          },
        },
      },
    });
  }
};
