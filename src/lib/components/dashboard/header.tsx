import React, { useContext } from "react";
import HeaderTemplate from "../HeaderTemplate";
import { Skeleton } from "primereact/skeleton";
import { $Enums } from "@prisma/client";
import { useUserIdent } from "@/lib/contexts/user_ident";
import {
  AgendaItemContext,
  CommitteeDataContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { conferenceRoleTranslation } from "@/lib/translationUtils";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import { LargeFlag } from "../Flag";

/**
 * This Component is used in the Dashboard. It uses the HeaderTemplate
 * to create a header with the country's flag, country's name, committee name and topic.
 * @param countryCode The country's code. If chair or other staff, use "uno" as the code.
 * @param alternativeHeadline Used to override the country's name when chair or other staff.
 * @returns Header Component
 */

export default function DashboardHeader({
  alternativeHeadline1,
  alternativeHeadline2,
  alternativeHeadline3,
}: {
  alternativeHeadline1?: string;
  alternativeHeadline2?: string;
  alternativeHeadline3?: string;
}) {
  const { userIdent, conferenceMembership, committeeMembership } =
    useUserIdent();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeName = useContext(CommitteeDataContext)?.name;
  const currentTopic = useContext(AgendaItemContext)?.title;

  const isConferenceMember = () => {
    return conferenceMembership(conferenceId) !== undefined;
  };

  return (
    <HeaderTemplate>
      <div className="flex flex-col items-start justify-center">
        <h1 className="mb-1 text-2xl font-bold">
          {alternativeHeadline1 ??
            (userIdent && isConferenceMember()
              ? conferenceRoleTranslation(
                  conferenceMembership(conferenceId)?.role,
                )
              : (getFullTranslatedCountryNameFromISO3Code(
                  committeeMembership(conferenceId)?.delegation?.nation
                    ?.alpha3Code ?? "xxx",
                ) ?? <Skeleton width="15rem" height="2rem" />))}
        </h1>
        <h2 className="text-md my-1 font-bold">
          {alternativeHeadline2 ?? committeeName ?? (
            <Skeleton width="10rem" height="1.5rem" />
          )}
        </h2>
        <h3 className="text-md">
          {alternativeHeadline3 ?? currentTopic ?? (
            <Skeleton width="12rem" height="1.5rem" />
          )}
        </h3>
      </div>
      <LargeFlag
        countryCode={
          committeeMembership(conferenceId)?.delegation?.nation?.alpha3Code ??
          (conferenceMembership(conferenceId)?.role ===
          $Enums.ConferenceRole.NON_STATE_ACTOR
            ? "nsa_1"
            : isConferenceMember()
              ? "uno"
              : "xxx")
        }
      />
    </HeaderTemplate>
  );
}
