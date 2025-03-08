/**
 * This Component is used in the Voting Component.
 * It displays the information about the voting.
 * It includes the title, description, introducedBy, substantiveVote and majority.
 */

import type { CountryCode, Voting } from "@/lib/types/types";
import * as m from "@/paraglide/messages";
import FAIcon from "../FAIcon";
import { LargeFlag } from "../Flag";
import getCountryNameByCode from "@/lib/get_country_name_by_code";

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
    <div className="mb-5 flex flex-row justify-between gap-2">
      <div
        className="grid flex-1 items-center gap-3"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <div className="col-span-2 text-lg font-bold">{title}</div>
        {description && (
          <>
            <FAIcon
              icon="info-circle"
              className="ml-2 justify-self-center text-lg"
            />
            <div className="text-sm">{description}</div>
          </>
        )}
        {introducedBy && (
          <>
            <FAIcon icon="flag" className="ml-2 justify-self-center text-lg" />
            <div className="text-sm">
              {m.introducedBy()} {getCountryNameByCode(introducedBy)}
            </div>
          </>
        )}
        {substantiveVote ? (
          <>
            <FAIcon
              icon="check-to-slot"
              className="ml-2 justify-self-center text-xl"
            />
            <div className="text-sm">{m.substantialVoting()}</div>
          </>
        ) : (
          <>
            <FAIcon icon="gavel" className="ml-2 justify-self-center text-xl" />
            <div className="text-sm">{m.proceduralVoting()}</div>
          </>
        )}
        <FAIcon icon="pie-chart" className="ml-2 justify-self-center text-xl" />
        <div className="text-sm">{neededMajority()}</div>
      </div>
      <div className="flex flex-col items-center justify-start">
        <LargeFlag countryCode={getFlag(introducedBy)} className="ml-4" />
      </div>
    </div>
  );
}
