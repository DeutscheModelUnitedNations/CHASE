"use client";

import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/navbar/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { MyDelegationProvider, useUserIdent } from "@/contexts/user_ident";
import { useContext } from "react";
import { ConferenceIdContext } from "@/contexts/committee_data";
import { $Enums } from "@prisma/generated/client";
import ExternalLinks from "@/components/navbar/external_links";
import { useFaGlobe } from "@/hooks/useFaGlobe";

export default function Participant_Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { LL } = useI18nContext();
  const conferenceId = useContext(ConferenceIdContext);
  const { conferenceMembership } = useUserIdent();

  const homeIcon = useFaGlobe();

  return (
    <MyDelegationProvider>
      <div className="flex h-screen w-screen bg-white text-primary-100 dark:bg-primary-100 dark:text-primary-900 shadow-md overflow-hidden">
        <Navbar>
          {conferenceMembership(conferenceId)?.role ===
            $Enums.ConferenceRole.NON_STATE_ACTOR && (
            <>
              <NavButton
                icon="faChartNetwork"
                link={`/app/${conferenceId}/hub/na`}
                title="Hub"
              />
              <div className="flex-1" />
            </>
          )}
          {conferenceMembership(conferenceId)?.role ===
            $Enums.ConferenceRole.GUEST && (
            <>
              <NavButton
                icon="faChartNetwork"
                link={`/app/${conferenceId}/hub/guest`}
                title="Hub"
              />
              <div className="flex-1" />
            </>
          )}
          <NavButton
            icon={homeIcon}
            link={"./dashboard"}
            title={LL.navbar.DASHBOARD()}
          />
          <NavButton
            icon="podium"
            link={"./speakers"}
            title={LL.navbar.SPEAKERS()}
          />
          {/* <NavButton TODO add Voting Page
          icon="poll-people"
          link={"./voting"}
          title={LL.navbar.VOTING()}
        /> */}
          {/* <NavButton TODO add Resolution Editor page
          icon="scroll"
          link={"./resolutions"}
          title={LL.navbar.RESOLUTIONS()}
        /> */}
          <div className="flex-1" />
          <ExternalLinks />
        </Navbar>
        {children}
      </div>
    </MyDelegationProvider>
  );
}
