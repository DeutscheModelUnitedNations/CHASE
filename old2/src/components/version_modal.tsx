import React, { useState, useEffect } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { Dialog } from "primereact/dialog";
import Markdown from "react-markdown";
import Button from "./button";
import Link from "next/link";
import SmallInfoCard from "./small_info_card";
import FAIcon from "./font_awesome_icon";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function VersionModal({
  visible,
  setVisible,
  autoOpen,
}: {
  visible: boolean;
  setVisible: (arg: boolean) => void;
  autoOpen?: boolean;
}) {
  const { LL, locale } = useI18nContext();

  // biome-ignore lint/suspicious/noExplicitAny: Type not known, github API response
  const [releases, setReleases] = useState<any[]>([]);
  const [version, setVersion] = useState<string>("DEV");

  useEffect(() => {
    const v = process.env.NEXT_PUBLIC_VERSION || "DEV";
    setVersion(v);

    if (
      localStorage.getItem("munify_version_modal_seen_with_version") !== v &&
      autoOpen
    ) {
      setVisible(true);
      localStorage.setItem("munify_version_modal_seen_with_version", v);
    }

    fetch(
      "https://api.github.com/repos/deutschemodelunitednations/munify/releases",
    )
      .then((res) => res.json())
      .then((data) => {
        setReleases(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Dialog
        header={
          <>
            <FAIcon icon="stars" className="mr-3 text-orange-400" />
            {LL.version.VERSION_MODAL_TITLE()}
          </>
        }
        visible={visible}
        style={{ width: "70vw" }}
        onHide={() => setVisible(false)}
        dismissableMask
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {LL.version.VERSION()}
        </h1>
        <div className="text-2xl font-mono font-bold text-white py-4 px-4 rounded-lg bg-primary-500 flex justify-center items-center mb-2">
          <FAIcon icon="tag" className="mr-3" />
          {version}
        </div>
        {version !== releases[0]?.name ? (
          version === "DEV" ? (
            <SmallInfoCard icon="construction">
              <div className="flex flex-col">
                <h3 className="font-bold">
                  {LL.version.DEVELOPMENT_VERSION()}
                </h3>
                <p>{LL.version.DEVELOPMENT_VERSION_TEXT()}</p>
              </div>
            </SmallInfoCard>
          ) : (
            <SmallInfoCard icon="stars">
              <div className="flex flex-col">
                <h3 className="font-bold">
                  {LL.version.NEW_VERSION_AVAILABLE()}
                </h3>
                <p>{LL.version.NEW_VERSION_AVAILABLE_TEXT()}</p>
              </div>
            </SmallInfoCard>
          )
        ) : (
          <SmallInfoCard
            icon="check"
            classNameForContentBox="bg-green-500"
            classNameForIconBox="bg-green-500 text-green-500 border-green-500"
          >
            <div className="flex flex-col">
              <h3 className="font-bold">{LL.version.LATEST_VERSION()}</h3>
              <p>{LL.version.LATEST_VERSION_TEXT()}</p>
            </div>
          </SmallInfoCard>
        )}

        <h1 className="text-3xl font-bold text-slate-900 mb-2 mt-10">
          {LL.version.CHANGELOG()}
        </h1>
        <p className="text-slate-900 mb-4 text-sm">
          {LL.version.CHANGELOG_TEXT()}
        </p>
        <div className="flex flex-col gap-2">
          {releases.length > 0 ? (
            releases.map((release, i) => {
              if (i > 5) return null;
              return (
                <div
                  key={release.id}
                  className="p-4 bg-primary-950 rounded-lg flex flex-col gap-2 justify-start items-start"
                >
                  <div className="flex gap-2 items-start justify-between w-full mb-2">
                    <Link
                      className="text-2xl font-mono font-bold text-white py-2 px-4 rounded-lg bg-primary-500 flex justify-center items-center"
                      href={release.html_url}
                    >
                      <FAIcon icon="tag" className="mr-3" />
                      {release.name}
                    </Link>
                    <div className="text-slate-900">
                      {new Date(release.published_at).toLocaleString(locale, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </div>
                  <Markdown
                    rehypePlugins={[remarkGfm, rehypeRaw, rehypeSanitize]}
                    className="prose prose-sm !max-w-full w-full overflow-x-scroll"
                  >
                    {release.body}
                  </Markdown>
                </div>
              );
            })
          ) : (
            <FAIcon icon="circle-notch" spin />
          )}
          <Button
            label={LL.version.ALL_RELEASES()}
            onClick={() =>
              window.open(
                "https://github.com/deutschemodelunitednations/munify/releases",
              )
            }
            faIcon="external-link"
            className="mt-4"
          />
        </div>
      </Dialog>
    </>
  );
}
