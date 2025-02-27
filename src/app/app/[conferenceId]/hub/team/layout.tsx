"use client";
import { useContext, useEffect, useState } from "react";
import { $Enums } from "@prisma/generated/client";
import Lockout from "@/lib/components/Lockout";
import Navbar from "@/lib/navbar/Navbar";
import NavbarButton from "@/lib/navbar/NavbarButton";
import * as m from "@/paraglide/messages";
import { MyDelegationProvider, useUserIdent } from "@/lib/contexts/user_ident";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";

export default function ChairHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="text-primary-100 dark:bg-primary-100 dark:text-primary-900 flex h-screen w-screen overflow-hidden bg-white shadow-md">
        <Navbar>
          <NavbarButton
            icon="rocket-launch"
            link={"./committees"}
            title={m.hub()}
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
              <NavbarButton icon="inbox" link={"./inbox"} title={m.inbox()} />
            )}
          {userIdent && role === $Enums.ConferenceRole.ADMIN && (
            <NavbarButton
              icon="gears"
              link={"../../admin/structure"}
              title={m.inbox()}
            />
          )}
          <div className="flex-1" />
          {/* <ExternalLinks /> */}
        </Navbar>
        {children}
      </div>
    </MyDelegationProvider>
  );
}
