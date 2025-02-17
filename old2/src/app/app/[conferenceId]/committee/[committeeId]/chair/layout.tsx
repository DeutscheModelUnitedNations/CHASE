"use client";
import { useContext } from "react";
import Navbar from "@/components/navbar/navbar";
import NavButton from "@/components/navbar/button";
import { useI18nContext } from "@/i18n/i18n-react";
import { MessageCountContext, MessageCountProvider } from "@/contexts/messages";
import ExternalLinks from "@/components/navbar/external_links";
import { SpeakersListMiniatureProvider } from "@/contexts/speakers_list_miniature";
import SpeakersListMiniature from "@/components/dashboard/chair/speakers_list_miniature";

export default function Chair_Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SpeakersListMiniatureProvider>
      <SpeakersListMiniature />
      <MessageCountProvider>
        <div className="flex h-screen w-screen bg-white text-primary-100 dark:bg-primary-100 dark:text-primary-900 shadow-md overflow-hidden">
          <ChairNavbar />
          {children}
        </div>
      </MessageCountProvider>
    </SpeakersListMiniatureProvider>
  );
}

function ChairNavbar() {
  const { LL } = useI18nContext();
  const { messageCount } = useContext(MessageCountContext);

  return (
    <Navbar>
      <NavButton
        icon="rocket-launch"
        link="../../../hub/team/committees"
        title={LL.navbar.HUB()}
      />
      <div className="h-4" />
      <NavButton
        icon="square-sliders"
        link={"./dashboard"}
        title={LL.navbar.CONFIGURATION()}
      />
      <NavButton
        icon="users-line"
        link={"./attendees"}
        title={LL.navbar.ATTENDEES()}
      />
      <NavButton
        icon="podium"
        link={"./speakers"}
        title={LL.navbar.SPEAKERS()}
      />
      {/* <NavButton TODO add Voting page
          icon="poll-people"
          link={"./voting"}
          title={LL.navbar.VOTING()} 
        /> */}
      <NavButton
        icon="chalkboard"
        link={"./whiteboard"}
        title={LL.navbar.WHITEBOARD()}
      />
      <NavButton
        icon="inbox"
        link={"./inbox"}
        title={LL.navbar.INBOX()}
        badge={messageCount ?? 0}
      />
      {/* <NavButton TODO add Resolution Editor page
          icon="scroll"
          link={"./resolutions"}
          title={LL.navbar.RESOLUTIONS()}
        /> */}
      <div className="flex-1" />
      <ExternalLinks />
    </Navbar>
  );
}
