import * as m from "@/paraglide/messages";
import FAIcon from "@/lib/components/FAIcon";
import { Card } from "primereact/card";
import { serversideBackend } from "@/lib/backend/serversideBackend";
import { redirect } from "next/navigation";

export default async function Page() {
  const conferences = await serversideBackend.conference.get();
  if (conferences.error) {
    throw conferences.error;
  }

  if (conferences.data.length === 1) {
    redirect(`/app/${conferences.data[0].id}`);
  }

  //TODO this needs some stylish Tadification
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {conferences.data.length === 0
          ? m.noConferencesFound()
          : conferences.data.map((conference) => (
              <a href={`/app/${conference.id}`} key={conference.id}>
                <Card title={conference.name}>
                  {conference.start && (
                    <p>
                      <FAIcon icon="play" />{" "}
                      {new Date(conference.start).toLocaleDateString()}
                    </p>
                  )}
                  {conference.end && (
                    <p>
                      <FAIcon icon="stop" />{" "}
                      {new Date(conference.end).toLocaleDateString()}
                    </p>
                  )}
                </Card>
              </a>
            ))}
      </div>
    </>
  );
}
