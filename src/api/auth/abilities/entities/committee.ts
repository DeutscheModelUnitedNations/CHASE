import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { Session } from "../../session";

export const defineAbilitiesForCommittee = (
  session: Session,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (session.data?.loggedIn && session.data.user) {
    const user = session.data.user;
    can(["create", "delete", "update"], "Committee", {
      conference: {
        members: { some: { user: { id: user.id }, role: "ADMIN" } },
      },
    });

    can("list", "Committee", {
      conference: { members: { some: { user: { id: user.id } } } },
    });

    can("read", "Committee", {
      OR: [
        { conference: { members: { some: { user: { id: user.id } } } } },
        { members: { some: { user: { id: user.id } } } },
      ],
    });

    can(
      "update",
      "Committee",
      [
        // only allow updating these fields
        "status",
        "statusHeadline",
        "statusUntil",
        "stateOfDebate",
        "whiteboardContent",
        "allowDelegationsToAddThemselvesToSpeakersList",
      ],
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
                  "MISCELLANEOUS_TEAM",
                  "SECRETARIAT",
                  "PARTICIPANT_CARE",
                ],
              },
            },
          },
        },
      },
    );
  }
};
