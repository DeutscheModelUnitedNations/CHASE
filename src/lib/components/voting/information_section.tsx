
/**
 * This Component is used in the Voting Component.
 * It displays the information about the voting.
 * It includes the title, description, introducedBy, substantiveVote and majority.
 */

import type { CountryCode, Voting } from "@/lib/types/types";
import * as m from "@/paraglide/messages";
import FAIcon from "../FAIcon";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import { LargeFlag } from "../Flag";

export default function InformationSection({
  title,
  description,
  introducedBy,
  substantiveVote,
  majority,
}: Voting) {

  const getFlag = (countryCode: CountryCode = "uno"): CountryCode => {
    return countryCode;
  };

  const neededMajority = () => {
    switch (majority) {
      case "simple":
        return m.simpleMajorityRequired();
      case "two-thirds":
        return m.twoThirdsMajorityRequired();
      case "three-quarters":
        return m.threeQuartersMajorityRequired();
      case "consensus":
        return m.consensusRequired();
      case "security-council":
        return m.securityCouncilVoteMode();
      default:
        return m.simpleMajorityRequired();
    }
  };

  return (
    <div className="flex flex-row justify-between gap-2 mb-5">
      <div
        className="flex-1 grid items-center gap-3"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <div className="text-lg font-bold col-span-2">{title}</div>
        {description && (
          <>
            <FAIcon
              icon="info-circle"
              className="text-lg justify-self-center ml-2"
            />
            <div className="text-sm">{description}</div>
          </>
        )}
        {introducedBy && (
          <>
            <FAIcon icon="flag" className="text-lg justify-self-center ml-2" />
            <div className="text-sm">
              {m.introducedBy()}{" "}
              {getFullTranslatedCountryNameFromISO3Code(introducedBy)}
            </div>
          </>
        )}
        {substantiveVote ? (
          <>
            <FAIcon
              icon="check-to-slot"
              className="text-xl justify-self-center ml-2"
            />
            <div className="text-sm">
              {m.substantialVoting()}
            </div>
          </>
        ) : (
          <>
            <FAIcon icon="gavel" className="text-xl justify-self-center ml-2" />
            <div className="text-sm">
              {m.proceduralVoting()}
            </div>
          </>
        )}
        <FAIcon icon="pie-chart" className="text-xl justify-self-center ml-2" />
        <div className="text-sm">{neededMajority()}</div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <LargeFlag countryCode={getFlag(introducedBy)} className="ml-4" />
      </div>
    </div>
  );
}
