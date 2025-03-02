"use client";
import React from "react";
import CommitteeGrid from "@/lib/components/navigation-hub/committee_grid";
import { useParams } from "next/navigation";
import * as m from "@/paraglide/messages";

export default function GuestHubPage() {
  const { conferenceId } = useParams();
  return conferenceId ? (
    <>
      <div className="flex min-h-screen items-start justify-center bg-primary">
        <div className="m-10 mt-20 flex flex-1 flex-col items-center justify-center">
          <div className="flex w-11/12 flex-1 flex-col items-center justify-center rounded-md bg-white p-5 shadow-lg dark:bg-primary-200">
            <h1 className="text-3xl">{m.guestHub()}</h1>
            <h2 className="mt-2 mb-8 text-xl">{m.selectACommittee()}</h2>
            <CommitteeGrid conferenceId={conferenceId as string} />
            {/* TODO logout */}
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
  ) : (
    <div>Loading...</div>
  );
}
