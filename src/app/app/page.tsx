"use client";
import * as m from "@/paraglide/messages";
import FAIcon from "@/lib/components/FAIcon";
import { Card } from "primereact/card";
import { redirect } from "next/navigation";
import { useClientSideBackendCall } from "@/lib/backend/useClientSideBackendCall";

export default function Page() {
  const { value: conferences, pending } = useClientSideBackendCall(
    async (backend) => backend.conference.get(),
  );

  if (!pending) {
    if (conferences.length === 1) {
      redirect(`/app/${conferences[0].id}`);
    }
  }

  //TODO this needs some stylish Tadification
  return (
    <div>
      {pending && <p>Loading...</p>}
      {!pending && (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
          {conferences.length === 0
            ? m.noConferencesFound()
            : conferences.map((conference) => (
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
      )}
    </div>
  );
}
