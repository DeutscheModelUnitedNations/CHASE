import React, { useState, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import useMousetrap from "mousetrap-react";
import { Dialog } from "primereact/dialog";
import SpeakersListWidget from "../speakers_list";
import { useSpeakersListMiniature } from "@/contexts/speakers_list_miniature";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function SpeakersListMiniature() {
  const router = useRouter();

  const {
    showSpeakersListMiniature,
    toggleSpeakersListMiniature,
    setShowSpeakersListMiniature,
  } = useSpeakersListMiniature();

  useMousetrap("o", (e) => {
    e.preventDefault();
    toggleSpeakersListMiniature();
  });

  useMousetrap("shift+o", (e) => {
    e.preventDefault();
    router.push("./speakers");
    setShowSpeakersListMiniature(false);
  });

  return (
    <>
      <Dialog
        header="Header"
        position="bottom-right"
        content={
          <>
            <SpeakersListWidget />
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              <Button
                text
                faIcon="arrow-up-right-from-square"
                onClick={() => {
                  router.push("./speakers");
                  setShowSpeakersListMiniature(false);
                }}
                keyboardShortcut="⇧ + O"
              />

              <Button
                text
                faIcon="xmark"
                onClick={() => setShowSpeakersListMiniature(false)}
                severity="danger"
              />
            </div>
          </>
        }
        visible={showSpeakersListMiniature}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setShowSpeakersListMiniature(false)}
      />
    </>
  );
}
