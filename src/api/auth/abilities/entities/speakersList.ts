import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForSpeakersList = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can(["create", "delete"], "SpeakersList", {
      agendaItem: {
        committee: {
          conference: {
            members: { some: { user: { id: user.id }, role: "ADMIN" } },
          },
        },
      },
    });

    can(["list", "read"], "SpeakersList", {
      agendaItem: {
        committee: {
          OR: [
            { conference: { members: { some: { user: { id: user.id } } } } },
            { members: { some: { user: { id: user.id } } } },
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
                user: { id: user.id },
                role: { in: ["ADMIN", "CHAIR", "COMMITTEE_ADVISOR"] },
              },
            },
          },
        },
      },
    });
  }
};
