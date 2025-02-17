"use client";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/contexts/toast";

type Committee = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
    >["get"]
  >
>["data"];

type AgendaItem = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
    >["agendaItem"]["active"]["get"]
  >
>["data"];

export const ConferenceIdContext = createContext<string | null>(null);
export const CommitteeIdContext = createContext<string | null>(null);

export const CommitteeDataContext = createContext<Committee | null>(null);

export const CommitteeDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { backend } = useBackend();
  const { toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);

  const [committeeData, setCommitteeData] = useState<Committee | null>(null);

  async function getCommitteeData() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .get()
      .then((response) => {
        setCommitteeData(response.data);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  useEffect(() => {
    getCommitteeData();
    const intervalAPICall = setInterval(() => {
      getCommitteeData();
    }, 5000);
    return () => clearInterval(intervalAPICall);
  }, [committeeId, conferenceId]);

  return (
    <CommitteeDataContext.Provider value={committeeData}>
      {children}
    </CommitteeDataContext.Provider>
  );
};

export const AgendaItemContext = createContext<AgendaItem | null>(null);

export const AgendaItemDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { toastError } = useToast();
  const { backend } = useBackend();

  const [agendaItem, setAgendaItem] = useState<AgendaItem | null>(null);

  async function getAgendaItem() {
    if (!conferenceId || !committeeId) return;
    await backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .agendaItem.active.get()
      .then((response) => {
        if (response.error) {
          setAgendaItem(null);
          return;
        }
        setAgendaItem(response.data);
      })
      .catch((error) => {
        toastError(error);
      });
  }

  useEffect(() => {
    getAgendaItem();
    const intervalAPICall = setInterval(() => {
      getAgendaItem();
    }, 5000);
    return () => clearInterval(intervalAPICall);
  }, []);

  return (
    <AgendaItemContext.Provider value={agendaItem}>
      {children}
    </AgendaItemContext.Provider>
  );
};
