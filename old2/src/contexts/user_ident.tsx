"use client";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ConferenceIdContext } from "./committee_data";

export type User = NonNullable<
  Awaited<ReturnType<BackendInstanceType["auth"]["myInfo"]["get"]>>["data"]
>;
type ConferenceMembership = User["conferenceMemberships"][number];
type CommitteeMembership = User["committeeMemberships"][number];
type Delegation = NonNullable<
  Awaited<
    ReturnType<
      ReturnType<
        ReturnType<BackendInstanceType["conference"]>["user"]
      >["delegation"]["get"]
    >
  >["data"]
>;

interface UserIdentContextType {
  userIdent: User | undefined;
  conferenceMembership: (
    conferenceId: string | null | undefined,
  ) => ConferenceMembership | undefined;
  committeeMembership: (
    conferenceId: string | null | undefined,
  ) => CommitteeMembership | undefined;
}

interface MyDelegationContextType {
  delegation: Delegation | null;
}

export const UserIdentContext = createContext({} as UserIdentContextType);
export const useUserIdent = () => useContext(UserIdentContext);
export const MyDelegationContext = createContext({} as MyDelegationContextType);

export const UserIdentProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const router = useRouter();
  const { backend } = useBackend();

  const [userIdent, setUserIdent] = useState<User | null>(null);

  const conferenceMembership = (conferenceId: string | null | undefined) => {
    if (!conferenceId) return undefined;
    return userIdent?.conferenceMemberships.find(
      (c) => c.conference.id === conferenceId,
    );
  };

  const committeeMembership = (conferenceId: string | null | undefined) => {
    if (!conferenceId) return undefined;
    return userIdent?.committeeMemberships.find(
      (c) => c.committee.conference.id === conferenceId,
    );
  };

  useEffect(() => {
    (async () => {
      const res = await backend.auth.myInfo.get();

      if (res.status > 400) {
        router.push("/login");
        return;
      }

      setUserIdent(res.data);
    })();
  }, []);

  return (
    <UserIdentContext.Provider
      value={{
        // biome-ignore lint/style/noNonNullAssertion: TODO nullable types cleanup throughout the whole app
        userIdent: userIdent!,
        conferenceMembership,
        committeeMembership,
      }}
    >
      {children}
    </UserIdentContext.Provider>
  );
};

export const MyDelegationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userIdentContext = useUserIdent();
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();

  const [delegation, setDelegation] = useState<Delegation | null>(null);

  useEffect(() => {
    (async () => {
      if (!userIdentContext?.userIdent?.id || !conferenceId) return;
      const res = await backend
        .conference({ conferenceId })
        .user({ userId: userIdentContext?.userIdent?.id })
        .delegation.get();

      setDelegation(res.data);
    })();
  }, [userIdentContext]);

  return (
    <MyDelegationContext.Provider value={{ delegation }}>
      {children}
    </MyDelegationContext.Provider>
  );
};
