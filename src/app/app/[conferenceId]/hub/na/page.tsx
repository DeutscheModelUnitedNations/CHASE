"use client";
import React from "react";
import CommitteeGrid from "@/lib/components/navigation-hub/committee_grid";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/contexts/toast";
import * as m from "@/paraglide/messages";
import Button from "@/lib/components/Button";
import { backend } from "@/lib/backend/clientsideBackend";

export default function NAHubPage({
  params,
}: {
  params: { conferenceId: string };
}) {
  const router = useRouter();
  const { toastError } = useToast();

  return (
    <>
      <div className="bg-primary flex min-h-screen items-start justify-center">
        <div className="m-10 mt-20 flex flex-1 flex-col items-center justify-center">
          <div className="dark:bg-primary-200 flex w-11/12 flex-1 flex-col items-center justify-center rounded-md bg-white p-5 shadow-lg">
            <h1 className="text-3xl">{m.hubOfNonStateActors()}</h1>
            <h2 className="mt-2 mb-8 text-xl">{m.selectACommittee()}</h2>
            <CommitteeGrid conferenceId={params.conferenceId} />
            {/* TODO: Add logout */}
            {/* <Button
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
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
