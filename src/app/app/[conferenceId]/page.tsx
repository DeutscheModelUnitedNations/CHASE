import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ conferenceId: string }>;
}) {
  // TODO add logic to redirect to the correct page, not just the team page
  redirect(`/app/${(await params).conferenceId}/hub/team/committees`);

  return <></>;
}
