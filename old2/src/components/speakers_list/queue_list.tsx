import React, { useState, useEffect, useContext } from "react";
import Timeline from "@components/speakers_list/timeline";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import WidgetBoxTemplate from "../widget_box_template";
import { NormalFlag as Flag } from "@components/flag_templates";
import { useI18nContext } from "@/i18n/i18n-react";
import Button from "@components/button";
import { useBackend } from "@/contexts/backend";
import {
  SpeakersListDataContext,
  type SpeakersListDataType,
} from "@/contexts/speakers_list_data";

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
  const { LL } = useI18nContext();

  const speakersListData = useContext(SpeakersListDataContext);

  return (
    <>
      <div className="flex flex-col mt-3">
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
          <div className="flex justify-stretch items-center gap-3 mt-3">
            <div className="flex-1 border border-gray-text" />
            <div className="text-sm font-bold text-gray-text">
              {LL.participants.speakersList.LIST_CLOSED_MESSAGE()}
            </div>
            <div className="flex-1 border border-gray-text" />
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
  const { locale } = useI18nContext();
  const { backend } = useBackend();

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
      <div className="w-full flex justify-between items-center gap-2">
        <div className="flex items-center justify-start gap-4">
          <Flag countryCode={alpha3Code} />
          <div className="text-sm font-bold dark:text-primary-800 truncate">
            {alpha3Code && getCountryNameByCode(alpha3Code, locale)}
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
