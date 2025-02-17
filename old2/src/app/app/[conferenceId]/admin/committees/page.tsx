"use client";
import React, { useContext, useEffect, useState } from "react";

import { useBackend, type BackendInstanceType } from "@/contexts/backend";
import { useRouter } from "next/navigation";
import ForwardBackButtons from "@/components/admin/onboarding/forward_back_bar";
import { Accordion, AccordionTab } from "primereact/accordion";
import AgendaItems from "@/components/admin/committee/agendaItems";
import {
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";
import { useBackendCall } from "@/hooks/useBackendCall";

export default function OnboardingCommitteePage() {
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();

  const [saveLoading, setSaveLoading] = useState(false);
  const [committees, triggerCommittees] = useBackendCall(
    //TODO
    // biome-ignore lint/style/noNonNullAssertion:
    backend.conference({ conferenceId: conferenceId! }).committee.get,
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
                <h2 className="font-bold text-lg">
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
