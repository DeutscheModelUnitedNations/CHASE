import React, { useState } from "react";
import type { CountryCode, Voting } from "@/custom_types/custom_types";
import { Button } from "primereact/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { AnimatePresence, motion } from "framer-motion";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used in the Voting Component.
 * It displays the buttons to cast a vote and handles the request to the backend, when a vote is cast.
 * It also displays a loading animation, while the request is being processed.
 */

export default function CastVote({
  substantiveVote,
}: Voting & { myCountry: CountryCode }) {
  const { LL } = useI18nContext();

  const [isLoading, setIsLoading] = useState(false);

  const castVote = (_: "yes" | "no" | "abstain") => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="my-4 shadow-xl rounded-md p-4 bg-white border border-secondary dark:bg-primary-100 flex justify-center items-center h-20  w-11/12 mr-3">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1 }}
              key={"loading"}
              className="flex justify-stretch items-center"
            >
              <FAIcon
                icon="circle-notch"
                className="text-primary animate-spin text-3xl"
              />
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"buttons"}
                className="flex justify-stretch items-center gap-4"
              >
                <Button
                  label={LL.participants.voting.votingButtons.IN_FAVOUR()}
                  style={{
                    backgroundColor: "var(--voting-for)",
                    color: "#fff",
                    borderColor: "var(--voting-for)",
                  }}
                  icon={<FAIcon icon="plus-circle" className="mr-3" />}
                  onClick={() => {
                    castVote("yes");
                  }}
                />
                {substantiveVote && (
                  <Button
                    label={LL.participants.voting.votingButtons.ABSTENTION()}
                    style={{
                      backgroundColor: "var(--voting-abstain)",
                      color: "#fff",
                      borderColor: "var(--voting-abstain)",
                    }}
                    icon={<FAIcon icon="circle" className="mr-3" />}
                    onClick={() => {
                      castVote("abstain");
                    }}
                  />
                )}
                <Button
                  label={LL.participants.voting.votingButtons.AGAINST()}
                  style={{
                    backgroundColor: "var(--voting-against)",
                    color: "#fff",
                    borderColor: "var(--voting-against)",
                  }}
                  icon={<FAIcon icon="minus-circle" className="mr-3" />}
                  onClick={() => {
                    castVote("no");
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
