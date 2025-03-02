import { useContext, useEffect } from "react";
import type { $Enums } from "@prisma/generated/client";
import { useRouter } from "next/navigation";
import { useUserIdent } from "../contexts/user_ident";
import { ConferenceIdContext } from "../contexts/committee_data";

export default function Lockout({
  whitelist,
}: {
  whitelist: $Enums.ConferenceRole[];
}) {
  const router = useRouter();
  const conferenceId = useContext(ConferenceIdContext);
  const { userIdent } = useUserIdent();

  useEffect(() => {
    if (!userIdent?.conferenceMemberships || !conferenceId) {
      return;
    }

    if (
      !(whitelist as ($Enums.ConferenceRole | undefined)[]).includes(
        // TODO fix this type error
        // @ts-ignore
        userIdent.conferenceMemberships.find(
          (c) => c.conference.id === conferenceId,
        )?.role,
      )
    ) {
      router.push("/lockout");
      return;
    }
  }, [userIdent]);

  return null;
}
