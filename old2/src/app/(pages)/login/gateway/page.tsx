"use client";
import React from "react";
import { useBackend } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { $Enums } from "@prisma/generated/client";
import { LargeFlag } from "@/components/flag_templates";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import { useI18nContext } from "@/i18n/i18n-react";
import Link from "next/link";
import { conferenceRoleTranslation } from "@/i18n/translation_utils";
import { useToast } from "@/contexts/toast";
import { useBackendCall } from "@/hooks/useBackendCall";
import FAIcon from "@/components/font_awesome_icon";

export default function LoginRedirectPage() {
  const router = useRouter();
  const { LL, locale } = useI18nContext();
  const { toastError } = useToast();
  const { backend } = useBackend();

  const [myInfoData] = useBackendCall(backend.auth.myInfo.get, false);

  const conferenceMemberRedirectPath = (
    conferenceMembership: NonNullable<
      typeof myInfoData
    >["conferenceMemberships"][number],
  ) => {
    if (
      (
        [
          $Enums.ConferenceRole.ADMIN,
          $Enums.ConferenceRole.SECRETARIAT,
          $Enums.ConferenceRole.CHAIR,
          $Enums.ConferenceRole.COMMITTEE_ADVISOR,
          $Enums.ConferenceRole.PARTICIPANT_CARE,
          $Enums.ConferenceRole.MISCELLANEOUS_TEAM,
        ] as ($Enums.ConferenceRole | undefined)[]
      ).includes(conferenceMembership.role)
    )
      return `/app/${conferenceMembership.conference.id}/hub/team/committees`;
    if (conferenceMembership.role === $Enums.ConferenceRole.PRESS_CORPS) {
      return `/app/${conferenceMembership.conference.id}/hub/press`;
    }
    if (conferenceMembership.role === $Enums.ConferenceRole.NON_STATE_ACTOR) {
      return `/app/${conferenceMembership.conference.id}/hub/na`;
    }
    if (conferenceMembership.role === $Enums.ConferenceRole.GUEST) {
      return `/app/${conferenceMembership.conference.id}/hub/guests`;
    }
    throw new Error("Unknown role");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {myInfoData ? (
        <>
          <h1 className="font-serif font-bold text-4xl mb-4">
            {LL.login.gateway.TITLE()}
          </h1>
          {myInfoData.conferenceMemberships.length > 0 && (
            <>
              <p className="mb-4 text-center">
                {myInfoData.conferenceMemberships.length === 1
                  ? LL.login.gateway.CONFERENCE_MEMBER_SINGLE()
                  : LL.login.gateway.CONFERENCE_MEMBER_MULTIPLE()}
              </p>
              {myInfoData.conferenceMemberships.map((conferenceMembership) => (
                <Link
                  href={conferenceMemberRedirectPath(conferenceMembership)}
                  className="w-full flex flex-col justify-center items-center p-4 bg-primary-950 rounded-lg mb-4 hover:cursor-pointer pophover"
                  key={conferenceMembership.id}
                >
                  <h2 className="text-2xl font-bold mb-2">
                    {conferenceMembership.conference.name}
                  </h2>
                  <h3 className="text-xl mb-4">
                    {conferenceRoleTranslation(LL, conferenceMembership.role)}
                  </h3>
                  <Button
                    key={conferenceMembership.id}
                    faIcon="rocket-launch"
                    label={LL.login.gateway.LAUNCH_BUTTON()}
                    onClick={() =>
                      router.push(
                        conferenceMemberRedirectPath(conferenceMembership),
                      )
                    }
                  />
                </Link>
              ))}
            </>
          )}
          {myInfoData.committeeMemberships.length > 0 && (
            <>
              <p className="mb-4 text-center">
                {myInfoData.committeeMemberships.length === 1
                  ? LL.login.gateway.COMMITTEE_MEMBER_SINGLE()
                  : LL.login.gateway.COMMITTEE_MEMBER_MULTIPLE()}
              </p>
              {myInfoData.committeeMemberships.map((committeeMembership) => (
                <Link
                  href={`/app/${committeeMembership.committee.conference.id}/committee/${committeeMembership.committee.id}/participant/dashboard`}
                  className="w-full flex flex-col justify-center items-center p-4 bg-primary-950 rounded-lg mb-4 hover:cursor-pointer pophover"
                  key={committeeMembership.committee.id}
                >
                  <h3 className="text-xl">
                    {committeeMembership.committee.conference.name}
                  </h3>
                  <h2 className="text-2xl font-bold mb-4">
                    {committeeMembership.committee.name}
                  </h2>
                  <div className="flex flex-col gap-4 justify-center items-center p-4 bg-white rounded-lg mb-6">
                    <LargeFlag
                      countryCode={
                        committeeMembership.delegation?.nation.alpha3Code ??
                        "xxx"
                      }
                    />
                    <h2 className="text-xl font-bold">
                      {getCountryNameByCode(
                        committeeMembership.delegation?.nation.alpha3Code ??
                          "xxx",
                        locale,
                      )}
                    </h2>
                  </div>
                  <Button
                    faIcon="rocket-launch"
                    label={LL.login.gateway.LAUNCH_BUTTON()}
                  />
                </Link>
              ))}
            </>
          )}
          {myInfoData.conferenceMemberships.length === 0 &&
            myInfoData.committeeMemberships.length === 0 && (
              <p>{LL.login.gateway.NO_MEMBERSHIP()}</p>
            )}
          <Button
            faIcon="right-from-bracket"
            label={LL.login.gateway.LOGOUT_BUTTON()}
            onClick={() => {
              backend.auth.logout
                .get()
                .then((res) => {
                  if (res.status !== 200) throw new Error("Failed to log out");
                  router.push("/login");
                })
                .catch((err) => {
                  toastError(err);
                });
            }}
            severity="danger"
            className={"mt-8"}
          />
        </>
      ) : (
        <FAIcon
          icon="circle-notch"
          spin
          size="3x"
          className="text-primary-500"
        />
      )}
    </div>
  );
}
