"use client";
import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/navbar/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { MyDelegationProvider, useUserIdent } from "@/contexts/user_ident";
import { useContext, useEffect, useState } from "react";
import { ConferenceIdContext } from "@/contexts/committee_data";
import { $Enums } from "@prisma/generated/client";
import Lockout from "@/components/lockout";
import ExternalLinks from "@/components/navbar/external_links";

export default function ChairHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { LL } = useI18nContext();
  const conferenceId = useContext(ConferenceIdContext);
  const { userIdent } = useUserIdent();
  const [role, setRole] = useState<$Enums.ConferenceRole | null>(null);

  useEffect(() => {
    if (!userIdent) {
      return;
    }
    setRole(
      userIdent.conferenceMemberships.find(
        (c) => c.conference.id === conferenceId,
      )?.role ?? null,
    );
  }, [userIdent]);

  return (
    <MyDelegationProvider>
      <Lockout
        whitelist={[
          $Enums.ConferenceRole.ADMIN,
          $Enums.ConferenceRole.SECRETARIAT,
          $Enums.ConferenceRole.CHAIR,
          $Enums.ConferenceRole.COMMITTEE_ADVISOR,
          $Enums.ConferenceRole.PARTICIPANT_CARE,
          $Enums.ConferenceRole.MISCELLANEOUS_TEAM,
        ]}
      />
      <div className="flex h-screen w-screen bg-white text-primary-100 dark:bg-primary-100 dark:text-primary-900 shadow-md overflow-hidden">
        <Navbar>
          <NavButton
            icon="rocket-launch"
            link={"./committees"}
            title={LL.navbar.HUB()}
          />
          <div className="h-4" />
          {userIdent &&
            role !== null &&
            (
              [
                $Enums.ConferenceRole.ADMIN,
                $Enums.ConferenceRole.SECRETARIAT,
                $Enums.ConferenceRole.COMMITTEE_ADVISOR,
                $Enums.ConferenceRole.PARTICIPANT_CARE,
                $Enums.ConferenceRole.MISCELLANEOUS_TEAM,
              ] as ($Enums.ConferenceRole | undefined)[]
            ).includes(role) && (
              <NavButton
                icon="inbox"
                link={"./inbox"}
                title={LL.navbar.INBOX()}
              />
            )}
          {userIdent && role === $Enums.ConferenceRole.ADMIN && (
            <NavButton
              icon="gears"
              link={"../../admin/structure"}
              title={LL.navbar.INBOX()}
            />
          )}
          <div className="flex-1" />
          <ExternalLinks />
        </Navbar>
        {children}
      </div>
    </MyDelegationProvider>
  );
}
