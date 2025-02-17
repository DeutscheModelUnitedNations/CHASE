import React, { useContext } from "react";
import getCountryNameByCode from "../../misc/get_country_name_by_code";
import HeaderTemplate from "../header_template";
import { useI18nContext } from "@/i18n/i18n-react";
import { LargeFlag } from "../flag_templates";
import { Skeleton } from "primereact/skeleton";
import {
  AgendaItemContext,
  CommitteeDataContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { useUserIdent } from "@/contexts/user_ident";
import { conferenceRoleTranslation } from "@/i18n/translation_utils";
import { $Enums } from "@prisma/generated/client";

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
  const { LL, locale } = useI18nContext();
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
        <h1 className="text-2xl font-bold mb-1">
          {alternativeHeadline1 ??
            (userIdent && isConferenceMember()
              ? conferenceRoleTranslation(
                  LL,
                  conferenceMembership(conferenceId)?.role,
                )
              : getCountryNameByCode(
                  committeeMembership(conferenceId)?.delegation?.nation
                    ?.alpha3Code ?? "xxx",
                  locale,
                ) ?? <Skeleton width="15rem" height="2rem" />)}
        </h1>
        <h2 className="text-md font-bold my-1">
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
