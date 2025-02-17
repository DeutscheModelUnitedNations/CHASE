import React, { useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingHero() {
  const { LL } = useI18nContext();

  const availableIllustrations = [
    "/undraw/the_world_is_mine.svg",
    "/undraw/world.svg",
    "/undraw/around_the_world.svg",
  ];

  const availableBlobs = [
    "/misc/blobs/blob_1.svg",
    "/misc/blobs/blob_2.svg",
    "/misc/blobs/blob_3.svg",
    "/misc/blobs/blob_4.svg",
    "/misc/blobs/blob_5.svg",
  ];

  const [illustration, _setIllustration] = useState(
    Math.floor(Math.random() * availableIllustrations.length),
  );
  const [blob, _setBlob] = useState(
    Math.floor(Math.random() * availableBlobs.length),
  );

  return (
    <>
      <div className="relative flex flex-col lg:flex-row items-center justify-center p-4 pt-52 pb-20 lg:pb-40 gap-5">
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 1,
            type: "spring",
            delay: 0.2,
            damping: 20,
            stiffness: 100,
          }}
        >
          <Illustration
            availableIllustrations={availableIllustrations}
            chosenIllustration={illustration}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <Blob availableBlobs={availableBlobs} chosenBlob={blob} />
        </motion.div>
        <div className="flex flex-col items-center lg:items-end z-20 w-full lg:w-1/2 ">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 1,
              type: "spring",
              delay: 0.7,
              damping: 20,
              stiffness: 100,
            }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold font-serif text-center lg:text-right text-slate-900 mb-4 leading-tight">
              <span
                style={{
                  background: "linear-gradient(to right, #3d7dd2, #0000d0)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                MUN
              </span>
              {LL.home.CAPTION()}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: 1,
            }}
          >
            <h2 className="text-xl lg:text-2xl text-center lg:text-right text-slate-900 leading-normal">
              {LL.home.HERO_TEXT()}
            </h2>
          </motion.div>
        </div>
      </div>
    </>
  );
}

interface IllustrationProps {
  availableIllustrations: string[];
  chosenIllustration: number;
}

const Illustration = ({
  availableIllustrations,
  chosenIllustration,
}: IllustrationProps) => {
  return (
    <>
      <Image
        src={availableIllustrations[chosenIllustration]}
        alt="Logo"
        width={500}
        height={128}
      />
    </>
  );
};

interface BlobProps {
  availableBlobs: string[];
  chosenBlob: number;
}

const Blob = ({ availableBlobs, chosenBlob }: BlobProps) => {
  return (
    <>
      <Image
        src={availableBlobs[chosenBlob]}
        alt="Logo"
        width={800}
        height={128}
        className="absolute top-24 md:top-0 lg:top-0 left-0 z-0"
      />
    </>
  );
};
