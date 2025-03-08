import React from "react";
import ConfigWrapper from "./chair/config_wrapper";
import Button from "../Button";
import { useParams } from "next/navigation";
import { backend } from "@/lib/backend/clientsideBackend";

/**
 * This Component is used in the Dashboard. It shows the current,
 * and the next step in the debate process according to the rules of procedure.
 */

export default function ResolutionAdoption() {
  const { conferenceId, committeeId } = useParams();

  const adoptResolution = () => {
    backend
      .conference({ conferenceId: conferenceId as string })
      .committee({ committeeId: committeeId as string })
      .adoptResolution.patch();
  };
  return (
    <>
      <ConfigWrapper
        title="Resolution Verabschiedet"
        description="Verkündet die Verabschiedung der Resolution mit Konfetti. Es kann bis zu 5 Sekunden dauern, bis die Verabschiedung verkündet wird."
      >
        <Button
          faIcon="party-horn"
          label="Verabschiedung verkünden"
          onClick={() => adoptResolution()}
          className="w-full"
        />
      </ConfigWrapper>
    </>
  );
}
