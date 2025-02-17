"use client";
import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import { ConferenceIdContext, CommitteeIdContext } from "./committee_data";
import type { $Enums } from "@prisma/generated/client";
import { useToast } from "./toast";

export type SpeakersListDataType = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<
        ReturnType<BackendInstanceType["conference"]>["committee"]
      >["speakersList"]
    >["get"]
  >
>["data"];

export const SpeakersListDataContext =
  createContext<SpeakersListDataType | null>(null);

export function SpeakersListDataProvider({
  children,
  typeOfList,
}: {
  children: React.ReactNode;
  typeOfList: $Enums.SpeakersListCategory;
}) {
  const { toastError } = useToast();
  const { backend } = useBackend();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [speakersListData, setSpeakersListData] =
    useState<SpeakersListDataType | null>(null);

  async function getSpeakersListData() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .speakersList({ type: typeOfList })
      .get()
      .then((response) => {
        if (response.status !== 200)
          throw new Error("Error fetching speakers list data");
        setSpeakersListData(response.data);
      })
      .catch((error) => {
        toastError(error);
        console.error(error);
      });
  }

  useEffect(() => {
    getSpeakersListData();
    const APIinterval = setInterval(() => {
      getSpeakersListData();
    }, 1000);
    return () => clearInterval(APIinterval);
  }, [conferenceId, committeeId, typeOfList]);

  return (
    <SpeakersListDataContext.Provider value={speakersListData}>
      {children}
    </SpeakersListDataContext.Provider>
  );
}
