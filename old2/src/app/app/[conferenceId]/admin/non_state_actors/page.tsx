"use client";
import React from "react";

import { useRouter } from "next/navigation";
import ForwardBackButtons from "@/components/admin/onboarding/forward_back_bar";

export default function loginVorsitz(
  //   {
  //   params,
  // }: {
  //   params: { conferenceId: string };
  // }
) {
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
