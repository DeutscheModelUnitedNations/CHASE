"use client";
import React, { useContext, useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import SpeakersListBlock from "@/lib/components/speakers_list/speakers_list_block";
import { ChairSpeechButtons } from "@/lib/components/speakers_list/speech_buttons";
import { $Enums } from "@prisma/client";
import NoDataPlaceholder from "@/lib/components/NoDataPlaceholder";
import { CommitteeDataContext } from "@/lib/contexts/committee_data";
import * as m from "@/paraglide/messages";

export default function ChairSpeakersList() {
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
      <ScrollPanel className="custom-scrollbar flex-1 overflow-y-auto">
        {anAgendaItemIsActive ? (
          <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:flex-row">
            <SpeakersListBlock
              typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
              listTitle={m.speakersList()}
              chairOptions={true}
            >
              <ChairSpeechButtons
                typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
              />
            </SpeakersListBlock>
            <SpeakersListBlock
              typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
              listTitle={m.questionsAndComments()}
              chairOptions={true}
            >
              <ChairSpeechButtons
                typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
              />
            </SpeakersListBlock>
          </div>
        ) : (
          <NoDataPlaceholder title={m.noActiveAgendaItem()} />
        )}
      </ScrollPanel>
    </>
  );
}
