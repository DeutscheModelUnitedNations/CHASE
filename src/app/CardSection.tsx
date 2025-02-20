"use client"
import Card from "./Card";
import * as m from "@/paraglide/messages";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function CardSection() {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-stretch justify-stretch gap-4 p-8 lg:flex-row">
        <Motion delay={0.2}>
          <Card
            src="/undraw/candidate.svg"
            alt="Debate"
            header={m.debates()}
            text={m.debatesText()}
          />
        </Motion>
        <Motion delay={0.4}>
          <Card
            src="/undraw/voting.svg"
            alt="Voting"
            header={m.votes()}
            text={m.votesText()}
            comingSoonRibbon
          />
        </Motion>
        <Motion delay={0.6}>
          <Card
            src="/undraw/team_collaboration.svg"
            alt="Resolutions"
            header={m.resolutions()}
            text={m.resolutionsText()}
            comingSoonRibbon
          />
        </Motion>
      </div>
    </>
  );
}

function Motion({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 1,
        type: "spring",
        delay: delay + 1,
        damping: 20,
        stiffness: 100,
      }}
      className="relative flex-1"
    >
      {children}
    </motion.div>
  );
}
