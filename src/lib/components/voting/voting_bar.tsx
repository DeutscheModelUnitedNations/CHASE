import type { Voting, VotingMajority } from "@/lib/types/types";
import React, { useEffect, useState } from "react";

/**
 * This Component is used in the Voting Component.
 * It displays the voting bar, which shows the percentage of votes for each vote.
 * It also displays the majority needed for the vote to pass.
 * It also displays the numbers of votes for each vote.
 * This Component does have a lot of logic calculations to calculate the percentages
 * and display the bars correctly, so that they can be perceived as accurate.
 */

export default function VotingBar({
  votingCountries,
  votes,
  majority,
}: Voting) {
  const [yesVotesPercentage, setyesVotesPercentage] = useState<number>(0);
  const [noVotesPercentage, setnoVotesPercentage] = useState<number>(0);
  const [abstainVotesPercentage, setabstainVotesPercentage] =
    useState<number>(0);
  const [remainingVotesPercentage, setremainingVotesPercentage] =
    useState<number>(100);

  const countVotes = (key: string): number => {
    return votes.filter((vote) => vote.vote === key).length;
  };

  const countRemainingVotes = (): number => {
    return (
      votingCountries.length -
      countVotes("yes") -
      countVotes("no") -
      countVotes("abstain") -
      countVotes("absent")
    );
  };

  const countNonAbsentVotes = (): number => {
    return votingCountries.length - countVotes("absent");
  };

  useEffect(() => {
    const numberOfVotes = votingCountries.length - countVotes("absent");

    setyesVotesPercentage((countVotes("yes") / numberOfVotes) * 100);
    setnoVotesPercentage((countVotes("no") / numberOfVotes) * 100);
    setabstainVotesPercentage((countVotes("abstain") / numberOfVotes) * 100);
    setremainingVotesPercentage((countRemainingVotes() / numberOfVotes) * 100);
  }, [votes]);

  return (
    <div className="relative flex w-full flex-1 overflow-hidden rounded-md shadow-md">
      <VotingBarSection
        numberOfVotes={countVotes("yes")}
        percentage={yesVotesPercentage}
        color="bg-voting-for"
      />
      <div className="h-8 w-px bg-white dark:bg-primary-100" />
      <VotingBarSection
        numberOfVotes={countRemainingVotes()}
        percentage={remainingVotesPercentage}
        color="bg-white dark:bg-primary-100"
        hideCounter
      />
      <VotingBarSection
        numberOfVotes={countVotes("abstain")}
        percentage={abstainVotesPercentage}
        color="bg-voting-abstain"
      />
      <div className="h-8 w-px bg-white dark:bg-primary-100" />
      <VotingBarSection
        numberOfVotes={countVotes("no")}
        percentage={noVotesPercentage}
        color="bg-voting-against"
      />
      <MajorityMarking
        majority={majority}
        numberOfVotes={countNonAbsentVotes()}
      />
    </div>
  );
}

function VotingBarSection({
  numberOfVotes,
  percentage,
  color,
  hideCounter = false,
}: {
  numberOfVotes: number;
  percentage: number;
  color: string;
  hideCounter?: boolean;
}) {
  return (
    <div
      className={`flex h-8 items-center justify-center text-white transition-all duration-1000 ${color}`}
      style={{ width: `${percentage}%` }}
    >
      {!hideCounter && numberOfVotes > 0 && (
        <div className="text-sm">{numberOfVotes}</div>
      )}
    </div>
  );
}

function MajorityMarking({
  majority,
  numberOfVotes,
}: {
  majority: VotingMajority;
  numberOfVotes: number;
}) {
  const getMajorityPercentage = (): number => {
    switch (majority) {
      case "simple":
        return 0.5001;
      case "two-thirds":
        return 0.6666;
      case "three-quarters":
        return 0.75;
      case "consensus":
        return 1;
      case "security-council":
        return 9 / numberOfVotes;
      default:
        return 0.5001;
    }
  };

  const getVotingStepForMajority = (): number => {
    const majorityPercentage = getMajorityPercentage();
    const votesNeededForMajority = Math.ceil(
      numberOfVotes * majorityPercentage,
    );
    const percentagePosition = (votesNeededForMajority / numberOfVotes) * 100;

    return percentagePosition;
  };

  return (
    <div
      className="absolute h-8 w-1 -translate-x-px bg-primary-100 dark:bg-primary-900"
      style={{ left: `${getVotingStepForMajority()}%` }}
    />
  );
}
