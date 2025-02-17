import React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Image from "next/image";

export default function Card({
  src,
  alt,
  header,
  text,
  comingSoonRibbon = false,
}: {
  src: string;
  alt: string;
  header: string;
  text: string;
  comingSoonRibbon?: boolean;
}) {
  return (
    <>
      <div className="h-full flex flex-col items-center bg-white p-8 rounded-xl shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="mb-10 h-40"
        />
        <h2 className="text-3xl text-center font-bold font-serif mb-4">
          {header}
        </h2>
        <p className="text-md text-center">{text}</p>
      </div>
      {comingSoonRibbon && <ComingSoonRibbon />}
    </>
  );
}

function ComingSoonRibbon() {
  const { LL } = useI18nContext();
  return (
    <div className="absolute top-0 right-0">
      <svg width="5rem" height="5rem" viewBox="0 0 100 100">
        <title>Coming Soon Ribbon</title>
        <polygon fill="#3d7dd2" points="0,0 50,0 100,50 100,100" />
        <text
          className="font-serif"
          x="70%"
          y="-15%"
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="13"
          fontWeight={700}
          transform="rotate(45)"
        >
          {LL.home.heroCards.COMING_SOON()}
        </text>
      </svg>
    </div>
  );
}
