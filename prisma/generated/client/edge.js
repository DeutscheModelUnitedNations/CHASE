
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.3.1
 * Query Engine version: acc0b9dd43eb689cbd20c9470515d719db10d0b0
 */
Prisma.prismaVersion = {
  client: "6.3.1",
  engine: "acc0b9dd43eb689cbd20c9470515d719db10d0b0"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PasswordScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  passwordHash: 'passwordHash'
};

exports.Prisma.TokenScalarFieldEnum = {
  id: 'id',
  tokenHash: 'tokenHash',
  expiresAt: 'expiresAt'
};

exports.Prisma.PendingCredentialCreateTaskScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  tokenId: 'tokenId'
};

exports.Prisma.EmailScalarFieldEnum = {
  email: 'email',
  userId: 'userId',
  validated: 'validated',
  validationTokenId: 'validationTokenId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.ConferenceCreateTokenScalarFieldEnum = {
  token: 'token'
};

exports.Prisma.ConferenceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  start: 'start',
  end: 'end',
  pressWebsite: 'pressWebsite',
  feedbackWebsite: 'feedbackWebsite'
};

exports.Prisma.ConferenceMemberScalarFieldEnum = {
  id: 'id',
  conferenceId: 'conferenceId',
  userId: 'userId',
  role: 'role'
};

exports.Prisma.CommitteeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  abbreviation: 'abbreviation',
  category: 'category',
  conferenceId: 'conferenceId',
  parentId: 'parentId',
  whiteboardContent: 'whiteboardContent',
  status: 'status',
  stateOfDebate: 'stateOfDebate',
  statusHeadline: 'statusHeadline',
  statusUntil: 'statusUntil',
  allowDelegationsToAddThemselvesToSpeakersList: 'allowDelegationsToAddThemselvesToSpeakersList'
};

exports.Prisma.CommitteeMemberScalarFieldEnum = {
  id: 'id',
  committeeId: 'committeeId',
  userId: 'userId',
  delegationId: 'delegationId',
  presence: 'presence'
};

exports.Prisma.AgendaItemScalarFieldEnum = {
  id: 'id',
  committeeId: 'committeeId',
  title: 'title',
  description: 'description',
  isActive: 'isActive'
};

exports.Prisma.SpeakersListScalarFieldEnum = {
  id: 'id',
  agendaItemId: 'agendaItemId',
  type: 'type',
  speakingTime: 'speakingTime',
  timeLeft: 'timeLeft',
  startTimestamp: 'startTimestamp',
  isClosed: 'isClosed'
};

exports.Prisma.SpeakerOnListScalarFieldEnum = {
  id: 'id',
  speakersListId: 'speakersListId',
  committeeMemberId: 'committeeMemberId',
  position: 'position'
};

exports.Prisma.DelegationScalarFieldEnum = {
  id: 'id',
  conferenceId: 'conferenceId',
  nationId: 'nationId'
};

