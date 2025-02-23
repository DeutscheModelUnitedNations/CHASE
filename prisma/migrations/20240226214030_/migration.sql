-- CreateEnum
CREATE TYPE "ConferenceRole" AS ENUM ('ADMIN', 'SECRETARIAT', 'CHAIR', 'COMMITTEE_ADVISOR', 'NON_STATE_ACTOR', 'PRESS_CORPS', 'GUEST', 'PARTICIPANT_CARE', 'MISCELLANEOUS_TEAM');

-- CreateEnum
CREATE TYPE "CommitteeCategory" AS ENUM ('COMMITTEE', 'CRISIS', 'ICJ');

-- CreateEnum
CREATE TYPE "CommitteeStatus" AS ENUM ('FORMAL', 'INFORMAL', 'PAUSE', 'SUSPENSION', 'CLOSED');

-- CreateEnum
CREATE TYPE "Presence" AS ENUM ('PRESENT', 'EXCUSED', 'ABSENT');

-- CreateEnum
CREATE TYPE "SpeakersListCategory" AS ENUM ('SPEAKERS_LIST', 'COMMENT_LIST', 'MODERATED_CAUCUS');

-- CreateEnum
CREATE TYPE "NationVariant" AS ENUM ('NATION', 'NON_STATE_ACTOR', 'SPECIAL_PERSON');

-- CreateEnum
CREATE TYPE "MessageCategory" AS ENUM ('TO_CHAIR', 'GUEST_SPEAKER', 'FACT_CHECK', 'INFORMATION', 'GENERAL_SECRETARY', 'OTHER');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('UNREAD', 'READ', 'PRIORITY', 'ASSIGNED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendingCredentialCreateTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,

    CONSTRAINT "PendingCredentialCreateTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "validationTokenId" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConferenceCreateToken" (
    "token" TEXT NOT NULL,

    CONSTRAINT "ConferenceCreateToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConferenceMember" (
    "id" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "userId" TEXT,
    "role" "ConferenceRole" NOT NULL,

    CONSTRAINT "ConferenceMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "category" "CommitteeCategory" NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "parentId" TEXT,
    "whiteboardContent" TEXT NOT NULL DEFAULT '<h1>Hello, World</h1>',
    "status" "CommitteeStatus" NOT NULL DEFAULT 'CLOSED',
    "stateOfDebate" TEXT,
    "statusHeadline" TEXT,
    "statusUntil" TIMESTAMP(3),
    "allowDelegationsToAddThemselvesToSpeakersList" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "userId" TEXT,
    "delegationId" TEXT,
    "presence" "Presence" NOT NULL DEFAULT 'ABSENT',

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaItem" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AgendaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakersList" (
    "id" TEXT NOT NULL,
    "agendaItemId" TEXT NOT NULL,
    "type" "SpeakersListCategory" NOT NULL,
    "speakingTime" INTEGER NOT NULL,
    "timeLeft" INTEGER,
    "startTimestamp" TIMESTAMP(3),
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SpeakersList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeakerOnList" (
    "id" TEXT NOT NULL,
    "speakersListId" TEXT NOT NULL,
    "committeeMemberId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "SpeakerOnList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegation" (
    "id" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,
    "nationId" TEXT NOT NULL,

    CONSTRAINT "Delegation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nation" (
    "id" TEXT NOT NULL,
    "alpha3Code" TEXT NOT NULL,
    "variant" "NationVariant" NOT NULL DEFAULT 'NATION',

    CONSTRAINT "Nation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "category" "MessageCategory" NOT NULL DEFAULT 'TO_CHAIR',
    "message" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "status" "MessageStatus"[] DEFAULT ARRAY['UNREAD']::"MessageStatus"[],
    "metaEmail" TEXT,
    "metaDelegation" TEXT,
    "metaCommittee" TEXT,
    "metaAgendaItem" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_userId_email_key" ON "Email"("userId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Conference_name_key" ON "Conference"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ConferenceMember_userId_conferenceId_key" ON "ConferenceMember"("userId", "conferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_name_conferenceId_key" ON "Committee"("name", "conferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "Committee_abbreviation_conferenceId_key" ON "Committee"("abbreviation", "conferenceId");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_committeeId_delegationId_key" ON "CommitteeMember"("committeeId", "delegationId");

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_committeeId_userId_key" ON "CommitteeMember"("committeeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SpeakersList_agendaItemId_type_key" ON "SpeakersList"("agendaItemId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "SpeakerOnList_speakersListId_position_key" ON "SpeakerOnList"("speakersListId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "SpeakerOnList_speakersListId_committeeMemberId_key" ON "SpeakerOnList"("speakersListId", "committeeMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Delegation_conferenceId_nationId_key" ON "Delegation"("conferenceId", "nationId");

-- CreateIndex
CREATE UNIQUE INDEX "Nation_alpha3Code_key" ON "Nation"("alpha3Code");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingCredentialCreateTask" ADD CONSTRAINT "PendingCredentialCreateTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingCredentialCreateTask" ADD CONSTRAINT "PendingCredentialCreateTask_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_validationTokenId_fkey" FOREIGN KEY ("validationTokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceMember" ADD CONSTRAINT "ConferenceMember_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceMember" ADD CONSTRAINT "ConferenceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Committee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_delegationId_fkey" FOREIGN KEY ("delegationId") REFERENCES "Delegation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaItem" ADD CONSTRAINT "AgendaItem_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakersList" ADD CONSTRAINT "SpeakersList_agendaItemId_fkey" FOREIGN KEY ("agendaItemId") REFERENCES "AgendaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakerOnList" ADD CONSTRAINT "SpeakerOnList_speakersListId_fkey" FOREIGN KEY ("speakersListId") REFERENCES "SpeakersList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeakerOnList" ADD CONSTRAINT "SpeakerOnList_committeeMemberId_fkey" FOREIGN KEY ("committeeMemberId") REFERENCES "CommitteeMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegation" ADD CONSTRAINT "Delegation_nationId_fkey" FOREIGN KEY ("nationId") REFERENCES "Nation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
