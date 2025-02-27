import React, { useState } from "react";
import { Button } from "primereact/button";
import { AnimatePresence, motion } from "framer-motion";
import type { CountryCode, Voting } from "@/lib/types/types";
import FAIcon from "../FAIcon";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the Voting Component.
 * It displays the buttons to cast a vote and handles the request to the backend, when a vote is cast.
 * It also displays a loading animation, while the request is being processed.
 */

export default function CastVote({
  substantiveVote,
}: Voting & { myCountry: CountryCode }) {
  const [isLoading, setIsLoading] = useState(false);

  const castVote = (_: "yes" | "no" | "abstain") => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="border-secondary dark:bg-primary-100 my-4 mr-3 flex h-20 w-11/12 items-center justify-center rounded-md border bg-white p-4 shadow-xl">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1 }}
              key={"loading"}
              className="flex items-center justify-stretch"
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
                className="flex items-center justify-stretch gap-4"
              >
                <Button
                  label={m.inFavour()}
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
                    label={m.abstention()}
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
                  label={m.against()}
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
