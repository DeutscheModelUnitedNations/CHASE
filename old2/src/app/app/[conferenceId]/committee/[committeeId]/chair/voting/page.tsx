"use client";
import React, { useState } from "react";
import Motions from "@/components/voting/motions";
import VotingArea from "@/components/voting/voting";
import { useI18nContext } from "@/i18n/i18n-react";
import { motionTestData } from "@/test_data";
import type { Motion } from "@/custom_types/custom_types";
import { TabMenu } from "primereact/tabmenu";
import { SplitButton } from "primereact/splitbutton";
import FAIcon from "@/components/font_awesome_icon";

type Tabs = "current-motions" | "recent-motions" | "recent-votings";

export default function ChairVoting() {
  const { LL } = useI18nContext();

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
                icon: <FAIcon icon="clock-rotate-left" className="mr-2" />,
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
          <div className="w-full flex flex-col gap-4">
            {openTab === "current-motions" && (
              <>
                <SplitButton
                  label={LL.chairs.voting.BUTTON_NEW_MOTION()}
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
          <div className="w-full flex">
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
