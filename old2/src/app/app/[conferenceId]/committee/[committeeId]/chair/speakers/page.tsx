"use client";
import React, { useContext, useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { useI18nContext } from "@/i18n/i18n-react";
import SpeakersListBlock from "@/components/speakers_list/speakers_list_block";
import { ChairSpeechButtons } from "@/components/speakers_list/speech_buttons";
import { $Enums } from "@prisma/generated/client";
import { CommitteeDataContext } from "@/contexts/committee_data";
import NoDataPlaceholder from "@/components/no_data_placeholder";

export default function ChairSpeakersList() {
  const { LL } = useI18nContext();

  const committeeData = useContext(CommitteeDataContext);
  const [anAgendaItemIsActive, setAnAgendaItemIsActive] = useState(false);

  useEffect(() => {
    if (!committeeData) return;
    const activeAgendaItem = committeeData.agendaItems.find(
      (agendaItem) => agendaItem.isActive,
    );
    setAnAgendaItemIsActive(!!activeAgendaItem);
  }, [committeeData]);

  return (
    <>
      <ScrollPanel className="flex-1 overflow-y-auto custom-scrollbar">
        {anAgendaItemIsActive ? (
          <div className="flex-1 flex h-full p-4 gap-4 flex-col lg:flex-row">
            <SpeakersListBlock
              typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
              listTitle={LL.participants.speakersList.SPEAKERS_LIST()}
              chairOptions={true}
            >
              <ChairSpeechButtons
                typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
              />
            </SpeakersListBlock>
            <SpeakersListBlock
              typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
              listTitle={LL.participants.speakersList.COMMENT_LIST()}
              chairOptions={true}
            >
              <ChairSpeechButtons
                typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
              />
            </SpeakersListBlock>
          </div>
        ) : (
          <NoDataPlaceholder
            title={LL.participants.speakersList.NO_ACTIVE_AGENDA_ITEM()}
          />
        )}
      </ScrollPanel>
    </>
  );
}
