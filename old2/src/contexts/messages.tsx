import { useBackend } from "@/contexts/backend";
import react, { createContext, useContext, useEffect } from "react";
import { CommitteeIdContext, ConferenceIdContext } from "./committee_data";
import { useToast } from "./toast";

export const MessageCountContext = createContext(
  {} as {
    messageCount: number;
    setMessageCount: (count: number) => void;
  },
);

/**
 * This Component provides a context for the message count.
 * It is used to show the number of unread messages in the navbar.
 * The message count is fetched from the backend.
 * @param children
 */

export function MessageCountProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backend } = useBackend();
  const conferenceId = useContext(ConferenceIdContext);
  const committeeId = useContext(CommitteeIdContext);
  const { toastError } = useToast();

  const [messageCount, setMessageCount] = react.useState(0);
  const [_toastShown, setToastShown] = react.useState(false);

  async function getGlobalMessageCount() {
    if (!conferenceId) return;
    backend
      .conference({ conferenceId })
      .messages.count.get()
      .then((res) => {
        if (res.status === 200) {
          const newCount = res.data;
          if (newCount !== messageCount) {
            setToastShown(false);
          }
          // if (newCount > messageCount && !toastShown) {
          //   showToast({
          //     severity: "info",
          //     summary: LL.messageBoard.toast.NEW_MESSAGE_SUMMARY(),
          //     detail: LL.messageBoard.toast.NEW_MESSAGE_DETAIL(),
          //   });
          //   setToastShown(true);
          // }
          setMessageCount(newCount || 2);
        }
      })
      .catch((err) => {
        toastError(err);
      });
  }

  async function getCommitteeMessageCount() {
    if (!conferenceId || !committeeId) return;
    backend
      .conference({ conferenceId })
      .committee({ committeeId })
      .messages.count.get()
      .then((res) => {
        if (res.status === 200) {
          const newCount = res.data;
          if (newCount !== messageCount) {
            setToastShown(false);
          }
          // if (newCount > messageCount && !toastShown) {
          //   showToast({
          //     severity: "info",
          //     summary: LL.messageBoard.toast.NEW_MESSAGE_SUMMARY(),
          //     detail: LL.messageBoard.toast.NEW_MESSAGE_DETAIL(),
          //   });
          //   setToastShown(true);
          // }
          setMessageCount(newCount ?? 0);
        }
      })
      .catch((err) => {
        toastError(err);
      });
  }

  useEffect(() => {
    if (committeeId) {
      getCommitteeMessageCount();
    } else {
      getGlobalMessageCount();
    }
    const intervalAPICall = setInterval(() => {
      if (committeeId) {
        getCommitteeMessageCount();
      } else {
        getGlobalMessageCount();
      }
    }, 15000);
    return () => clearInterval(intervalAPICall);
  }, [committeeId]);

  return (
    <MessageCountContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessageCountContext.Provider>
  );
}
