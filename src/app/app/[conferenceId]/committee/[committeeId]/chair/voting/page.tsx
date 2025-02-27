"use client";
import React, { useState } from "react";
import Motions from "@/lib/components/voting/motions";
import VotingArea from "@/lib/components/voting/voting";
import { TabMenu } from "primereact/tabmenu";
import { SplitButton } from "primereact/splitbutton";
import type { Motion } from "@/lib/types/types";
import { motionTestData } from "@/lib/test_data";
import * as m from "@/paraglide/messages";
import FAIcon from "@/lib/components/FAIcon";

type Tabs = "current-motions" | "recent-motions" | "recent-votings";

export default function ChairVoting() {

  const [openTab, setOpenTab] = useState<Tabs>("current-motions");
  const [data, _] = useState<Motion[]>(motionTestData);
  const [activeMotionId, setActiveMotionId] = useState<string | undefined>(
    data[0].motionId,
  );

  // TODO: Add dialog for creating a new motion
  // TODO: Add dialog for creating a new voting out of a motion
  // TODO: Add dialog for changing the information of a voting

  return (
    <>
      <div className="flex-1 flex-col justify-start gap-4 p-4">
        <div className="flex-1">
          <TabMenu
            model={[
              {
                label: m.currentApplications(),
                icon: <FAIcon icon="comment-exclamation" className="mr-2" />,
                command: () => {
                  setOpenTab("current-motions");
                },
              },
              {
                label: m.pastApplications(),
                icon: <FAIcon icon="clock-rotate-left" className="mr-2" />,
                command: () => {
                  setOpenTab("recent-motions");
                },
              },
              {
                label: m.pastVotes(),
                icon: <FAIcon icon="poll-people" className="mr-2" />,
                command: () => {
                  setOpenTab("recent-votings");
                },
              },
            ]}
            className="mb-4"
          />
        </div>
        <div className="flex flex-col justify-start gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-4">
            {openTab === "current-motions" && (
              <>
                <SplitButton
                  label={m.newMotion()}
                  icon={<FAIcon icon="comment-exclamation" className="mr-2" />}
                  className="w-full"
                  onClick={() => {}}
                  model={[]}
                />
                <Motions
                  motionData={motionTestData.filter(
                    (motion: Motion) =>
                      motion.status === "open" || motion.status === "in-voting",
                  )}
                  highlightedMotionId={activeMotionId}
                  setActiveMotion={setActiveMotionId}
                  chairOptions
                />
              </>
            )}
            {openTab === "recent-motions" && (
              <Motions
                motionData={motionTestData.filter(
                  (motion: Motion) =>
                    (motion.status === "passed" ||
                      motion.status === "failed") &&
                    motion.introducedBy !== "uno", // The introduced by filters all chair sind motions/votings (like a resolution voting shouldn't appear in the "Recent Motions" Tab)
                )}
                highlightedMotionId={activeMotionId}
                setActiveMotion={setActiveMotionId}
                chairOptions
              />
            )}
            {openTab === "recent-votings" && (
              <Motions
                motionData={motionTestData.filter(
                  (motion: Motion) =>
                    (motion.status === "passed" ||
                      motion.status === "failed") &&
                    motion.voting !== undefined,
                )}
                highlightedMotionId={activeMotionId}
                setActiveMotion={setActiveMotionId}
                chairOptions
              />
            )}
          </div>
          <div className="flex w-full">
            <VotingArea
              votingData={
                data.find((motion) => motion.motionId === activeMotionId)
                  ?.voting
              }
              chairOptions
            />
          </div>
        </div>
      </div>
    </>
  );
}
