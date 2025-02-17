"use client";
import { useI18nContext } from "@/i18n/i18n-react";
import Image from "next/image";
import Button from "@/components/button";

export default () => {
  const { LL } = useI18nContext();

  return (
    <>
      <Image
        src="/undraw/security_lockout.svg"
        alt="decorative lockout drawing"
        width={300}
        height={300}
        className="mb-10"
      />
      <h1 className="text-3xl font-bold mb-4">{LL.login.lockout.TITLE()}</h1>
      <p className="text-center">{LL.login.lockout.DETAIL()}</p>
      <div className="mt-6 w-full flex gap-4">
        <Button
          label="Log in"
          faIcon="right-to-bracket"
          onClick={() => {
            window.location.href = "/login";
          }}
          className="flex-1"
        />
        <Button
          label="Homepage"
          faIcon="home"
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex-1"
        />
      </div>
    </>
  );
};
