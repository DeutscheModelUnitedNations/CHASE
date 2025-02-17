import type { CountryCode, Voting } from "@/custom_types/custom_types";
import React, { useEffect, useState } from "react";
import { SmallFlag } from "../flag_templates";
import { useI18nContext } from "@/i18n/i18n-react";
import { AnimatePresence, motion } from "framer-motion";
import FlipMove from "react-flip-move";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used in the Voting Component.
 * It displays all voting countries in a grid, sorted by their vote.
 * It also includes a transition animation, when a country changes from remaining to a vote.
 */

export default function CountryGrid({
  votes,
  votingCountries,
  substantiveVote,
  motionId,
}: Voting) {
  const { LL } = useI18nContext();

  const [yesVotes, setYesVotes] = useState<CountryCode[]>([]);
  const [noVotes, setNoVotes] = useState<CountryCode[]>([]);
  const [abstainVotes, setAbstainVotes] = useState<CountryCode[]>([]);
  const [_, setAbsentVotes] = useState<CountryCode[]>([]); // Only for completeness, not displayed.
  const [remainingVotes, setRemainingVotes] = useState<CountryCode[]>([]);

  useEffect(() => {
    const yesVotes = votes
      .filter((vote) => vote.vote === "yes")
      .map((vote) => vote.country);
    const noVotes = votes
      .filter((vote) => vote.vote === "no")
      .map((vote) => vote.country);
    const abstainVotes = votes
      .filter((vote) => vote.vote === "abstain")
      .map((vote) => vote.country);
    const absentVotes = votes
      .filter((vote) => vote.vote === "absent")
      .map((vote) => vote.country);
    const remainingVotes = votingCountries.filter(
      (country) =>
        !yesVotes.includes(country) &&
        !noVotes.includes(country) &&
        !abstainVotes.includes(country) &&
        !absentVotes.includes(country),
    );

    setYesVotes(yesVotes);
    setNoVotes(noVotes);
    setAbstainVotes(abstainVotes);
    setAbsentVotes(absentVotes);
    setRemainingVotes(remainingVotes);
  }, [votes]);

  return (
    <>
      {substantiveVote ? (
        <div className="flex-1 grid grid-cols-3 gap-2">
          <VotesCard
            category={LL.participants.voting.votingButtons.IN_FAVOUR()}
            icon="plus-circle"
            color="text-green-700"
            votes={yesVotes}
            motionId={motionId}
          />
          <VotesCard
            category={LL.participants.voting.votingButtons.ABSTENTION()}
            icon="circle"
            color="text-primary"
            votes={abstainVotes}
            motionId={motionId}
          />
          <VotesCard
            category={LL.participants.voting.votingButtons.AGAINST()}
            icon="minus-circle"
            color="text-red-600"
            votes={noVotes}
            motionId={motionId}
          />
          {remainingVotes.length > 0 && (
            <VotesCard
              category={LL.participants.voting.votingButtons.REMAINING()}
              icon="hourglass-half"
              color="text-black"
              votes={remainingVotes}
              colSpan={3}
              motionId={motionId}
            />
          )}
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-2 gap-2">
          <VotesCard
            category="Dafür"
            icon="plus-circle"
            color="text-green-700"
            votes={yesVotes}
            motionId={motionId}
          />
          <VotesCard
            category="Dagegen"
            icon="minus-circle"
            color="text-red-600"
            votes={noVotes}
            motionId={motionId}
          />
          {remainingVotes.length > 0 && (
            <VotesCard
              category="Ausstehend"
              icon="hourglass-half"
              color="text-black dark:text-primary-700"
              votes={remainingVotes}
              colSpan={2}
              motionId={motionId}
            />
          )}
        </div>
      )}
    </>
  );
}

function VotesCard({
  motionId,
  category,
  icon,
  votes,
  color,
  colSpan,
}: {
  motionId: string;
  category: string;
  icon: string;
  votes: CountryCode[];
  color: string;
  colSpan?: number;
}) {
  const colSpanClass = colSpan ? `span ${colSpan}` : "span 1";

  const categoryClasses = `font-bold ${color}`;

  return (
    <div
      className="flex-1 h-full flex flex-col justify-start gap-3 bg-slate-50 dark:bg-primary-100 rounded-md p-2 transition-all duration-300 hover:shadow-sm"
      style={{ gridColumn: colSpanClass }}
    >
      <div className="flex justify-center items-center gap-3 text-lg">
        <FAIcon icon={icon} className={color} />
        <div className={categoryClasses}>{category}</div>
      </div>
      <AnimatePresence mode="wait">
        <FlipMove
          className="flex flex-wrap gap-2 justify-center items-center"
          leaveAnimation={false}
          enterAnimation={false}
        >
          {votes.map((country, index) => (
            <motion.div
              key={`${country}-${motionId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05, // Delay each flag's animation for a staggered effect
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className="flex justify-center items-center"
              style={{
                zIndex: votes.length - index, // Ensure the latest flag appears on top
              }}
            >
              <SmallFlag countryCode={country} showNameOnHover />
            </motion.div>
          ))}
        </FlipMove>
      </AnimatePresence>
    </div>
  );
}
