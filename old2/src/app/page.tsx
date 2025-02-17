"use client";
import React, { useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Navbar from "@/components/home/navbar";
import LandingHero from "@/components/home/landing_hero";
import CardSection from "@/components/home/card_section";
import TextSection from "@/components/home/text_section";
import Footer from "@/components/home/footer";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import VersionModal from "@/components/version_modal";

export default function Home() {
  const { LL } = useI18nContext();

  const [versionModalVisible, setVersionModalVisible] = useState(false);

  const _isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const _isBiggerThanMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <Navbar animate />
      <div className="flex flex-col bg-primary-950 items-center">
        <div className="max-w-7xl">
          <LandingHero />
          {isTabletOrMobile && (
            <div className="w-full bg-white h-40 flex justify-center items-center">
              <Image
                src="/logo/svg/chase_logo_blue_text.svg"
                objectFit="contain"
                width={300}
                height={100}
                alt="Chase Logo"
              />
            </div>
          )}
          <CardSection />
          <div
            className="flex flex-col lg:flex-none lg:grid gap-2 lg:gap-10 p-4 lg:p-20 align-items-start"
            style={{
              gridTemplateColumns: "auto 1fr",
            }}
          >
            <TextSection
              title={LL.home.ABOUT_TITEL()}
              text={LL.home.ABOUT_TEXT()}
              button={{
                lable: LL.home.VERSION_BUTTON(),
                onClick: () => setVersionModalVisible(true),
                faIcon: "stars",
              }}
            />
            <TextSection
              title={LL.home.MISSION_TITLE()}
              text={LL.home.MISSION_TEXT()}
              button={{
                lable: LL.home.MISSION_BUTTON_LABEL(),
                link: "https://www.dmun.de/",
                faIcon: "external-link",
              }}
            />
            <TextSection
              title={LL.home.CONTRIBUTE_TITEL()}
              text={LL.home.CONTRIBUTE_TEXT()}
              button={{
                lable: LL.home.CONTRIBUTE_BUTTON_LABEL(),
                link: "https://github.com/DeutscheModelUnitedNations/munify",
                faIcon: "code-branch",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
      <VersionModal
        visible={versionModalVisible}
        setVisible={setVersionModalVisible}
      />
    </>
  );
}
