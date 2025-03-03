"use client";
import { useContext } from "react";
import SpeakersListMiniature from "@/lib/components/dashboard/chair/speakers_list_miniature";
import { SpeakersListMiniatureProvider } from "@/lib/contexts/speakers_list_miniature";
import {
  MessageCountContext,
  MessageCountProvider,
} from "@/lib/contexts/messages";
import Navbar from "@/lib/navbar/Navbar";
import NavbarButton from "@/lib/navbar/NavbarButton";
import * as m from "@/paraglide/messages";

export default function Chair_Pages_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpeakersListMiniatureProvider>
        <SpeakersListMiniature />
        {/* <MessageCountProvider> */}
          <div className="flex h-screen w-screen overflow-hidden bg-white text-primary-100 shadow-md dark:bg-primary-100 dark:text-primary-900">
            <ChairNavbar />
            {children}
          </div>
        {/* </MessageCountProvider> */}
      </SpeakersListMiniatureProvider>
    </>
  );
}

function ChairNavbar() {
  const { messageCount } = useContext(MessageCountContext);

  return (
    <Navbar>
      <NavbarButton
        icon="rocket-launch"
        link="../../../hub/team/committees"
        title={m.hub()}
      />
      <div className="h-4" />
      <NavbarButton
        icon="square-sliders"
        link={"./dashboard"}
        title={m.configurations()}
      />
      <NavbarButton
        icon="users-line"
        link={"./attendees"}
        title={m.attendees()}
      />
      <NavbarButton
        icon="podium"
        link={"./speakers"}
        title={m.speakersList()}
      />
      {/* <NavButton TODO add Voting page
          icon="poll-people"
          link={"./voting"}
          title={LL.navbar.VOTING()} 
        /> */}
      <NavbarButton
        icon="chalkboard"
        link={"./whiteboard"}
        title={m.whiteboard()}
      />
      {/* <NavbarButton
        icon="inbox"
        link={"./inbox"}
        title={m.inbox()}
        badge={messageCount ?? 0}
      /> */}
      {/* <NavButton TODO add Resolution Editor page
          icon="scroll"
          link={"./resolutions"}
          title={LL.navbar.RESOLUTIONS()}
        /> */}
      <div className="flex-1" />
      {/* <ExternalLinks /> */}
    </Navbar>
  );
}
