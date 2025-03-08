import React, { useContext } from "react";
import { ToggleButton } from "primereact/togglebutton";
import { useToast } from "@/lib/contexts/toast";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/lib/contexts/committee_data";
import ConfigWrapper from "./config_wrapper";
import * as m from "@/paraglide/messages";
import FAIcon from "../../FAIcon";
import { backend } from "@/lib/backend/clientsideBackend";

export default function SpeakersListAddingPolicyWidget() {
  const { showToast, toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);

  return (
    <>
      <ConfigWrapper
        title={m.addToSpeakersLists()}
        description={m.chooseSettingToAllowDelegateSelfAdding()}
      >
        <ToggleButton
          onLabel={m.allowed()}
          offLabel={m.notAllowed()}
          onIcon={<FAIcon icon="lock-open" />}
          offIcon={<FAIcon icon="lock" />}
          checked={committeeData?.allowDelegationsToAddThemselvesToSpeakersList}
          onChange={async (_e) => {
            if (!conferenceId || !committeeId) return;
            await backend
              .conference({ conferenceId })
              .committee({ committeeId })
              .patch({
                allowDelegationsToAddThemselvesToSpeakersList:
                  !committeeData?.allowDelegationsToAddThemselvesToSpeakersList,
              })
              .then((res) => {
                if (res.status === 200) {
                  showToast({
                    severity: "success",
                    summary: m.settingChanged(),
                    detail: res.data
                      ?.allowDelegationsToAddThemselvesToSpeakersList
                      ? m.delegatesCanNowAddThemselves()
                      : m.delegatesCannotAddThemselves(),
                  });
                } else {
                  throw new Error(
                    "Error while toggling the speakers list adding policy",
                  );
                }
              })
              .catch((err) => {
                toastError(err);
              });
          }}
        />
      </ConfigWrapper>
    </>
  );
}
