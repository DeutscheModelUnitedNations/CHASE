"use client";
import React, { useContext, useEffect, useState } from "react";
import ConfigWrapper from "@/components/dashboard/chair/config_wrapper";
import { InputText } from "primereact/inputtext";
import { useI18nContext } from "@/i18n/i18n-react";
import { useBackendCall } from "@/hooks/useBackendCall";
import { useBackend } from "@/contexts/backend";
import Button from "@/components/button";
import { ConferenceIdContext } from "@/contexts/committee_data";
import { useToast } from "@/contexts/toast";

export default function loginVorsitz() {
  const { LL } = useI18nContext();
  const { backend } = useBackend();
  const conferenceId = useContext(ConferenceIdContext);
  const { showToast, toastError } = useToast();

  const [conferenceData, triggerConferenceData] = useBackendCall(() => {
    //TODO
    // biome-ignore lint/style/noNonNullAssertion:
    return backend.conference({ conferenceId: conferenceId! }).get();
  }, true);

  function updateURLs() {
    backend
      // TODO
      // biome-ignore lint/style/noNonNullAssertion:
      .conference({ conferenceId: conferenceId! })
      .patch({
        pressWebsite: pressURL,
        feedbackWebsite: feedbackURL,
      })
      .then(() => {
        if (!triggerConferenceData) return;
        triggerConferenceData();
        showToast({
          severity: "success",
          summary: LL.admin.onboarding.configs.successToast(),
        });
      })
      .catch((e) => {
        toastError(e);
      });
  }

  const [pressURL, setPressURL] = useState<string>("");
  const [feedbackURL, setFeedbackURL] = useState<string>("");

  useEffect(() => {
    triggerConferenceData();
  }, []);

  useEffect(() => {
    if (conferenceData?.pressWebsite) {
      setPressURL(conferenceData.pressWebsite);
    }
    if (conferenceData?.feedbackWebsite) {
      setFeedbackURL(conferenceData.feedbackWebsite);
    }
  }, [conferenceData]);

  function checkURL(url: string) {
    return url.match(/https?:\/\/.+/);
  }

  function UrlHasChanged(URL: string, URLToCompare: string | undefined | null) {
    if (!URLToCompare) return false;
    return URL !== URLToCompare;
  }

  return (
    <div className="flex flex-col gap-8">
      <URLConfiguration
        title={LL.admin.onboarding.configs.pressWebsiteTitle()}
        description={LL.admin.onboarding.configs.pressWebsiteDescription()}
        URL={pressURL}
        setURL={setPressURL}
        updateURLs={updateURLs}
        disabled={!checkURL(pressURL)}
      />
      <URLConfiguration
        title={LL.admin.onboarding.configs.feedbackWebsiteTitle()}
        description={LL.admin.onboarding.configs.feedbackWebsiteDescription()}
        URL={feedbackURL}
        setURL={setFeedbackURL}
        updateURLs={updateURLs}
        disabled={!checkURL(feedbackURL)}
      />
    </div>
  );
}

function URLConfiguration({
  title,
  description,
  URL,
  setURL,
  updateURLs,
  disabled,
}: {
  title: string;
  description: string;
  URL: string;
  setURL: (url: string) => void;
  updateURLs: () => void;
  disabled?: boolean;
}) {
  return (
    <ConfigWrapper title={title} description={description}>
      <div className="flex w-full gap-2">
        <InputText
          placeholder="https://"
          value={URL}
          onFocus={(e) => {
            if (e.target.value === "") {
              setURL("https://");
            }
          }}
          onChange={(e) => setURL(e.target.value)}
          className="w-full"
        />
        <Button
          faIcon="save"
          onClick={() => updateURLs()}
          disabled={disabled}
        />
      </div>
    </ConfigWrapper>
  );
}
