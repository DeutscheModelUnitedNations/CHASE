import React, { useContext } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackend } from "@/contexts/backend";
import { useToast } from "@/contexts/toast";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import { faLock, faLockOpen } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton } from "primereact/togglebutton";
import {
  CommitteeDataContext,
  CommitteeIdContext,
  ConferenceIdContext,
} from "@/contexts/committee_data";

export default function SpeakersListAddingPolicyWidget() {
  const { LL } = useI18nContext();
  const { showToast, toastError } = useToast();
  const conferenceId = useContext(ConferenceIdContext);
  const { backend } = useBackend();
  const committeeId = useContext(CommitteeIdContext);
  const committeeData = useContext(CommitteeDataContext);

  return (
    <>
      <ConfigWrapper
        title={LL.chairs.dashboard.configurations.speakersListAdding.TITLE()}
        description={LL.chairs.dashboard.configurations.speakersListAdding.DESCRIPTION()}
      >
        <ToggleButton
          onLabel={LL.chairs.dashboard.configurations.speakersListAdding.TOGGLE_BUTTON_ALLOWED()}
          offLabel={LL.chairs.dashboard.configurations.speakersListAdding.TOGGLE_BUTTON_NOT_ALLOWED()}
          onIcon={<FontAwesomeIcon icon={faLockOpen} />}
          offIcon={<FontAwesomeIcon icon={faLock} />}
          checked={committeeData?.allowDelegationsToAddThemselvesToSpeakersList}
          onChange={async (_e) => {
            if (!conferenceId || !committeeId) return;
            await backend
              .conference({ conferenceId })
              .committee({ committeeId })
              .delegations.toggleAllowAddingThemselvesToSpeakersList.post()
              .then((res) => {
                if (res.status === 200) {
                  showToast({
                    severity: "success",
                    summary:
                      LL.chairs.dashboard.configurations.speakersListAdding.TOAST_SUCCESS(),
                    detail: res.data
                      ?.allowDelegationsToAddThemselvesToSpeakersList
                      ? LL.chairs.dashboard.configurations.speakersListAdding.TOAST_SUCCESS_DETAILS_ALLOWED()
                      : LL.chairs.dashboard.configurations.speakersListAdding.TOAST_SUCCESS_DETAILS_NOT_ALLOWED(),
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
