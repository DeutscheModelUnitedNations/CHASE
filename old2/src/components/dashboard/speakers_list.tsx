import React from "react";
import WidgetTemplate from "@/components/widget_template";
import SpeakerBlock from "@/components/speakers_list/speaker_block";
import CommentBlock from "@/components/speakers_list/comment_block";
import QueueBlock from "@/components/speakers_list/queue_block";
import { useI18nContext } from "@/i18n/i18n-react";
import "./markdown.scss";
import { AnimatePresence, motion } from "framer-motion";
import { $Enums } from "@prisma/generated/client";
import { SpeakersListDataProvider } from "@/contexts/speakers_list_data";

/**
 * This Component is used in the Dashboard. It uses several components
 * of the speakers list realm to create a widget with the current speaker,
 * the current speaker's comment, and the queues for speakers and comments lists.
 * The queues use the special QueueBlock component, which is a condensed and more
 * compact way of displaying the queue (as opposed to the QueueList on the speakers list page).
 */

export default function SpeakersListWidget() {
  const { LL } = useI18nContext();

  return (
    <>
      <SpeakersListDataProvider
        typeOfList={$Enums.SpeakersListCategory.SPEAKERS_LIST}
      >
        <WidgetTemplate
          cardTitle={LL.participants.dashboard.widgetHeadlines.SPEAKERS_LIST()}
        >
          <div className="flex-1 flex flex-col gap-3">
            <SpeakerBlock />

            <SpeakersListDataProvider
              typeOfList={$Enums.SpeakersListCategory.COMMENT_LIST}
            >
              <AnimatePresence>
                <motion.div
                  key={"commentBlock"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <CommentBlock>
                    <SpeakerBlock />
                    <QueueBlock />
                  </CommentBlock>
                </motion.div>
              </AnimatePresence>
            </SpeakersListDataProvider>

            <QueueBlock />
          </div>
        </WidgetTemplate>
      </SpeakersListDataProvider>
    </>
  );
}
