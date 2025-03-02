"use client";

import { useContext } from "react";
import { $Enums } from "@prisma/generated/client";
import { ConferenceIdContext } from "@/lib/contexts/committee_data";
import { MyDelegationProvider, useUserIdent } from "@/lib/contexts/user_ident";
import { useFaGlobe } from "@/lib/useFaGlobe";
import Navbar from "@/lib/navbar/Navbar";
import NavbarButton from "@/lib/navbar/NavbarButton";
import * as m from "@/paraglide/messages";

export default function Participant_Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conferenceId = useContext(ConferenceIdContext);
  const { conferenceMembership } = useUserIdent();

  const homeIcon = useFaGlobe();

  return (
    <MyDelegationProvider>
      <div className="text-primary-100 dark:bg-primary-100 dark:text-primary-900 flex h-screen w-screen overflow-hidden bg-white shadow-md">
        <Navbar>
          {conferenceMembership(conferenceId)?.role ===
            $Enums.ConferenceRole.NON_STATE_ACTOR && (
            <>
              <NavbarButton
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
              <NavbarButton
                icon="faChartNetwork"
                link={`/app/${conferenceId}/hub/guest`}
                title="Hub"
              />
              <div className="flex-1" />
            </>
          )}
          <NavbarButton
            icon={homeIcon}
            link={"./dashboard"}
            title={m.dashboard()}
          />
          <NavbarButton
            icon="podium"
            link={"./speakers"}
            title={m.speakersList()}
          />
          {/* <NavbarButton TODO add Voting Page
          icon="poll-people"
          link={"./voting"}
          title={LL.navbar.VOTING()}
        /> */}
          {/* <NavbarButton TODO add Resolution Editor page
          icon="scroll"
          link={"./resolutions"}
          title={LL.navbar.RESOLUTIONS()}
        /> */}
          <div className="flex-1" />
          {/* <ExternalLinks /> */}
        </Navbar>
        {children}
      </div>
    </MyDelegationProvider>
  );
}
