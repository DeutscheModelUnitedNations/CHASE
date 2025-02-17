import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForDelegation = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can(["create", "update", "delete"], "Delegation", {
      conference: {
        members: { some: { user: { id: user.id }, role: "ADMIN" } },
      },
    });

    can(["read", "list"], "Delegation", {
      conference: {
        members: {
          some: {
            user: { id: user.id },
            role: { in: ["ADMIN", "PARTICIPANT_CARE"] },
          },
        },
      },
    });
  }
};
