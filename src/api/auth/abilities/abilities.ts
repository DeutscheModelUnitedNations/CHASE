import { type PureAbility, AbilityBuilder } from "@casl/ability";
import { createPrismaAbility, type PrismaQuery } from "./casl-prisma";
import type { Session } from "../session";
import type { db } from "../../../../prisma/db";
import { defineAbilitiesForConference } from "./entities/conference";
import { defineAbilitiesForCommittee } from "./entities/committee";
import { defineAbilitiesForAgendaItem } from "./entities/agendaIems";
import { appConfiguration } from "../../util/config";
import { defineAbilitiesForConferenceMembers } from "./entities/conferenceMember";
import { defineAbilitiesForDelegation } from "./entities/delegation";
import { defineAbilitiesForMessages } from "./entities/messages";
import { defineAbilitiesForSpeakersList } from "./entities/speakersList";
import { defineAbilitiesForSpeakerOnList } from "./entities/speakerOnList";

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

export type AppAbility = PureAbility<
  [
    Action,
    TaggedSubjects<{
      AgendaItem: Awaited<
        ReturnType<(typeof db.agendaItem)["findUniqueOrThrow"]>
      >;
      Conference: Awaited<
        ReturnType<(typeof db.conference)["findUniqueOrThrow"]>
      >;
      ConferenceMember: Awaited<
        ReturnType<(typeof db.conferenceMember)["findUniqueOrThrow"]>
      >;
      Committee: Awaited<
        ReturnType<(typeof db.committee)["findUniqueOrThrow"]>
      >;
      CommitteeMember: Awaited<
        ReturnType<(typeof db.committeeMember)["findUniqueOrThrow"]>
      >;
      Delegation: Awaited<
        ReturnType<(typeof db.delegation)["findUniqueOrThrow"]>
      >;
      Message: Awaited<ReturnType<(typeof db.message)["findUniqueOrThrow"]>>;
      SpeakerOnList: Awaited<
        ReturnType<(typeof db.speakerOnList)["findUniqueOrThrow"]>
      >;
      SpeakersList: Awaited<
        ReturnType<(typeof db.speakersList)["findUniqueOrThrow"]>
      >;
    }>
  ],
  PrismaQuery
>;

export const defineAbilitiesForSession = (session: Session) => {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (appConfiguration.development && session.data?.user) {
    console.info("Development mode: granting all permissions");
    // biome-ignore lint/suspicious/noExplicitAny: https://casl.js.org/v6/en/guide/intro#basics
    builder.can("manage" as any, "all" as any);
  }

  //TODO
  if (session.data?.loggedIn && session.data.user) {
    // biome-ignore lint/suspicious/noExplicitAny: https://casl.js.org/v6/en/guide/intro#basics
    builder.can("manage" as any, "all" as any);
  }

  defineAbilitiesForConference(session, builder);
  defineAbilitiesForCommittee(session, builder);
  defineAbilitiesForAgendaItem(session, builder);
  defineAbilitiesForConferenceMembers(session, builder);
  defineAbilitiesForDelegation(session, builder);
  defineAbilitiesForMessages(session, builder);
  defineAbilitiesForSpeakersList(session, builder);
  defineAbilitiesForSpeakerOnList(session, builder);

  return builder.build({
    detectSubjectType: (object) => object.__typename,
  });
};
