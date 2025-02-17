import React, { useEffect, useState } from "react";
import WidgetTemplate from "../widget_template";
import NoDataPlaceholder from "../no_data_placeholder";
import type { CountryCode, Voting } from "@/custom_types/custom_types";
import VotingBar from "@components/voting/voting_bar";
import CastVote from "@components/voting/cast_vote";
import CountryGrid from "@components/voting/country_grid";
import { ScrollPanel } from "primereact/scrollpanel";
import InformationSection from "@/components/voting/information_section";
import WaitingForResults from "@components/voting/waiting_for_results";
import { useI18nContext } from "@/i18n/i18n-react";
import FlipMove from "react-flip-move";
import Button from "@/components/button";

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
  const { LL } = useI18nContext();
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
          <NoDataPlaceholder title={LL.participants.voting.NO_DATA_VOTING()} />
        ) : (
          <div className="flex flex-col gap-4">
            <ScrollPanel
              className="w-full overflow-y-auto overflow-x-hidden custom-scrollbar"
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
                    <>
                      <div className="flex justify-center items-center gap-2 flex-wrap mt-5">
                        <Button
                          label={LL.chairs.voting.BUTTON_CHANGE_INFO()}
                          faIcon="memo-circle-info"
                          onClick={() => {}}
                        />
                        <Button
                          label={LL.chairs.voting.BUTTON_RESET()}
                          faIcon="undo"
                          onClick={() => {}}
                          severity="warning"
                        />
                        <Button
                          label={LL.chairs.voting.BUTTON_DELETE()}
                          faIcon="trash-alt"
                          onClick={() => {}}
                          severity="danger"
                        />
                      </div>
                    </>
                  )}
                </div>
              </FlipMove>
            </ScrollPanel>
            <div className="relative h-full w-full flex flex-col justify-center items-center z-10">
              <div className="absolute bottom-0 left-0 flex justify-center items-center w-full">
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
