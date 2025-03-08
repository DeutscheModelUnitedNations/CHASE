import React, { useState } from "react";
import { Skeleton } from "primereact/skeleton";
import Link from "next/link";
import Timer from "../dashboard/countdown_timer";
import SmallInfoCard from "../SmallInfoCard";
import type { backend } from "@/lib/backend/clientsideBackend";
import { useClientSideBackendCallPoller } from "@/lib/backend/useClientSideBackendCall";
import * as m from "@/paraglide/messages";
import {
  CommitteeDataProvider,
  CommitteeIdContext,
} from "@/lib/contexts/committee_data";
import { StatusTimerProvider } from "@/lib/contexts/status_timer";
import FAIcon from "../FAIcon";
import ConfettiOnAdoption from "../confetti_on_adoption";

type CommitteeArray = Awaited<
  ReturnType<ReturnType<(typeof backend)["conference"]>["committee"]["get"]>
>["data"];
type CommitteeType = NonNullable<CommitteeArray>[number];

export default function CommitteeGrid({
  conferenceId,
  isChair,
}: {
  conferenceId: string;
  isChair?: boolean;
}) {
  const { value: committees } = useClientSideBackendCallPoller(
    (backend) => backend.conference({ conferenceId }).committee.get(),
    10000,
  );

  return (
    <div className="flex w-full flex-wrap items-start justify-start gap-4 p-4">
      {committees?.map((committee: any) => {
        return (
          <CommitteeCard
            key={committee.id}
            conferenceId={conferenceId}
            committee={committee}
            isChair={isChair}
          />
        );
      })}
      {committees?.length === 0 && (
        <h1 className="text-2xl">{m.noCommittees()}</h1>
      )}
      {!committees && (
        <>
          <Skeleton
            height="20rem"
            className="min-w-[25rem] flex-1 rounded-lg !bg-primary-900"
          />
          <Skeleton
            height="20rem"
            className="min-w-[25rem] flex-1 rounded-lg !bg-primary-900"
          />
          <Skeleton
            height="20rem"
            className="min-w-[25rem] flex-1 rounded-lg !bg-primary-900"
          />
        </>
      )}
    </div>
  );
}

function CommitteeCard({
  conferenceId,
  committee,
  isChair,
}: {
  conferenceId: string;
  committee: CommitteeType;
  isChair?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  function getHeadline(
    category: CommitteeType["status"],
    headline: string | null,
  ) {
    if (headline) return headline;
    switch (category) {
      case "FORMAL":
        return m.formal();
      case "INFORMAL":
        return m.informal();
      case "PAUSE":
        return m.pause();
      case "SUSPENSION":
        return m.suspension();
      default:
        return "";
    }
  }

  const getIcon: (category: CommitteeType["status"]) => string = (category) => {
    switch (category) {
      case "FORMAL":
        return "podium";
      case "INFORMAL":
        return "comments";
      case "PAUSE":
        return "mug-hot";
      case "SUSPENSION":
        return "forward-step";
      default:
        return "question";
    }
  };

  const getColor: (
    category: CommitteeType["status"],
  ) => string[] | undefined = (category) => {
    switch (category) {
      case "FORMAL":
        return undefined;
      case "INFORMAL":
        return ["bg-red-200 border-red-500 text-red-500", "bg-red-200"];
      case "PAUSE":
        return [
          "bg-secondary-800 border-secondary-500 text-secondary-200",
          "bg-secondary-800",
        ];
      case "SUSPENSION":
        return [
          "bg-primary-800 border-primary-200 text-primary-200",
          "bg-primary-800",
        ];
      default:
        return undefined;
    }
  };

  return (
    <CommitteeIdContext.Provider value={committee.id}>
      <CommitteeDataProvider>
        <StatusTimerProvider disallowNotifications>
          <Link
            key={committee.id}
            href={`/app/${conferenceId}/committee/${committee.id}/${
              isChair ? "chair" : "participant"
            }/dashboard`}
            onClick={() => {
              setLoading(true);
            }}
            className="pophover flex min-w-[25rem] flex-1 cursor-pointer flex-col justify-between gap-2 rounded-lg bg-primary-950 p-4 dark:bg-primary-200"
          >
            <h3 className="truncate text-lg">{committee.name}</h3>
            <h1 className="mt-4 mb-6 ml-4 flex-1 text-4xl font-bold text-primary">
              {loading ? (
                <FAIcon icon="circle-notch" className="fa-spin" />
              ) : (
                committee.abbreviation
              )}
            </h1>

            <SmallInfoCard
              icon="podium"
              loading={!committee.agendaItems.find((i) => i.isActive)?.title}
            >
              <h3 className="truncate text-lg">
                {committee.agendaItems.find((i) => i.isActive)?.title}
              </h3>
            </SmallInfoCard>

            {isChair && (
              <SmallInfoCard
                icon="diagram-subtask"
                loading={
                  committee?.stateOfDebate == null ||
                  committee?.stateOfDebate === ""
                }
              >
                <h3 className="text-lg">{committee?.stateOfDebate}</h3>
              </SmallInfoCard>
            )}

            <SmallInfoCard
              icon={getIcon(committee?.status)}
              classNameForIconBox={getColor(committee?.status)?.[0]}
              classNameForContentBox={getColor(committee?.status)?.[1]}
              loading={!committee.statusUntil}
            >
              <div className="flex flex-col">
                <h3 className="text-lg">
                  {getHeadline(committee.status, committee?.statusHeadline)}
                </h3>
                <h3 className="text-md italic">
                  {m.untilXOClock({
                    time: committee?.statusUntil
                      ? new Date(committee?.statusUntil).toLocaleTimeString(
                          "de-DE",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "undefined",
                  })}
                </h3>
              </div>
              <div className="ml-auto font-mono text-lg font-extralight">
                <Timer hideOnZero />
              </div>
            </SmallInfoCard>
          </Link>
          <ConfettiOnAdoption
            adoptionDate={committee.lastAdoptedResolution}
            committee={committee.name}
            title={committee.agendaItems.find((x) => x.isActive)?.title}
          />
        </StatusTimerProvider>
      </CommitteeDataProvider>
    </CommitteeIdContext.Provider>
  );
}
