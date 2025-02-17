"use client";
import React, { useState } from "react";
import Motions from "@/components/voting/motions";
import VotingArea from "@/components/voting/voting";
import { useI18nContext } from "@/i18n/i18n-react";
import { motionTestData, myCountry } from "@/test_data";
import type { Motion } from "@/custom_types/custom_types";
import { TabMenu } from "primereact/tabmenu";
import FAIcon from "@/components/font_awesome_icon";

type Tabs = "current-motions" | "recent-motions" | "recent-votings";

export default function VotingPage() {
  const { LL } = useI18nContext();

  const [openTab, setOpenTab] = useState<Tabs>("current-motions");
  const [data, _setData] = useState<Motion[]>(motionTestData);
  const [activeMotionId, setActiveMotionId] = useState<string | undefined>(
    data[0].motionId,
  );

  return (
    <>
      <div className="flex-1 p-4 gap-4 flex-col justify-start">
        <div className="flex-1">
          <TabMenu
            model={[
              {
                label: LL.participants.voting.ACTIVE_MOTIONS_TAB(),
                icon: <FAIcon icon="comment-exclamation" className="mr-2" />,
                command: () => {
                  setOpenTab("current-motions");
                },
              },
              {
                label: LL.participants.voting.RECENT_MOTIONS_TAB(),
                icon: <FAIcon icon="history" className="mr-2" />,
                command: () => {
                  setOpenTab("recent-motions");
                },
              },
              {
                label: LL.participants.voting.RECENT_VOTINGS_TAB(),
                icon: <FAIcon icon="poll-people" className="mr-2" />,
                command: () => {
                  setOpenTab("recent-votings");
                },
              },
            ]}
            className="mb-4"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-start">
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
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
          <div className="w-full lg:w-2/3 flex">
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
