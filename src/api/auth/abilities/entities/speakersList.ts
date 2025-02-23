import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForSpeakersList = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can(["create", "delete"], "SpeakersList", {
      agendaItem: {
        committee: {
          conference: {
            members: { some: { user: { id: user.sub }, role: "ADMIN" } },
          },
        },
      },
    });

    can(["list", "read"], "SpeakersList", {
      agendaItem: {
        committee: {
          OR: [
            { conference: { members: { some: { user: { id: user.sub } } } } },
            { members: { some: { user: { id: user.sub } } } },
          ],
        },
      },
    });

    //TODO: Restrict field access for non admins further
    can("update", "SpeakersList", {
      agendaItem: {
        committee: {
          conference: {
            members: {
              some: {
                user: { id: user.sub },
                role: { in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR"] },
              },
            },
          },
        },
      },
    });
  }
};
