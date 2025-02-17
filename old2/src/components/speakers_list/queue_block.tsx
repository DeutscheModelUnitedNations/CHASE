import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { SmallFlag as Flag } from "@components/flag_templates";
import { AnimatePresence, motion } from "framer-motion";
import { SpeakersListDataContext } from "@/contexts/speakers_list_data";
import { MyDelegationContext } from "@/contexts/user_ident";

/**
 * This Component is used in the Speakers List Widget on the Dashboard.
 * It is a condensed view of a general Speakers List, that allows a compact view of the speakers list.
 * It shows the first 3 speakers in the queue and the country of the user, if they are in the queue.
 * It also shows the position of the user in the queue, if they are more than 3 speakers away from speaking.
 * It uses the Arrow Component to show the arrows between the flags.
 * It uses the Flag Component to show the flags.
 */

export default function SpeakerBlock() {
  const rawSpeakersList = useContext(SpeakersListDataContext)?.speakers;
  const [speakersList, setSpeakersList] = useState<typeof rawSpeakersList>([]);
  const myCountry =
    useContext(MyDelegationContext)?.delegation?.nation?.alpha3Code;
  const [compressedList, setCompressedList] = useState<
    NonNullable<typeof speakersList>
  >([]);

  function getAlpha3Code(
    listElement?: NonNullable<typeof speakersList>[number],
  ) {
    if (listElement?.committeeMember?.delegation?.nation?.alpha3Code) {
      return listElement.committeeMember.delegation.nation.alpha3Code;
    }
    return "";
  }

  function getCompressedList(list: typeof speakersList) {
    if (!list?.length) {
      return [];
    }

    let res: typeof list = [];

    if (list.length > 3) {
      res = list.slice(0, 3);
    } else {
      res = list;
    }

    const myCountryItem = list.find(
      (item) => getAlpha3Code(item) === myCountry,
    );
    if (!myCountryItem) {
      return res;
    }
    const myCountryIndex = list.indexOf(myCountryItem);

    if (myCountryIndex < 2) {
      res = list.slice(0, 3);
    } else {
      res = list.slice(0, 2);
      res.push(myCountryItem);
    }

    return res;
  }

  function getWaitingPosition() {
    if (!speakersList) return 0;

    const index = speakersList.find(
      (item) => getAlpha3Code(item) === myCountry,
    );
    return index ? speakersList.indexOf(index) + 1 : 0;
  }

  useEffect(() => {
    if (!rawSpeakersList) return;
    setSpeakersList(rawSpeakersList);
  }, [rawSpeakersList]);

  useEffect(() => {
    if (!speakersList) return;
    setCompressedList(getCompressedList(speakersList.slice(1)));
  }, [speakersList]);

  return (
    compressedList && (
      <AnimatePresence mode="wait">
        <motion.div
          key={getAlpha3Code(speakersList?.[0])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <div className="flex gap-1">
            {compressedList.length > 0 && (
              <>
                <Arrow arrowName="top" />
                <Flag
                  countryCode={getAlpha3Code(compressedList[0])}
                  showNameOnHover
                />
              </>
            )}
            {compressedList.length > 1 && (
              <>
                <Arrow arrowName="solid" />
                <Flag
                  countryCode={getAlpha3Code(compressedList[1])}
                  showNameOnHover
                />
              </>
            )}
            {getWaitingPosition() <= 3 ? (
              compressedList.length > 2 && (
                <>
                  <Arrow arrowName="solid" />
                  <Flag
                    countryCode={getAlpha3Code(compressedList[2])}
                    showNameOnHover
                  />
                </>
              )
            ) : (
              <>
                <Arrow arrowName="dashed" />
                <div className="self-center px-2 py-1 bg-primary text-white rounded-md">
                  <div className="text-sm font-bold">
                    {getWaitingPosition() - 3}
                  </div>
                </div>
                <Arrow arrowName="dashed" />
                <Flag
                  countryCode={getAlpha3Code(compressedList[2])}
                  showNameOnHover
                />
              </>
            )}
            {compressedList?.length > 3 &&
              (getWaitingPosition() < compressedList?.length ||
                getWaitingPosition() === 0) && (
                <>
                  <Arrow arrowName="dashed" />
                  <div className="self-center px-2 py-1 bg-primary text-white rounded-md">
                    <div className="text-sm font-bold">
                      {getWaitingPosition() === 0
                        ? compressedList.length - 3
                        : compressedList.length - getWaitingPosition()}
                    </div>
                  </div>
                </>
              )}
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
}

function Arrow({ arrowName }: { arrowName: string }) {
  return (
    <div className="flex flex-col justify-center">
      <Image
        src={`/misc/flag_arrows/${arrowName}.png`}
        width={20}
        height={15}
        alt="arrow"
        style={{ objectFit: "contain", height: "100%" }}
      />
    </div>
  );
}
