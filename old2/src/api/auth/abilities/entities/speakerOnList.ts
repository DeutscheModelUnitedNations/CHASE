import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForSpeakerOnList = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can(["create", "list", "read"], "SpeakerOnList", {
      speakersList: {
        agendaItem: {
          committee: {
            OR: [
              {
                conference: {
                  members: {
                    some: {
                      user: { id: user.id },
                      role: { in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR"] },
                    },
                  },
                },
              },
              {
                members: { some: { user: { id: user.id } } },
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
                      user: { id: user.id },
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
            user: { id: user.id },
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
                  user: { id: user.id },
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
