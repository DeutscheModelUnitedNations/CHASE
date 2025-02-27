import type { Nation } from "@prisma/generated/client";

/**
 * A country alpha3 code
 */
export type Alpha3Code = Nation["alpha3Code"];

/**
 * UN-Flag Specials for General Secretary and Guest Speakers (male and female)
 */
export type UNCodes = string;

/**
 * Non-State Actor Prefix and ID
 */
export type NSACodes = string;

/**
 * Code for not found
 */
export type OtherCodes = "xxx";

export type CountryCode = Alpha3Code | UNCodes | NSACodes | OtherCodes;

export interface Speaker {
  entryId: string;
  countryCode: CountryCode;
  customName?: string;
}

export interface CurrentSpeaker {
  entryId: string;
  countryCode: CountryCode;
  customName?: string;
  timer: {
    start: Date;
    durationMilliseconds: number;
    paused: boolean;
  };
}

export interface SpeakersListData {
  listOfAllCountries: CountryCode[];
  currentSpeaker: CurrentSpeaker;
  list: Speaker[];
  closed: boolean;
}

export interface CommitteeStatus {
  status: string;
  until: Date | null;
  category: "formal" | "informal" | "pause" | "suspension";
  currentDebateStep: string;
  nextDebateStep?: string;
}

export interface Document {
  documentId: string;
  topic?: string;
  category: "paper" | "draft" | "adopted";
  shared?: boolean;
  introducedBy: CountryCode;
  sponsors?: string[];
}

export interface Motion {
  motionId: string;
  motionText: string;
  introducedBy: CountryCode;
  status: "open" | "in-voting" | "passed" | "failed";
  voting?: Voting;
}

export type VotingMajority =
  | "simple"
  | "two-thirds"
  | "three-quarters"
  | "consensus"
  | "security-council";

export interface VotingResult {
  country: CountryCode;
  vote: "yes" | "no" | "abstain" | "absent";
}

export interface Voting {
  motionId: string;
  title: string;
  description?: string;
  introducedBy?: CountryCode;
  substantiveVote: boolean;
  votingCountries: CountryCode[];
  majority: VotingMajority;
  votes: VotingResult[];
  outcome?: "passed" | "failed";
}

export interface NormalApiResponse {
  committeeName: string;
  currentTopic: string;
  myCountry: CountryCode;
  speakersList: SpeakersListData;
  commentList: SpeakersListData;
  committeeStatus: CommitteeStatus;
  documents: Document[];
}
export interface Attendance {
  country: CountryCode;
  present: "present" | "excused" | "absent";
}
