import React from "react";
import Image from "next/image";
import * as m from "@/paraglide/messages";
import TextSection from "@/lib/components/TextSection";
import HomeNavigation from "./HomeNavigation";
import LandingHero from "./LandingHero";
import CardSection from "./CardSection";

export default function Home() {
  // TODO: Re-Add version modal
  // const [versionModalVisible, setVersionModalVisible] = useState(false);

  return (
    <>
      <HomeNavigation animate />
      <div className="flex w-full flex-col items-center bg-primary-950">
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
                // onClick: () => setVersionModalVisible(true),
                link: "https://github.com/DeutscheModelUnitedNations/munify/releases",
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
      {/* <VersionModal
        visible={versionModalVisible}
        setVisible={setVersionModalVisible}
      /> */}
    </>
  );
}
