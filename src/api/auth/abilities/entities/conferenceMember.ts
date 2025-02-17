import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForConferenceMembers = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    // biome-ignore lint/suspicious/noExplicitAny:
    can("manage" as any, "ConferenceMember", {
      conference: {
        members: { some: { user: { id: user.id }, role: "ADMIN" } },
      },
    });
  }
};
