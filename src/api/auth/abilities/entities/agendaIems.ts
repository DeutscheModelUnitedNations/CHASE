import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForAgendaItem = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can(["create", "delete", "update"], "AgendaItem", {
      committee: {
        conference: {
          members: { some: { user: { id: user.id }, role: "ADMIN" } },
        },
      },
    });

    can(["list", "read"], "AgendaItem", {
      committee: {
        conference: {
          members: { some: { user: { id: user.id } } },
        },
        members: {
          some: { user: { id: user.id } },
        },
      },
    });

    can("update", "AgendaItem", ["isActive"], {
      committee: {
        conference: {
          members: {
            some: {
              user: { id: user.id },
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
