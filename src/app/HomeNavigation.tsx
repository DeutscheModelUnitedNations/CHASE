"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/lib/Button";
import * as m from "@/paraglide/messages";

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
      <motion.div
        className="left fixed top-0 z-30 mb-8 flex hidden h-24 w-full items-center justify-center gap-4 px-8 py-4 md:block"
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
            className="absolute top-5 left-[calc(50%-55px)] z-40 md:left-5"
          />
          <div className="ml-32 text-5xl font-thin">CHASE</div>
        </Link>
        <div className="flex-1" />
        <div className="flex gap-2">
          <NavButtons isDocs={isDocs} isFAQ={isFAQ} />
        </div>
      </motion.div>
      {isTabletOrMobile && (
        <>
          <motion.div
            className="left fixed top-0 z-40 mb-8 flex h-24 w-full items-center justify-end gap-4 px-8 py-4"
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
                className="absolute top-5 left-[calc(50%-55px)] z-40 md:left-5"
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
                className="fixed top-0 left-0 z-30 flex w-full items-center justify-center bg-white px-8 pt-40 pb-4 shadow-xl"
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
                <div className="flex w-full flex-col items-center justify-center gap-4">
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
  const router = useRouter();

  return (
    <>
      <Button
        label={m.docs()}
        onClick={() => router.push("/docs")}
        severity="secondary"
        faIcon="book"
        disabled={isDocs}
        size="small"
      />
      <Button
        label={m.faq()}
        onClick={() => router.push("/faq")}
        severity="secondary"
        faIcon="question-circle"
        disabled={isFAQ}
        size="small"
      />
      <Button
        label={"login but maybe not?"}
        onClick={() => router.push("/login")}
        faIcon="right-to-bracket"
        size="small"
      />
    </>
  );
}
