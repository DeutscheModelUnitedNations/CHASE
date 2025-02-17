import type React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Card from "@components/home/card";
import { motion } from "framer-motion";

export default function CardSection() {
  const { LL } = useI18nContext();

  return (
    <>
      <div className="flex-1 flex flex-col lg:flex-row w-full justify-stretch items-stretch p-8 gap-4">
        <Motion delay={0.2}>
          <Card
            src="/undraw/candidate.svg"
            alt="Debate"
            header={LL.home.heroCards.CARD_1_TITLE()}
            text={LL.home.heroCards.CARD_1_TEXT()}
          />
        </Motion>
        <Motion delay={0.4}>
          <Card
            src="/undraw/voting.svg"
            alt="Debate"
            header={LL.home.heroCards.CARD_2_TITLE()}
            text={LL.home.heroCards.CARD_2_TEXT()}
            comingSoonRibbon
          />
        </Motion>
        <Motion delay={0.6}>
          <Card
            src="/undraw/team_collaboration.svg"
            alt="Debate"
            header={LL.home.heroCards.CARD_3_TITLE()}
            text={LL.home.heroCards.CARD_3_TEXT()}
            comingSoonRibbon
          />
        </Motion>
      </div>
    </>
  );
}

function Motion({
  delay,
  children,
}: {
  delay: number;
  children: React.ReactNode;
}) {
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
      className="flex-1 relative"
    >
      {children}
    </motion.div>
  );
}
