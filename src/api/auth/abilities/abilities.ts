import { type PureAbility, AbilityBuilder } from "@casl/ability";
import { defineAbilitiesForConference } from "./entities/conference";
import { defineAbilitiesForCommittee } from "./entities/committee";
import { defineAbilitiesForAgendaItem } from "./entities/agendaIems";
import { defineAbilitiesForConferenceMembers } from "./entities/conferenceMember";
import { defineAbilitiesForDelegation } from "./entities/delegation";
import { defineAbilitiesForMessages } from "./entities/messages";
import { defineAbilitiesForSpeakersList } from "./entities/speakersList";
import { defineAbilitiesForSpeakerOnList } from "./entities/speakerOnList";
import type { db } from "@prisma/db";
import type { OidcResponse } from "../oidc";
import { createPrismaAbility, type PrismaQuery } from "@casl/prisma";

const actions = ["list", "create", "read", "update", "delete"] as const;

/**
 * Actions which can be run on entities in the system:
 *
 * - `list`: List all entities of a type
 * - `read`: Read a single entity
 * - `create`: Create a new entity
 * - `update`: Update an entity
 * - `status-update`: Update the status of an entity (non critical data, such as state of debate for committees)
 * - `delete`: Delete an entity
 */
export type Action = (typeof actions)[number];

type WithTypename<T extends object, TName extends string> = T & {
  __typename: TName;
};
type TaggedSubjects<T extends Record<string, Record<string, unknown>>> =
  | keyof T
  | { [K in keyof T]: WithTypename<T[K], K & string> }[keyof T];

type OmitDollarPrefixed<T> = T extends `$${string}` ? never : T;
type OmitSymbol<T> = T extends symbol ? never : T;
export type AllEntityNames = OmitSymbol<OmitDollarPrefixed<keyof typeof db>>;

export type AppAbility = PureAbility<
  [
    Action,
    TaggedSubjects<{
      [K in AllEntityNames as Capitalize<K>]: Awaited<
        ReturnType<(typeof db)[K]["findUniqueOrThrow"]>
      >;
    }>,
  ],
  PrismaQuery
>;

export const defineAbilitiesForSession = (oidcResponse: OidcResponse) => {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (oidcResponse.user) {
    console.info("Logged in user granted: ", oidcResponse.user.preferred_username);
    builder.can("manage" as any, "all" as any);
  }

  // if (oidcResponse.user?.hasRole("admin")) {
  //   console.info("Admin granted: ", oidcResponse.user.preferred_username);
  //   builder.can("manage" as any, "all" as any);
  // }

  defineAbilitiesForConference(oidcResponse, builder);
  defineAbilitiesForCommittee(oidcResponse, builder);
  defineAbilitiesForAgendaItem(oidcResponse, builder);
  defineAbilitiesForConferenceMembers(oidcResponse, builder);
  defineAbilitiesForDelegation(oidcResponse, builder);
  defineAbilitiesForMessages(oidcResponse, builder);
  defineAbilitiesForSpeakersList(oidcResponse, builder);
  defineAbilitiesForSpeakerOnList(oidcResponse, builder);

  return builder.build({
    detectSubjectType: (object) => object.__typename,
  });
};
