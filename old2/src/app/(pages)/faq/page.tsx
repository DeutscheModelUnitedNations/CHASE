"use client";
import React from "react";
import Navbar from "@/components/home/navbar";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import MarkdownReader from "@/components/home/md_reader";
import { useI18nContext } from "@/i18n/i18n-react";

export default function Docs() {
  const Router = useRouter();

  const { LL } = useI18nContext();

  return (
    <>
      <Navbar isFAQ />
      <div className="w-full flex flex-col justify-center items-center md:px-4">
        <div className="flex flex-col gap-10 bg-white md:rounded-xl p-10 max-w-[900px] w-full mb-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold font-serif">{LL.faq.TITLE()}</h1>
            <p className="text-lg mt-2 mb-8 text-center">
              {LL.faq.DESCRIPTION()}
            </p>
            <Button
              label={LL.faq.BACK_TO_HOME()}
              faIcon="arrow-left"
              onClick={() => {
                Router.push("/");
              }}
            />
          </div>
          <MarkdownReader filename="faq" />
        </div>
      </div>
    </>
  );
}
