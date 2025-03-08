import NavbarButton from "./NavbarButton";
import * as m from "@/paraglide/messages";

interface Props {
  pressWebsite?: string;
  feedbackWebsite?: string;
}

export default function ExternalNavbarLinks({
  feedbackWebsite,
  pressWebsite,
}: Props) {
  return (
    <>
      {pressWebsite && (
        <NavbarButton
          icon="newspaper"
          newWindow
          link={pressWebsite}
          title={m.conferencePress()}
        />
      )}
      {feedbackWebsite && (
        <NavbarButton
          icon="comment-exclamation"
          newWindow
          link={feedbackWebsite}
          title={m.feedback()}
        />
      )}
    </>
  );
}
