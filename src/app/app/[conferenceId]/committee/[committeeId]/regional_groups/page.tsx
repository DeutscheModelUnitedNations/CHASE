"use client";
import React, { useState, useEffect, useContext } from "react";
import countrieData, { Countries } from "world-countries";
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
import { NormalFlag } from "@/lib/components/Flag";
import getCountryNameByCode from "@/lib/get_country_name_by_code";

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
        .committee({ committeeId: committeeId! })
        .delegations.get(),
    false,
  );

  const groups: Exclude<Countries[0]["unRegionalGroup"], "">[] = [
    "African Group",
    "Asia and the Pacific Group",
    "Latin American and Caribbean Group",
    "Eastern European Group",
    "Western European and Others Group",
  ];

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

  const groupNames: Record<
    Exclude<Countries[0]["unRegionalGroup"], "">,
    string
  > = {
    "African Group": m.africa(),
    "Asia and the Pacific Group": m.asiaAndOceania(),
    "Latin American and Caribbean Group": m.latinAmericaAndCaribbean(),
    "Eastern European Group": m.easternEurope(),
    "Western European and Others Group": m.westernEuropeAndOthers(),
  };

  const checkInRegionalGroup = (
    alpha3Code: string,
    group: Countries[0]["unRegionalGroup"],
  ) => {
    const country = countrieData.find(
      (country) => country.cca3.toUpperCase() === alpha3Code.toUpperCase(),
    );
    if (!country) {
      return false;
    }

    switch (group) {
      case "African Group":
        return country.unRegionalGroup === "African Group";
      case "Asia and the Pacific Group":
        return country.unRegionalGroup === "Asia and the Pacific Group";
      case "Latin American and Caribbean Group":
        return country.unRegionalGroup === "Latin American and Caribbean Group";
      case "Eastern European Group":
        return country.unRegionalGroup === "Eastern European Group";
      case "Western European and Others Group":
        return country.unRegionalGroup === "Western European and Others Group";
    }
  };

  const getMapColor = (group: Countries[0]["unRegionalGroup"]) => {
    switch (group) {
      case "African Group":
        return "#FF0000";
      case "Asia and the Pacific Group":
        return "#008800";
      case "Latin American and Caribbean Group":
        return "#0000FF";
      case "Eastern European Group":
        return "#FF8800";
      case "Western European and Others Group":
        return "#8800FF";
    }
  };

  function Group({
    group,
    groupName,
  }: {
    group: Countries[0]["unRegionalGroup"];
    groupName: string;
  }) {
    return (
      <motion.div
        className="absolute top-6 right-6 bottom-6 left-6 flex flex-col items-center rounded-lg p-10"
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
                        country: delegation.nation.alpha2Code,
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
                getCountryNameByCode(a.nation.alpha3Code).localeCompare(
                  getCountryNameByCode(b.nation.alpha3Code),
                ),
              )
              .map((delegation) => (
                <div
                  key={delegation.id}
                  className="flex items-center gap-4 rounded-lg bg-primary-900 p-4"
                >
                  <NormalFlag countryCode={delegation.nation.alpha3Code} />
                  <div className="text-xl font-bold">
                    {getCountryNameByCode(delegation.nation.alpha3Code)}
                  </div>
                </div>
              ))
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start p-10">
      {groups.map((group) => (
        <AnimatePresence key={group}>
          {(currentGroupIndex === groups.indexOf(group) * 2 ||
            currentGroupIndex === groups.indexOf(group) * 2 + 1) && (
            <Group key={group} group={group} groupName={groupNames[group]} />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
