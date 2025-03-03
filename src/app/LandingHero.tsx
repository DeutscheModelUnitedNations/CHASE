"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import * as m from "@/paraglide/messages";

export default function LandingHero() {
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

  const [illustration] = useState(
    Math.floor(Math.random() * availableIllustrations.length),
  );
  const [blob] = useState(Math.floor(Math.random() * availableBlobs.length));

  return (
    <>
      <div className="relative flex flex-col items-center justify-center gap-5 p-4 pt-52 pb-20 lg:flex-row lg:pb-40">
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
        <div className="z-20 flex w-full flex-col items-center lg:w-1/2 lg:items-end">
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
            <h1 className="mb-4 text-center font-serif text-5xl leading-tight font-bold text-slate-900 lg:text-right lg:text-6xl">
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
              {m.heroTitle()}
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
            <h2 className="text-center text-xl leading-normal text-slate-900 lg:text-right lg:text-2xl">
              {m.heroText()}
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
        className="absolute top-24 left-0 z-0 md:top-0 lg:top-0"
      />
    </>
  );
};
