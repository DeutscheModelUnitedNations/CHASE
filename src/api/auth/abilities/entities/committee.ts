import type { AbilityBuilder } from "@casl/ability";
import type { AppAbility } from "../abilities";
import type { OidcResponse } from "../../oidc";

export const defineAbilitiesForCommittee = (
  oidc: OidcResponse,
  { can }: AbilityBuilder<AppAbility>,
) => {
  if (oidc.user) {
    const user = oidc.user;
    can(["create", "delete", "update"], "Committee", {
      conference: {
        members: { some: { user: { id: user.sub }, role: "ADMIN" } },
      },
    });

    can("list", "Committee", {
      conference: { members: { some: { user: { id: user.sub } } } },
    });

    can("read", "Committee", {
      OR: [
        { conference: { members: { some: { user: { id: user.sub } } } } },
        { members: { some: { user: { id: user.sub } } } },
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
              user: { id: user.sub },
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
