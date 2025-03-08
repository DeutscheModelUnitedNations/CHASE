import React, { useState, useEffect, useContext } from "react";
import WidgetBoxTemplate from "../WidgetBoxTemplate";
import {
  SpeakersListDataContext,
  type SpeakersListDataType,
} from "@/lib/contexts/speakers_list_data";
import Timeline from "./timeline";
import Button from "../Button";
import { backend } from "@/lib/backend/clientsideBackend";
import * as m from "@/paraglide/messages";
import { NormalFlag } from "../Flag";
import getCountryNameByCode from "@/lib/get_country_name_by_code";

/**
 * This Component is used in the Speakers List and Comment List on the Speakers List Page.
 * It uses the Timeline Component to create a list of countries.
 * If no countries are in the list, it displays a message.
 * If the list is closed, it displays a border at the bottom, that indicates the closed state of the list.
 */

export default function QueueList({
  myCountry,
  chairOptions = false,
}: {
  myCountry?: string;
  chairOptions?: boolean;
}) {
  const speakersListData = useContext(SpeakersListDataContext);

  return (
    <>
      <div className="mt-3 flex flex-col">
        <Timeline
          list={speakersListData?.speakers ?? []}
          content={(item) => {
            return (
              <CountryCard
                speakerData={item}
                myCountry={myCountry}
                chairOptions={chairOptions}
                isLast={
                  speakersListData?.speakers &&
                  item.id ===
                    speakersListData.speakers[
                      speakersListData.speakers.length - 1
                    ].id
                }
                isFirst={
                  speakersListData?.speakers &&
                  item.id === speakersListData.speakers[1].id
                }
              />
            );
          }}
        />
        {speakersListData?.isClosed && (
          <div className="mt-3 flex items-center justify-stretch gap-3">
            <div className="border-gray-text flex-1 border" />
            <div className="text-gray-text text-sm font-bold">
              {m.listClosed()}
            </div>
            <div className="border-gray-text flex-1 border" />
          </div>
        )}
      </div>
    </>
  );
}

function CountryCard({
  speakerData,
  myCountry,
  chairOptions = false,
  isLast,
  isFirst,
}: {
  speakerData: NonNullable<SpeakersListDataType>["speakers"][number];
  myCountry?: string;
  chairOptions?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const listId = useContext(SpeakersListDataContext)?.id;

  const [alpha3Code, setAlpha3Code] = useState<string | undefined>(undefined);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!speakerData?.committeeMember?.delegation?.nation.alpha3Code) return;
    setAlpha3Code(speakerData.committeeMember.delegation.nation.alpha3Code);
  }, [speakerData]);

  return (
    <WidgetBoxTemplate
      highlight={alpha3Code === myCountry}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center justify-start gap-4">
          <NormalFlag countryCode={alpha3Code} />
          <div className="truncate text-sm font-bold dark:text-primary-800">
            {alpha3Code && getCountryNameByCode(alpha3Code)}
          </div>
        </div>
        {chairOptions && (
          <div className="flex">
            {isHovering && (
              <>
                {!isFirst && (
                  <Button
                    faIcon="chevron-double-up"
                    onClick={async () => {
                      if (!listId) return;
                      await backend
                        .speakersList({ speakersListId: listId })
                        .moveSpeaker({ speakerId: speakerData.id })
                        .toTheTop.post();
                    }}
                    text
                    size="small"
                  />
                )}
                <Button
                  faIcon="chevron-up"
                  onClick={async () => {
                    if (!listId) return;
                    await backend
                      .speakersList({ speakersListId: listId })
                      .moveSpeaker({ speakerId: speakerData.id })
                      .up.post();
                  }}
                  text
                  size="small"
                />
                <Button
                  faIcon="chevron-down"
                  onClick={async () => {
                    if (!listId) return;
                    await backend
                      .speakersList({ speakersListId: listId })
                      .moveSpeaker({ speakerId: speakerData.id })
                      .down.post();
                  }}
                  text
                  size="small"
                  disabled={isLast}
                />
              </>
            )}
            <Button
              faIcon="xmark"
              onClick={async () => {
                if (!listId) return;
                setLoadingDelete(true);
                await backend
                  .speakersList({ speakersListId: listId })
                  .removeSpeaker({ speakerId: speakerData.id })
                  .delete();
              }}
              text
              size="small"
              severity="danger"
              loading={loadingDelete}
            />
          </div>
        )}
      </div>
    </WidgetBoxTemplate>
  );
}
