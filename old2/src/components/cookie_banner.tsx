import React, { useEffect, useRef, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import CookieConsent from "react-cookie-consent";
import Button from "./button";
import Link from "next/link";

export default function CookieBanner() {
  const { LL } = useI18nContext();
  const [domain, setDomain] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (window?.location?.hostname) {
      const domainParts = window.location.hostname.split(".");
      setDomain(domainParts.slice(-2).join("."));
    }
  }, [domain]);

  const cookieConsentRef = useRef<CookieConsent | null>(null);

  const handleAcceptButtonClick = () => {
    cookieConsentRef?.current?.accept();
    setIsVisible(false);
  };

  useEffect(() => {
    if (cookieConsentRef.current) {
      setIsVisible(cookieConsentRef.current.state.visible);
    }
  }, [cookieConsentRef.current?.state.visible]);

  // TODO: Fix cookie interference with the backend
  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999] backdrop-blur-sm" />
      )}
      <CookieConsent
        ref={cookieConsentRef}
        location="bottom"
        buttonText="Accept"
        cookieName="chaseCookieConsent"
        extraCookieOptions={{
          domain,
        }}
        style={{
          zIndex: 1000,
        }}
        containerClasses="flex flex-col sm:flex-row min-h-40 items-center justify-center w-full bg-primary-200 bg-opacity-80 text-white fixed bottom-0 left-0 z-50"
        contentClasses="h-full flex-1 flex flex-col justify-center w-full p-4"
        ButtonComponent={() => (
          <div className="p-4">
            <Button
              severity="info"
              faIcon="cookie-bite"
              label={LL.cookieBanner.ACCEPT()}
              onClick={handleAcceptButtonClick}
            />
          </div>
        )}
        expires={150}
        disableStyles={true}
      >
        <h1 className="text-2xl font-bold font-serif mb-2">
          {LL.cookieBanner.HEADLINE()}
        </h1>
        <p>{LL.cookieBanner.TEXT()}</p>
        <p className="text-xs mt-2">
          {LL.cookieBanner.SUBTEXT()}{" "}
          <Link href="/privacy-policy" className=" underline hover:font-bold">
            {LL.cookieBanner.PRIVACY_POLICY()}
          </Link>
          .
        </p>
      </CookieConsent>
    </>
  );
}
