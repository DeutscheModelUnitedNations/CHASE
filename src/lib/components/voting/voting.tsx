import React, { useEffect, useState } from "react";
import WidgetTemplate from "../WidgetTemplate";
import NoDataPlaceholder from "../NoDataPlaceholder";
import { ScrollPanel } from "primereact/scrollpanel";
import FlipMove from "react-flip-move";
import type { CountryCode, Voting } from "@/lib/types/types";
import * as m from "@/paraglide/messages";
import InformationSection from "./information_section";
import VotingBar from "./voting_bar";
import CountryGrid from "./country_grid";
import Button from "../Button";
import CastVote from "./cast_vote";
import WaitingForResults from "./waiting_for_results";

/**
 * This Component is the main Component of the Voting Area. It combines several other
 * Components like the InformationSection, the VotingBar, the CastVote Component, the CountryGrid, the Outcome
 * Component, and the WaitingForResults Component.
 * It also handles all the logic for the display of the different Components.
 * For example, it checks if the user's country is voting, if the user's country has already voted, and if the voting
 * is still ongoing. Based on these checks, it decides which Component to display.
 */

export default function VotingArea({
  votingData,
  myCountry,
  chairOptions = false,
}: {
  votingData: Voting | undefined;
  myCountry?: CountryCode;
  chairOptions?: boolean;
}) {
  const [myCountryIsVoting, setMyCountryIsVoting] = useState<boolean>(false);
  const [myCountryHasVoted, setMyCountryHasVoted] = useState<boolean>(false);

  useEffect(() => {
    if (votingData) {
      if (!myCountry) {
        setMyCountryIsVoting(false);
        setMyCountryHasVoted(false);
        return;
      }
      setMyCountryIsVoting(votingData.votingCountries.includes(myCountry));

      const myVote = votingData.votes.find(
        (vote) => vote.country === myCountry,
      )?.vote;
      setMyCountryHasVoted(!!myVote);
    }
  }, [votingData]);

  return (
    <>
      <WidgetTemplate cardTitle="">
        {!votingData ? (
          <NoDataPlaceholder title={m.noVoteSelected()} />
        ) : (
          <div className="flex flex-col gap-4">
            <ScrollPanel
              className="custom-scrollbar w-full overflow-x-hidden overflow-y-auto"
              style={{ height: "80vh" }}
            >
              <FlipMove duration={1000} className="flex flex-col gap-2">
                <div key="Header">
                  <InformationSection {...votingData} />
                </div>
                <div key="Bar">
                  <VotingBar {...votingData} />
                </div>
                <div key="Grid">
                  <CountryGrid {...votingData} />
                  {
                    votingData &&
                      myCountry &&
                      ((myCountryIsVoting && !myCountryHasVoted) ||
                        (myCountryHasVoted && !votingData.outcome)) && (
                        <div className="h-24" />
                      ) // This is a hack to make the last element visible
                  }
                  {chairOptions && (
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                      <Button
                        label={m.changeInfo()}
                        faIcon="memo-circle-info"
                        onClick={() => {}}
                      />
                      <Button
                        label={m.restartVote()}
                        faIcon="undo"
                        onClick={() => {}}
                        severity="warning"
                      />
                      <Button
                        label={m.deleteVote()}
                        faIcon="trash-alt"
                        onClick={() => {}}
                        severity="danger"
                      />
                    </div>
                  )}
                </div>
              </FlipMove>
            </ScrollPanel>
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
              <div className="absolute bottom-0 left-0 flex w-full items-center justify-center">
                {votingData &&
                  myCountry &&
                  ((myCountryIsVoting && !myCountryHasVoted && (
                    <CastVote myCountry={myCountry} {...votingData} />
                  )) ||
                    (myCountryHasVoted && !votingData.outcome && (
                      <WaitingForResults />
                    )))}
              </div>
            </div>
          </div>
        )}
      </WidgetTemplate>
    </>
  );
}
