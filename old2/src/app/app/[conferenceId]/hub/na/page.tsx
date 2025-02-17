"use client";
import React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import CommitteeGrid from "@/components/navigation-hub/committee_grid";
import Button from "@/components/button";
import { useBackend } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toast";

export default function NAHubPage({
  params,
}: {
  params: { conferenceId: string };
}) {
  const { LL } = useI18nContext();
  const router = useRouter();
  const { toastError } = useToast();
  const { backend } = useBackend();

  return (
    <>
      <div className="flex justify-center items-start min-h-screen bg-primary">
        <div className="flex-1 flex flex-col justify-center items-center m-10 mt-20">
          <div className="flex-1 flex flex-col justify-center items-center bg-white dark:bg-primary-200 w-11/12 p-5 rounded-md shadow-lg">
            <h1 className="text-3xl">{LL.hub.NA_HUB_TITLE()}</h1>
            <h2 className="text-xl mt-2 mb-8">{LL.hub.SELECT_COMMITTEE()}</h2>
            <CommitteeGrid conferenceId={params.conferenceId} />
            <Button
              className="mt-8"
              faIcon="arrow-right-from-bracket"
              label={LL.hub.LOGOUT()}
              onClick={() => {
                backend.auth.logout
                  .get()
                  .then((res) => {
                    if (res.status !== 200)
                      throw new Error("Failed to log out");
                    router.push("/login");
                  })
                  .catch((err) => {
                    toastError(err);
                  });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
