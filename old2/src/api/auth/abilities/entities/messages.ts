import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForMessages = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can("create", "Message", {
      committee: {
        OR: [
          {
            conference: {
              members: {
                some: {
                  user: { id: user.id },
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
                user: { id: user.id },
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
              user: { id: user.id },
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
