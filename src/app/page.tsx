import React, { useState } from "react";
import LandingHero from "@/components/home/landing_hero";
import CardSection from "@/components/home/card_section";
import Image from "next/image";
import VersionModal from "@/components/version_modal";
import * as m from "@/paraglide/messages";
import TextSection from "@/lib/TextSection";
import Navbar from "../lib/navbar/Navbar";

export default function Home() {
  const [versionModalVisible, setVersionModalVisible] = useState(false);

  return (
    <>
      <Navbar animate />
      <div className="bg-primary-950 flex flex-col items-center">
        <div className="max-w-7xl">
          <LandingHero />
          <div className="flex h-40 w-full items-center justify-center bg-white md:hidden">
            <Image
              src="/logo/svg/chase_logo_blue_text.svg"
              objectFit="contain"
              width={300}
              height={100}
              alt="Chase Logo"
            />
          </div>
          <CardSection />
          <div
            className="align-items-start flex flex-col gap-2 p-4 lg:grid lg:flex-none lg:gap-10 lg:p-20"
            style={{
              gridTemplateColumns: "auto 1fr",
            }}
          >
            <TextSection
              title={m.aboutChase()}
              text={m.aboutChaseText()}
              button={{
                label: m.versionAndChanges(),
                onClick: () => setVersionModalVisible(true),
                faIcon: "stars",
              }}
            />
            <TextSection
              title={m.ourMission()}
              text={m.ourMissionText()}
              button={{
                label: m.moreAboutDMUN(),
                link: "https://www.dmun.de/",
                faIcon: "external-link",
              }}
            />
            <TextSection
              title={m.contribute()}
              text={m.contributeText()}
              button={{
                label: m.munifyOnGitHub(),
                link: "https://github.com/DeutscheModelUnitedNations/munify",
                faIcon: "code-branch",
              }}
            />
          </div>
        </div>
      </div>
      <VersionModal
        visible={versionModalVisible}
        setVisible={setVersionModalVisible}
      />
    </>
  );
}
