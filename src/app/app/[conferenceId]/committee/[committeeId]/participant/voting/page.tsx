"use client";
import React, { useState } from "react";
import Motions from "@/lib/components/voting/motions";
import VotingArea from "@/lib/components/voting/voting";
import { TabMenu } from "primereact/tabmenu";
import type { Motion } from "@/lib/types/types";
import { motionTestData, myCountry } from "@/lib/test_data";
import FAIcon from "@/lib/components/FAIcon";
import * as m from "@/paraglide/messages";

type Tabs = "current-motions" | "recent-motions" | "recent-votings";

export default function VotingPage() {
  const [openTab, setOpenTab] = useState<Tabs>("current-motions");
  const [data, _setData] = useState<Motion[]>(motionTestData);
  const [activeMotionId, setActiveMotionId] = useState<string | undefined>(
    data[0].motionId,
  );

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
                icon: <FAIcon icon="history" className="mr-2" />,
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
          <div className="flex w-full flex-col gap-4 lg:w-1/3">
            {openTab === "current-motions" && (
              <Motions
                motionData={motionTestData.filter(
                  (motion: Motion) =>
                    motion.status === "open" || motion.status === "in-voting",
                )}
                highlightedMotionId={activeMotionId}
                setActiveMotion={setActiveMotionId}
              />
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
              />
            )}
          </div>
          <div className="flex w-full lg:w-2/3">
            <VotingArea
              votingData={
                data.find((motion) => motion.motionId === activeMotionId)
                  ?.voting
              }
              myCountry={myCountry}
            />
          </div>
        </div>
      </div>
    </>
  );
}
