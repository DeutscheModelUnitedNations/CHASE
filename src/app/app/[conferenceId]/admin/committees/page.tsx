"use client";
import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import ForwardBackButtons from "@/lib/components/admin/onboarding/forward_back_bar";
import { Accordion, AccordionTab } from "primereact/accordion";
import AgendaItems from "@/lib/components/admin/committee/agendaItems";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";

export default function OnboardingCommitteePage() {
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);

  const [saveLoading, setSaveLoading] = useState(false);
  const { value: committees, trigger: triggerCommittees } =
    useClientSideBackendCall(
      async (backend) =>
        //TODO
        // biome-ignore lint/style/noNonNullAssertion:
        backend.conference({ conferenceId: conferenceId! }).committee.get(),
      true,
    );

  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (update) {
      triggerCommittees();

      setUpdate(false);
    }
  }, [update]);

  const handleSave = () => {
    setSaveLoading(true);
    router.push("./delegations");
  };

  return (
    <>
      <Accordion activeIndex={0} className="w-full">
        {committees?.map((committee) => (
          <AccordionTab
            header={() => (
              <div className="flex flex-wrap items-center gap-6">
                <h2 className="text-lg font-bold">
                  {committee.name} ({committee.abbreviation})
                </h2>
              </div>
            )}
            key={committee?.id}
          >
            <CommitteeIdContext.Provider value={committee.id}>
              <AgendaItems />
            </CommitteeIdContext.Provider>
          </AccordionTab>
        ))}
      </Accordion>

      <ForwardBackButtons
        handleSaveFunction={handleSave}
        saveLoading={saveLoading}
        forwardDisabled={false}
      />
    </>
  );
}
