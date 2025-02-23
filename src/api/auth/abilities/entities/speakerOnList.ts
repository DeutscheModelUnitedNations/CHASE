import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForSpeakerOnList = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can(["create", "list", "read"], "SpeakerOnList", {
      speakersList: {
        agendaItem: {
          committee: {
            OR: [
              {
                conference: {
                  members: {
                    some: {
                      user: { id: user.sub },
                      role: { in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR"] },
                    },
                  },
                },
              },
              {
                members: { some: { user: { id: user.sub } } },
              },
            ],
          },
        },
      },
    });

    can("delete", "SpeakerOnList", {
      OR: [
        {
          speakersList: {
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
          },
        },
        {
          committeeMember: {
            user: { id: user.sub },
          },
        },
      ],
    });

    can("update", "SpeakerOnList", {
      speakersList: {
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
      },
    });
  }
};
