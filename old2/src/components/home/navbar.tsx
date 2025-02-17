"use client";
import React, { useEffect, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function Navbar({
  isDocs = false,
  isFAQ = false,
  animate = false,
}: {
  isDocs?: boolean;
  isFAQ?: boolean;
  animate?: boolean;
}) {
  const [modificator, setModificator] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const _isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isBiggerThanMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the value '100' based on when you want the fade effect to start
      const newOpacity = Math.min(window.scrollY / 150, 1);
      setModificator(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isBiggerThanMobile && (
        <motion.div
          className="fixed w-full h-24 px-8 py-4 top-0 left flex gap-4 mb-8 items-center justify-center z-30"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${modificator})`,
            boxShadow: `0 0 ${modificator * 20}px rgba(0, 0, 0, ${
              modificator / 6
            })`,
          }}
          initial={{ opacity: 0.5, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            animate
              ? {
                  duration: 2,
                  delay: 2,
                  type: "spring",
                  damping: 20,
                  stiffness: 70,
                }
              : {
                  duration: 0,
                  delay: 0,
                }
          }
        >
          <Link href="/">
            <Image
              src="/logo/png/chase_logo_blue.png"
              alt="Logo"
              width={110}
              height={110}
              className="absolute top-5 left-[calc(50%-55px)] md:left-5 z-40"
            />
            <div className="ml-32 font-thin text-5xl">CHASE</div>
          </Link>
          <div className="flex-1" />
          <div className="flex gap-2">
            <NavButtons isDocs={isDocs} isFAQ={isFAQ} />
          </div>
        </motion.div>
      )}
      {isTabletOrMobile && (
        <>
          <motion.div
            className="fixed w-full h-24 px-8 py-4 top-0 left flex gap-4 mb-8 items-center justify-end z-40"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${modificator})`,
              boxShadow: `0 0 ${modificator * 20}px rgba(0, 0, 0, ${
                modificator / 6
              })`,
            }}
            initial={{ opacity: 0.5, y: -150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              animate
                ? {
                    duration: 2,
                    delay: 2,
                    type: "spring",
                    damping: 20,
                    stiffness: 70,
                  }
                : {
                    duration: 0,
                    delay: 0,
                  }
            }
          >
            <Link href="/">
              <Image
                src="/logo/png/chase_logo_blue.png"
                alt="Logo"
                width={110}
                height={110}
                className="absolute top-5 left-[calc(50%-55px)] md:left-5 z-40"
              />
            </Link>
            <Button
              faIcon="bars"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              outlined
            />
          </motion.div>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="fixed w-full px-8 pb-4 pt-40 top-0 left-0 flex items-center justify-center z-30 bg-white shadow-xl"
                initial={{ y: -600 }}
                animate={{ y: 0 }}
                exit={{ y: -600 }}
                transition={{
                  duration: 2,
                  type: "spring",
                  damping: 20,
                  stiffness: 70,
                }}
              >
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <NavButtons isDocs={isDocs} isFAQ={isFAQ} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}

function NavButtons({
  isDocs = false,
  isFAQ = false,
}: {
  isDocs?: boolean;
  isFAQ?: boolean;
}) {
  const { LL } = useI18nContext();
  const router = useRouter();

  return (
    <>
      <Button
        label={LL.home.navbar.DOCUMENTATION()}
        onClick={() => router.push("/docs")}
        severity="secondary"
        faIcon="book"
        disabled={isDocs}
        size="small"
      />
      <Button
        label={LL.home.navbar.FAQ()}
        onClick={() => router.push("/faq")}
        severity="secondary"
        faIcon="question-circle"
        disabled={isFAQ}
        size="small"
      />
      <Button
        label={LL.home.navbar.LOGIN_PARTICIPANT()}
        onClick={() => router.push("/login")}
        faIcon="right-to-bracket"
        size="small"
      />
    </>
  );
}
