import React, { useState, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import { Skeleton } from "primereact/skeleton";
import Link from "next/link";
import Timer from "../dashboard/countdown_timer";
import { useToast } from "@/contexts/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faDiagramSubtask,
  faPodium,
  faComments,
  faMugHot,
  faForwardStep,
  faQuestion,
} from "@fortawesome/pro-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import SmallInfoCard from "../small_info_card";
import {
  CommitteeDataProvider,
  CommitteeIdContext,
} from "@/contexts/committee_data";
import { StatusTimerProvider } from "@/contexts/status_timer";

type CommitteeArray = Awaited<
  ReturnType<ReturnType<BackendInstanceType["conference"]>["committee"]["get"]>
>["data"];
type CommitteeType = NonNullable<CommitteeArray>[number];

export default function CommitteeGrid({
  conferenceId,
  isChair,
}: {
  conferenceId: string;
  isChair?: boolean;
}) {
  const { LL } = useI18nContext();
  const { backend } = useBackend();
  const { toastError } = useToast();

  const [committees, setCommittees] = useState<CommitteeArray>(null);

  async function getCommittees() {
    await backend.conference[conferenceId].committee
      .get()
      .then((res) => {
        if (res.status !== 200) throw new Error("Failed to fetch committees");
        setCommittees(res.data);
      })
      .catch((err) => {
        toastError(err);
      });
  }

  useEffect(() => {
    getCommittees();
    setInterval(() => {
      getCommittees();
    }, 10000);
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-start items-start gap-4 p-4">
      {committees?.map((committee) => {
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
        <h1 className="text-2xl">{LL.hub.NO_COMMITTEES()}</h1>
      )}
      {!committees && (
        <>
          <Skeleton
            height="20rem"
            className="flex-1 min-w-[25rem] !bg-primary-900 rounded-lg"
          />
          <Skeleton
            height="20rem"
            className="flex-1 min-w-[25rem] !bg-primary-900 rounded-lg"
          />
          <Skeleton
            height="20rem"
            className="flex-1 min-w-[25rem] !bg-primary-900 rounded-lg"
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
  const { LL } = useI18nContext();

  const [loading, setLoading] = useState(false);

  function getHeadline(category: CommitteeType["status"], headline?: string) {
    if (headline) return headline;
    switch (category) {
      case "FORMAL":
        return LL.participants.dashboard.timerWidget.defaultHeadlines.FORMAL();
      case "INFORMAL":
        return LL.participants.dashboard.timerWidget.defaultHeadlines.INFORMAL();
      case "PAUSE":
        return LL.participants.dashboard.timerWidget.defaultHeadlines.PAUSE();
      case "SUSPENSION":
        return LL.participants.dashboard.timerWidget.defaultHeadlines.SUSPENSION();
      default:
        return "";
    }
  }

  const getIcon: (category: CommitteeType["status"]) => IconProp = (
    category,
  ) => {
    switch (category) {
      case "FORMAL":
        return faPodium as IconProp;
      case "INFORMAL":
        return faComments as IconProp;
      case "PAUSE":
        return faMugHot as IconProp;
      case "SUSPENSION":
        return faForwardStep as IconProp;
      default:
        return faQuestion as IconProp;
    }
  };

  const getColor: (category: CommitteeType["status"]) => string[] | undefined =
    (category) => {
      switch (category) {
        case "FORMAL":
          return undefined;
        case "INFORMAL":
          return ["bg-red-500 border-red-500 text-red-500", "bg-red-500"];
        case "PAUSE":
          return [
            "bg-secondary-500 border-secondary-400 text-secondary-400",
            "bg-secondary",
          ];
        case "SUSPENSION":
          return [
            "bg-primary-200 border-primary-200 text-primary-200",
            "bg-primary-200",
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
            className="flex-1 min-w-[25rem] flex flex-col justify-between p-4 gap-2 bg-primary-950 dark:bg-primary-200 rounded-lg pophover cursor-pointer"
          >
            <h3 className="text-lg truncate">{committee.name}</h3>
            <h1 className="flex-1 mt-4 mb-6 ml-4 text-4xl text-primary font-bold">
              {loading ? (
                <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
              ) : (
                committee.abbreviation
              )}
            </h1>

            <SmallInfoCard
              icon={faPodium}
              loading={!committee.agendaItems.find((i) => i.isActive)?.title}
            >
              <h3 className="text-lg truncate">
                {committee.agendaItems.find((i) => i.isActive)?.title}
              </h3>
            </SmallInfoCard>

            {isChair && (
              <SmallInfoCard
                icon={faDiagramSubtask}
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
                  {LL.participants.dashboard.timerWidget.UNTIL(
                    committee?.statusUntil
                      ? new Date(committee?.statusUntil).toLocaleTimeString(
                          "de-DE",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "undefined",
                  )}
                </h3>
              </div>
              <div className=" text-lg ml-auto font-mono font-extralight">
                <Timer hideOnZero />
              </div>
            </SmallInfoCard>
          </Link>
        </StatusTimerProvider>
      </CommitteeDataProvider>
    </CommitteeIdContext.Provider>
  );
}
