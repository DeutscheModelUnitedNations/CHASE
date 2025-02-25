import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ conferenceId: string }>;
}) {
  redirect(`/app/${(await params).conferenceId}/hub/overview`);

  return <></>;
}
