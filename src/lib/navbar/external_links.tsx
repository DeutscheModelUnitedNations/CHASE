import { useBackend } from "@/contexts/backend";
import { ConferenceIdContext } from "@/contexts/committee_data";
import { useBackendCall } from "@/hooks/useBackendCall";
import { useI18nContext } from "@/i18n/i18n-react";
import { useContext, useState } from "react";
import NavButton from "./button";
import VersionModal from "../version_modal";

export default function ExternalLinks() {
  const { backend } = useBackend();
  const conferenceId = useContext(ConferenceIdContext);
  const { LL } = useI18nContext();

  const [versionModalVisible, setVersionModalVisible] = useState(false);

  const [conferenceData] = useBackendCall(() => {
    //TODO
    // biome-ignore lint/style/noNonNullAssertion:
    return backend.conference({ conferenceId: conferenceId! }).get();
  }, false);

  return (
    <>
      {conferenceData?.pressWebsite && (
        <NavButton
          icon="newspaper"
          newWindow
          link={conferenceData?.pressWebsite ?? "/"}
          title={LL.navbar.NEWS()}
        />
      )}
      {conferenceData?.feedbackWebsite && (
        <NavButton
          icon="comment-exclamation"
          newWindow
          link={conferenceData?.feedbackWebsite ?? "/"}
          title={LL.navbar.BUG_REPORT()}
        />
      )}
      <NavButton
        icon="stars"
        onClick={() => {
          setVersionModalVisible(true);
        }}
        title={LL.home.VERSION_BUTTON()}
      />
      <VersionModal
        visible={versionModalVisible}
        setVisible={setVersionModalVisible}
        autoOpen
      />
    </>
  );
}