exports.Prisma.NationScalarFieldEnum = {
  id: 'id',
  alpha3Code: 'alpha3Code',
  variant: 'variant'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  subject: 'subject',
  category: 'category',
  message: 'message',
  committeeId: 'committeeId',
  authorId: 'authorId',
  timestamp: 'timestamp',
  status: 'status',
  forwarded: 'forwarded',
  metaEmail: 'metaEmail',
  metaDelegation: 'metaDelegation',
  metaCommittee: 'metaCommittee',
  metaAgendaItem: 'metaAgendaItem'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ConferenceRole = exports.$Enums.ConferenceRole = {
  ADMIN: 'ADMIN',
  SECRETARIAT: 'SECRETARIAT',
  CHAIR: 'CHAIR',
  COMMITTEE_ADVISOR: 'COMMITTEE_ADVISOR',
  NON_STATE_ACTOR: 'NON_STATE_ACTOR',
  PRESS_CORPS: 'PRESS_CORPS',
  GUEST: 'GUEST',
  PARTICIPANT_CARE: 'PARTICIPANT_CARE',
  MISCELLANEOUS_TEAM: 'MISCELLANEOUS_TEAM'
};

exports.CommitteeCategory = exports.$Enums.CommitteeCategory = {
  COMMITTEE: 'COMMITTEE',
  CRISIS: 'CRISIS',
  ICJ: 'ICJ'
};

exports.CommitteeStatus = exports.$Enums.CommitteeStatus = {
  FORMAL: 'FORMAL',
  INFORMAL: 'INFORMAL',
  PAUSE: 'PAUSE',
  SUSPENSION: 'SUSPENSION',
  CLOSED: 'CLOSED'
};

exports.Presence = exports.$Enums.Presence = {
  PRESENT: 'PRESENT',
  EXCUSED: 'EXCUSED',
  ABSENT: 'ABSENT'
};

exports.SpeakersListCategory = exports.$Enums.SpeakersListCategory = {
  SPEAKERS_LIST: 'SPEAKERS_LIST',
  COMMENT_LIST: 'COMMENT_LIST',
  MODERATED_CAUCUS: 'MODERATED_CAUCUS'
};

exports.NationVariant = exports.$Enums.NationVariant = {
  NATION: 'NATION',
  NON_STATE_ACTOR: 'NON_STATE_ACTOR',
  SPECIAL_PERSON: 'SPECIAL_PERSON'
};

exports.MessageCategory = exports.$Enums.MessageCategory = {
  TO_CHAIR: 'TO_CHAIR',
  GUEST_SPEAKER: 'GUEST_SPEAKER',
  FACT_CHECK: 'FACT_CHECK',
  INFORMATION: 'INFORMATION',
  GENERAL_SECRETARY: 'GENERAL_SECRETARY',
  OTHER: 'OTHER'
};

exports.MessageStatus = exports.$Enums.MessageStatus = {
  UNREAD: 'UNREAD',
  PRIORITY: 'PRIORITY',
  ASSIGNED: 'ASSIGNED',
  ARCHIVED: 'ARCHIVED'
};

exports.Prisma.ModelName = {
  Password: 'Password',
  Token: 'Token',
  PendingCredentialCreateTask: 'PendingCredentialCreateTask',
  Email: 'Email',
  User: 'User',
  ConferenceCreateToken: 'ConferenceCreateToken',
  Conference: 'Conference',
  ConferenceMember: 'ConferenceMember',
  Committee: 'Committee',
  CommitteeMember: 'CommitteeMember',
  AgendaItem: 'AgendaItem',
  SpeakersList: 'SpeakersList',
  SpeakerOnList: 'SpeakerOnList',
  Delegation: 'Delegation',
  Nation: 'Nation',
  Message: 'Message'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/m1212e/Coding/munify-chase/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-3.0.x",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-openssl-3.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/m1212e/Coding/munify-chase/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.3.1",
  "engineVersion": "acc0b9dd43eb689cbd20c9470515d719db10d0b0",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\ngenerator client {\n  provider      = \"prisma-client-js\"\n  output        = \"./generated/client\"\n  binaryTargets = [\"native\", \"linux-musl-openssl-3.0.x\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator prismabox {\n  provider                    = \"prismabox\"\n  output                      = \"./generated/schema\"\n  typeboxImportVariableName   = \"t\"\n  typeboxImportDependencyName = \"elysia\"\n  inputModel                  = true\n  plainAdditionalFields       = [\"__typename: String\"]\n}\n\n// model Authenticator {\n//   id     String @id @default(uuid())\n//   user   User   @relation(fields: [userId], references: [id])\n//   userId String\n\n//   credentialID         String   @db.Text\n//   credentialPublicKey  Bytes\n//   counter              BigInt\n//   credentialDeviceType String   @db.VarChar(32)\n//   credentialBackedUp   Boolean\n//   transports           String[] @db.VarChar(255)\n// }\n\n// TODO a max amount for passwords would make sense\n\nmodel Password {\n  id           String @id @default(uuid())\n  user         User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  userId       String\n  /// @prismabox.hide\n  passwordHash String\n}\n\n/// A token which can be used to grant one time access to something in the app\n/// e.g. confirming an email, resetting a password\nmodel Token {\n  id        String   @id @default(uuid())\n  /// @prismabox.hide\n  tokenHash String\n  expiresAt DateTime\n\n  pendingEmailConfirmations  Email[]\n  pendingCredentialCreations PendingCredentialCreateTask[]\n}\n\nmodel PendingCredentialCreateTask {\n  id String @id @default(uuid())\n\n  user    User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  userId  String\n  token   Token  @relation(fields: [tokenId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  tokenId String\n}\n\nmodel Email {\n  email  String @id\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n  userId String\n\n  validated         Boolean @default(false)\n  validationToken   Token?  @relation(fields: [validationTokenId], references: [id])\n  validationTokenId String?\n\n  @@unique([userId, email])\n}\n\n/// A user in the system\nmodel User {\n  id                             String                        @id @default(uuid())\n  name                           String\n  conferenceMemberships          ConferenceMember[]\n  committeeMemberships           CommitteeMember[]\n  messages                       Message[]\n  emails                         Email[]\n  passwords                      Password[]\n  // authenticators Authenticator[]\n  pendingCredentialCreationTasks PendingCredentialCreateTask[]\n}\n\n/// Consumeable token which grants the creation of a conference\nmodel ConferenceCreateToken {\n  token String @id\n}\n\n/// A conference in the system\nmodel Conference {\n  id              String             @id @default(uuid())\n  name            String             @unique\n  committees      Committee[]\n  start           DateTime?\n  end             DateTime?\n  pressWebsite    String?\n  feedbackWebsite String?\n  delegations     Delegation[]\n  members         ConferenceMember[]\n}\n\n/// The role of a user in a conference\nenum ConferenceRole {\n  ADMIN\n  SECRETARIAT\n  CHAIR\n  COMMITTEE_ADVISOR\n  NON_STATE_ACTOR\n  PRESS_CORPS\n  GUEST\n  PARTICIPANT_CARE\n  MISCELLANEOUS_TEAM\n}\n\n/// A user's membership in a conference, providing them with a role in the conference\nmodel ConferenceMember {\n  id           String         @id @default(uuid())\n  conference   Conference     @relation(fields: [conferenceId], references: [id])\n  conferenceId String\n  user         User?          @relation(fields: [userId], references: [id])\n  userId       String?\n  role         ConferenceRole\n\n  @@unique([userId, conferenceId])\n}\n\n/// The type of a committee in a conference\nenum CommitteeCategory {\n  /// A standard committee\n  COMMITTEE\n  /// A crisis simulation\n  CRISIS\n  /// A International Court of Justice simulation\n  ICJ\n}\n\nenum CommitteeStatus {\n  FORMAL\n  INFORMAL\n  PAUSE\n  SUSPENSION\n  CLOSED /// Don't display a Widget\n}\n\n/// A committee in a conference\nmodel Committee {\n  id                                            String            @id @default(uuid())\n  name                                          String\n  abbreviation                                  String\n  category                                      CommitteeCategory\n  conference                                    Conference        @relation(fields: [conferenceId], references: [id])\n  conferenceId                                  String\n  members                                       CommitteeMember[]\n  parent                                        Committee?        @relation(\"subCommittee\", fields: [parentId], references: [id])\n  parentId                                      String?\n  subCommittees                                 Committee[]       @relation(\"subCommittee\")\n  messages                                      Message[]\n  agendaItems                                   AgendaItem[]\n  whiteboardContent                             String            @default(\"<p>Willkommen!</p>\")\n  status                                        CommitteeStatus   @default(CLOSED)\n  stateOfDebate                                 String?\n  statusHeadline                                String?\n  statusUntil                                   DateTime?\n  allowDelegationsToAddThemselvesToSpeakersList Boolean           @default(false)\n\n  @@unique([name, conferenceId])\n  @@unique([abbreviation, conferenceId])\n}\n\n/// The presence status of a CommitteeMember\nenum Presence {\n  PRESENT\n  EXCUSED\n  ABSENT\n}\n\n/// A user's membership in a committee, providing them with a role in the committee\nmodel CommitteeMember {\n  id           String          @id @default(uuid())\n  committee    Committee       @relation(fields: [committeeId], references: [id])\n  committeeId  String\n  user         User?           @relation(fields: [userId], references: [id])\n  userId       String?\n  speakerLists SpeakerOnList[]\n  delegation   Delegation?     @relation(fields: [delegationId], references: [id])\n  delegationId String?\n  presence     Presence        @default(ABSENT)\n\n  @@unique([committeeId, delegationId])\n  @@unique([committeeId, userId])\n}\n\n/// An agenda item in a committee. This is a topic of discussion in a committee.\nmodel AgendaItem {\n  id           String         @id @default(uuid())\n  committee    Committee      @relation(fields: [committeeId], references: [id])\n  committeeId  String\n  title        String\n  description  String?\n  speakerLists SpeakersList[]\n  isActive     Boolean        @default(false)\n}\n\n/// The type of a speakers list\nenum SpeakersListCategory {\n  /// A standard speakers list\n  SPEAKERS_LIST\n  /// A comment list\n  COMMENT_LIST\n  /// A moderated caucus\n  MODERATED_CAUCUS\n}\n\n/// A speakers list in a committee\nmodel SpeakersList {\n  id             String               @id @default(uuid())\n  agendaItem     AgendaItem           @relation(fields: [agendaItemId], references: [id])\n  agendaItemId   String\n  type           SpeakersListCategory\n  speakers       SpeakerOnList[]\n  /// The time in seconds that a speaker has to speak\n  speakingTime   Int\n  timeLeft       Int?\n  startTimestamp DateTime?\n  isClosed       Boolean              @default(false)\n\n  @@unique([agendaItemId, type])\n}\n\n/// A speaker on a speakers list, storing their position in the list\nmodel SpeakerOnList {\n  id                String          @id @default(uuid())\n  speakersList      SpeakersList    @relation(fields: [speakersListId], references: [id])\n  speakersListId    String\n  committeeMember   CommitteeMember @relation(fields: [committeeMemberId], references: [id])\n  committeeMemberId String\n  //TODO replace this with a signle linked list for better concurrency/less necessary updates?\n  position          Int\n\n  @@unique([speakersListId, position])\n  @@unique([speakersListId, committeeMemberId])\n}\n\nmodel Delegation {\n  id           String            @id @default(uuid())\n  conference   Conference        @relation(fields: [conferenceId], references: [id])\n  conferenceId String\n  nation       Nation            @relation(fields: [nationId], references: [id])\n  nationId     String\n  members      CommitteeMember[]\n\n  @@unique([conferenceId, nationId])\n}\n\nenum NationVariant {\n  NATION\n  NON_STATE_ACTOR\n  SPECIAL_PERSON\n}\n\n//TODO should we allow for customizing these per conference and just allow loading template at creation?\n/// A nation in the system. E.g. Germany\nmodel Nation {\n  id          String        @id @default(uuid())\n  alpha3Code  String        @unique\n  variant     NationVariant @default(NATION)\n  delegations Delegation[]\n}\n\nenum MessageCategory {\n  TO_CHAIR\n  GUEST_SPEAKER\n  FACT_CHECK\n  INFORMATION\n  GENERAL_SECRETARY\n  OTHER\n}\n\nenum MessageStatus {\n  UNREAD\n  PRIORITY\n  ASSIGNED\n  ARCHIVED\n}\n\nmodel Message {\n  id          String          @id @default(uuid())\n  subject     String\n  category    MessageCategory @default(TO_CHAIR)\n  message     String\n  committee   Committee       @relation(fields: [committeeId], references: [id])\n  committeeId String\n  author      User            @relation(fields: [authorId], references: [id])\n  authorId    String\n  timestamp   DateTime\n  status      MessageStatus[] @default([UNREAD])\n  forwarded   Boolean         @default(false) /// If the message was forwarded to the Research Service\n\n  /// Saved Metadata without relation\n  metaEmail      String?\n  metaDelegation String?\n  metaCommittee  String?\n  metaAgendaItem String?\n}\n",
  "inlineSchemaHash": "0022667f3c5b04b59b19cdde0b4bb5b307b9c8d1db35aaa28c073dff49439aa9",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Password\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"PasswordToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@prismabox.hide\"}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Token\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@prismabox.hide\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pendingEmailConfirmations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Email\",\"nativeType\":null,\"relationName\":\"EmailToToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pendingCredentialCreations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PendingCredentialCreateTask\",\"nativeType\":null,\"relationName\":\"PendingCredentialCreateTaskToToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A token which can be used to grant one time access to something in the app\\\\ne.g. confirming an email, resetting a password\"},\"PendingCredentialCreateTask\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"PendingCredentialCreateTaskToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Token\",\"nativeType\":null,\"relationName\":\"PendingCredentialCreateTaskToToken\",\"relationFromFields\":[\"tokenId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tokenId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Email\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"EmailToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"relationOnUpdate\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validated\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validationToken\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Token\",\"nativeType\":null,\"relationName\":\"EmailToToken\",\"relationFromFields\":[\"validationTokenId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"validationTokenId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"email\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"email\"]}],\"isGenerated\":false},\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conferenceMemberships\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConferenceMember\",\"nativeType\":null,\"relationName\":\"ConferenceMemberToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeMemberships\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommitteeMember\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"nativeType\":null,\"relationName\":\"MessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emails\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Email\",\"nativeType\":null,\"relationName\":\"EmailToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwords\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Password\",\"nativeType\":null,\"relationName\":\"PasswordToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pendingCredentialCreationTasks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PendingCredentialCreateTask\",\"nativeType\":null,\"relationName\":\"PendingCredentialCreateTaskToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A user in the system\"},\"ConferenceCreateToken\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Consumeable token which grants the creation of a conference\"},\"Conference\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"CommitteeToConference\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"start\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"end\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pressWebsite\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedbackWebsite\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delegations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delegation\",\"nativeType\":null,\"relationName\":\"ConferenceToDelegation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConferenceMember\",\"nativeType\":null,\"relationName\":\"ConferenceToConferenceMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A conference in the system\"},\"ConferenceMember\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conference\",\"nativeType\":null,\"relationName\":\"ConferenceToConferenceMember\",\"relationFromFields\":[\"conferenceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conferenceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"ConferenceMemberToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConferenceRole\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"conferenceId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"conferenceId\"]}],\"isGenerated\":false,\"documentation\":\"A user's membership in a conference, providing them with a role in the conference\"},\"Committee\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"abbreviation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommitteeCategory\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conference\",\"nativeType\":null,\"relationName\":\"CommitteeToConference\",\"relationFromFields\":[\"conferenceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conferenceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommitteeMember\",\"nativeType\":null,\"relationName\":\"CommitteeToCommitteeMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"subCommittee\",\"relationFromFields\":[\"parentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subCommittees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"subCommittee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"nativeType\":null,\"relationName\":\"CommitteeToMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agendaItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AgendaItem\",\"nativeType\":null,\"relationName\":\"AgendaItemToCommittee\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whiteboardContent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"<p>Willkommen!</p>\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CommitteeStatus\",\"nativeType\":null,\"default\":\"CLOSED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateOfDebate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusHeadline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statusUntil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"allowDelegationsToAddThemselvesToSpeakersList\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"name\",\"conferenceId\"],[\"abbreviation\",\"conferenceId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"conferenceId\"]},{\"name\":null,\"fields\":[\"abbreviation\",\"conferenceId\"]}],\"isGenerated\":false,\"documentation\":\"A committee in a conference\"},\"CommitteeMember\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"CommitteeToCommitteeMember\",\"relationFromFields\":[\"committeeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakerLists\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SpeakerOnList\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToSpeakerOnList\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delegation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delegation\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToDelegation\",\"relationFromFields\":[\"delegationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delegationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"presence\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Presence\",\"nativeType\":null,\"default\":\"ABSENT\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"committeeId\",\"delegationId\"],[\"committeeId\",\"userId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"committeeId\",\"delegationId\"]},{\"name\":null,\"fields\":[\"committeeId\",\"userId\"]}],\"isGenerated\":false,\"documentation\":\"A user's membership in a committee, providing them with a role in the committee\"},\"AgendaItem\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"AgendaItemToCommittee\",\"relationFromFields\":[\"committeeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakerLists\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SpeakersList\",\"nativeType\":null,\"relationName\":\"AgendaItemToSpeakersList\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"An agenda item in a committee. This is a topic of discussion in a committee.\"},\"SpeakersList\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agendaItem\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AgendaItem\",\"nativeType\":null,\"relationName\":\"AgendaItemToSpeakersList\",\"relationFromFields\":[\"agendaItemId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agendaItemId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SpeakersListCategory\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SpeakerOnList\",\"nativeType\":null,\"relationName\":\"SpeakerOnListToSpeakersList\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakingTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"The time in seconds that a speaker has to speak\"},{\"name\":\"timeLeft\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startTimestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isClosed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"agendaItemId\",\"type\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"agendaItemId\",\"type\"]}],\"isGenerated\":false,\"documentation\":\"A speakers list in a committee\"},\"SpeakerOnList\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakersList\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SpeakersList\",\"nativeType\":null,\"relationName\":\"SpeakerOnListToSpeakersList\",\"relationFromFields\":[\"speakersListId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speakersListId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeMember\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommitteeMember\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToSpeakerOnList\",\"relationFromFields\":[\"committeeMemberId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeMemberId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"position\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"speakersListId\",\"position\"],[\"speakersListId\",\"committeeMemberId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"speakersListId\",\"position\"]},{\"name\":null,\"fields\":[\"speakersListId\",\"committeeMemberId\"]}],\"isGenerated\":false,\"documentation\":\"A speaker on a speakers list, storing their position in the list\"},\"Delegation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conference\",\"nativeType\":null,\"relationName\":\"ConferenceToDelegation\",\"relationFromFields\":[\"conferenceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conferenceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Nation\",\"nativeType\":null,\"relationName\":\"DelegationToNation\",\"relationFromFields\":[\"nationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CommitteeMember\",\"nativeType\":null,\"relationName\":\"CommitteeMemberToDelegation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"conferenceId\",\"nationId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"conferenceId\",\"nationId\"]}],\"isGenerated\":false},\"Nation\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alpha3Code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"variant\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"NationVariant\",\"nativeType\":null,\"default\":\"NATION\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delegations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delegation\",\"nativeType\":null,\"relationName\":\"DelegationToNation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A nation in the system. E.g. Germany\"},\"Message\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MessageCategory\",\"nativeType\":null,\"default\":\"TO_CHAIR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committee\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Committee\",\"nativeType\":null,\"relationName\":\"CommitteeToMessage\",\"relationFromFields\":[\"committeeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"committeeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"MessageToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MessageStatus\",\"nativeType\":null,\"default\":[\"UNREAD\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"forwarded\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"If the message was forwarded to the Research Service\"},{\"name\":\"metaEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Saved Metadata without relation\"},{\"name\":\"metaDelegation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metaCommittee\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metaAgendaItem\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"ConferenceRole\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"SECRETARIAT\",\"dbName\":null},{\"name\":\"CHAIR\",\"dbName\":null},{\"name\":\"COMMITTEE_ADVISOR\",\"dbName\":null},{\"name\":\"NON_STATE_ACTOR\",\"dbName\":null},{\"name\":\"PRESS_CORPS\",\"dbName\":null},{\"name\":\"GUEST\",\"dbName\":null},{\"name\":\"PARTICIPANT_CARE\",\"dbName\":null},{\"name\":\"MISCELLANEOUS_TEAM\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"The role of a user in a conference\"},\"CommitteeCategory\":{\"values\":[{\"name\":\"COMMITTEE\",\"dbName\":null,\"documentation\":\"A standard committee\"},{\"name\":\"CRISIS\",\"dbName\":null,\"documentation\":\"A crisis simulation\"},{\"name\":\"ICJ\",\"dbName\":null,\"documentation\":\"A International Court of Justice simulation\"}],\"dbName\":null,\"documentation\":\"The type of a committee in a conference\"},\"CommitteeStatus\":{\"values\":[{\"name\":\"FORMAL\",\"dbName\":null},{\"name\":\"INFORMAL\",\"dbName\":null},{\"name\":\"PAUSE\",\"dbName\":null},{\"name\":\"SUSPENSION\",\"dbName\":null},{\"name\":\"CLOSED\",\"dbName\":null,\"documentation\":\"Don't display a Widget\"}],\"dbName\":null},\"Presence\":{\"values\":[{\"name\":\"PRESENT\",\"dbName\":null},{\"name\":\"EXCUSED\",\"dbName\":null},{\"name\":\"ABSENT\",\"dbName\":null}],\"dbName\":null,\"documentation\":\"The presence status of a CommitteeMember\"},\"SpeakersListCategory\":{\"values\":[{\"name\":\"SPEAKERS_LIST\",\"dbName\":null,\"documentation\":\"A standard speakers list\"},{\"name\":\"COMMENT_LIST\",\"dbName\":null,\"documentation\":\"A comment list\"},{\"name\":\"MODERATED_CAUCUS\",\"dbName\":null,\"documentation\":\"A moderated caucus\"}],\"dbName\":null,\"documentation\":\"The type of a speakers list\"},\"NationVariant\":{\"values\":[{\"name\":\"NATION\",\"dbName\":null},{\"name\":\"NON_STATE_ACTOR\",\"dbName\":null},{\"name\":\"SPECIAL_PERSON\",\"dbName\":null}],\"dbName\":null},\"MessageCategory\":{\"values\":[{\"name\":\"TO_CHAIR\",\"dbName\":null},{\"name\":\"GUEST_SPEAKER\",\"dbName\":null},{\"name\":\"FACT_CHECK\",\"dbName\":null},{\"name\":\"INFORMATION\",\"dbName\":null},{\"name\":\"GENERAL_SECRETARY\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null},\"MessageStatus\":{\"values\":[{\"name\":\"UNREAD\",\"dbName\":null},{\"name\":\"PRIORITY\",\"dbName\":null},{\"name\":\"ASSIGNED\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

