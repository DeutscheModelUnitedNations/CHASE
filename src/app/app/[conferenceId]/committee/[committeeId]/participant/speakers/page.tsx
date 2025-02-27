"use client";
import React, { useContext, useEffect, useState } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import SpeakersListBlock from "@/lib/components/speakers_list/speakers_list_block";
import { ParticipantSpeechButtons } from "@/lib/components/speakers_list/speech_buttons";
import { $Enums } from "@prisma/generated/client";

export default function SpeakersList() {
  //TODO this is unused
  const [_data, setData] = useState(apiTestData);

  const myDelegationData = useContext(MyDelegationContext);

  useEffect(() => {
    const intervalAPICall = setInterval(() => {
      setData(apiTestData);
    }, 1000);
    return () => clearInterval(intervalAPICall);
  }, []);

  return (
    <>
      <ScrollPanel className="custom-scrollbar flex-1 overflow-y-auto">
        <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
          <SpeakersListBlock
            typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
            listTitle={LL.participants.speakersList.SPEAKERS_LIST()}
            myCountry={myDelegationData.delegation?.nation?.alpha3Code}
          >
            <ParticipantSpeechButtons />
          </SpeakersListBlock>
          <SpeakersListBlock
            typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
            listTitle={LL.participants.speakersList.COMMENT_LIST()}
            myCountry={myDelegationData.delegation?.nation?.alpha3Code}
          >
            <ParticipantSpeechButtons />
          </SpeakersListBlock>
        </div>
      </ScrollPanel>
    </>
  );
}
