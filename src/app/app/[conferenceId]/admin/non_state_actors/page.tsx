"use client";
import React from "react";

import { useRouter } from "next/navigation";
import ForwardBackButtons from "@/lib/components/admin/onboarding/forward_back_bar";

export default function Page() {
  //   {
  //   params,
  // }: {
  //   params: { conferenceId: string };
  // }
  const router = useRouter();

  return (
    <>
      <ForwardBackButtons
        handleSaveFunction={() => {
          router.push("./configs");
        }}
      />
    </>
  );
}
