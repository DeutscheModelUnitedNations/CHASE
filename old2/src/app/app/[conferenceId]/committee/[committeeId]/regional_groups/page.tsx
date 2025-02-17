"use client";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useBackendCall } from "@/hooks/useBackendCall";
import regionalGroups from "@/data/regional_groups.json";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { alpha3ToAlpha2 } from "@/misc/countryCodeUtils";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { NormalFlag } from "@/components/flag_templates";
import { AnimatePresence, motion } from "framer-motion";
import WorldMap from "react-svg-worldmap";
import useMousetrap from "mousetrap-react";

export default function RegionalGroups() {
  const { LL, locale } = useI18nContext();
  const { backend } = useBackend();

  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const [presentDelegations] = useBackendCall(
    // TODO
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
    africa: LL.chairs.dashboard.configurations.regionalGroups.AFRICA(),
    asia: LL.chairs.dashboard.configurations.regionalGroups.ASIA(),
    america: LL.chairs.dashboard.configurations.regionalGroups.LATIN_AMERICA(),
    eastern_europe:
      LL.chairs.dashboard.configurations.regionalGroups.EASTERN_EUROPE(),
    western_europe:
      LL.chairs.dashboard.configurations.regionalGroups.WESTERN_EUROPE(),
  };

  const checkInRegionalGroup = (alpha3Code: string, group: any) => {
    try {
      return (regionalGroups as any)[group].includes(alpha3ToAlpha2(alpha3Code));
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
        className="p-10 bg-primary-950 rounded-lg flex flex-col items-center absolute top-6 left-6 bottom-6 right-6"
        key={group}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h2 className="font-bold text-5xl">{groupName}</h2>
        <div className="flex flex-wrap gap-2 mt-10 max-h-[70vh] justify-center items-center">
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
                getCountryNameByCode(a.nation.alpha3Code, locale).localeCompare(
                  getCountryNameByCode(b.nation.alpha3Code, locale),
                ),
              )
              .map((delegation) => (
                <div
                  key={delegation.id}
                  className="bg-primary-900 rounded-lg p-4 flex gap-4 items-center"
                >
                  <NormalFlag countryCode={delegation.nation.alpha3Code} />
                  <div className="text-xl font-bold">
                    {getCountryNameByCode(delegation.nation.alpha3Code, locale)}
                  </div>
                </div>
              ))
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center p-10 relative h-screen">
      {Object.keys(groupNames).map((group) => (
        <AnimatePresence key={group}>
          {(currentGroupIndex === Object.keys(groupNames).indexOf(group) * 2 ||
            currentGroupIndex ===
              Object.keys(groupNames).indexOf(group) * 2 + 1) && (
            <Group key={group} group={group} groupName={(groupNames as any)[group]} />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
