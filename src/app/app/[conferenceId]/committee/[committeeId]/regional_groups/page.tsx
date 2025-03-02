"use client";
import React, { useState, useEffect, useContext } from "react";
import regionalGroups from "@/lib/data/regional_groups.json";
import { AnimatePresence, motion } from "framer-motion";
import useMousetrap from "mousetrap-react";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";
import * as m from "@/paraglide/messages";
import { alpha3ToAlpha2 } from "@/lib/countryCodeUtils";
import WorldMap from "react-svg-worldmap";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import { NormalFlag } from "@/lib/components/Flag";

export default function RegionalGroups() {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const { value: presentDelegations } = useClientSideBackendCall(
    (backend) =>
      backend
        // biome-ignore lint/style/noNonNullAssertion:
        .conference({ conferenceId: conferenceId! })
        // biome-ignore lint/style/noNonNullAssertion:
        .committee({ committeeId: committeeId! }).delegations.get,
    false,
  );

  useMousetrap(["left", "down"], () => {
    setCurrentGroupIndex((prev) =>
      prev === 0 ? Object.keys(groupNames).length * 2 - 1 : prev - 1,
    );
  });

  useMousetrap(["right", "up"], () => {
    setCurrentGroupIndex((prev) =>
      prev === Object.keys(groupNames).length * 2 - 1 ? 0 : prev + 1,
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupIndex((prev) =>
        prev === Object.keys(groupNames).length * 2 - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const groupNames = {
    africa: m.africa(),
    asia: m.asiaAndOceania(),
    america: m.latinAmericaAndCaribbean(),
    eastern_europe:
      m.easternEurope(),
    western_europe:
      m.westernEuropeAndOthers(),
  };

  const checkInRegionalGroup = (alpha3Code: string, group: any) => {
    try {
      return (regionalGroups as any)[group].includes(
        alpha3ToAlpha2(alpha3Code),
      );
    } catch {
      return false;
    }
  };

  const getMapColor = (group: string) => {
    switch (group) {
      case "africa":
        return "#FF0000";
      case "asia":
        return "#008800";
      case "america":
        return "#0000FF";
      case "eastern_europe":
        return "#FF8800";
      case "western_europe":
        return "#8800FF";
    }
  };

  function Group({ group, groupName }: { group: string; groupName: string }) {
    return (
      <motion.div
        className="absolute top-6 right-6 bottom-6 left-6 flex flex-col items-center rounded-lg bg-primary-950 p-10"
        key={group}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="text-5xl font-bold">{groupName}</h2>
        <div className="mt-10 flex max-h-[70vh] flex-wrap items-center justify-center gap-2">
          {currentGroupIndex % 2 === 0 ? (
            <WorldMap
              color={getMapColor(group)}
              size="responsive"
              frame={false}
              strokeOpacity={1}
              backgroundColor="transparent"
              data={
                presentDelegations
                  ? presentDelegations
                      .filter((delegation) =>
                        checkInRegionalGroup(
                          delegation.nation.alpha3Code,
                          group,
                        ),
                      )
                      .map((delegation) => ({
                        country: alpha3ToAlpha2(delegation.nation.alpha3Code),
                        value: 100,
                      }))
                  : []
              }
            />
          ) : (
            presentDelegations
              ?.filter((delegation) =>
                checkInRegionalGroup(delegation.nation.alpha3Code, group),
              )
              .sort((a, b) =>
                getFullTranslatedCountryNameFromISO3Code(a.nation.alpha3Code).localeCompare(
                  getFullTranslatedCountryNameFromISO3Code(b.nation.alpha3Code),
                ),
              )
              .map((delegation) => (
                <div
                  key={delegation.id}
                  className="flex items-center gap-4 rounded-lg bg-primary-900 p-4"
                >
                  <NormalFlag countryCode={delegation.nation.alpha3Code} />
                  <div className="text-xl font-bold">
                    {getFullTranslatedCountryNameFromISO3Code(delegation.nation.alpha3Code)}
                  </div>
                </div>
              ))
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-start p-10">
      {Object.keys(groupNames).map((group) => (
        <AnimatePresence key={group}>
          {(currentGroupIndex === Object.keys(groupNames).indexOf(group) * 2 ||
            currentGroupIndex ===
              Object.keys(groupNames).indexOf(group) * 2 + 1) && (
            <Group
              key={group}
              group={group}
              groupName={(groupNames as any)[group]}
            />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
