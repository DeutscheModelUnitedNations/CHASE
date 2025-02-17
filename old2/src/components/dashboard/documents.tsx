import React from "react";
import WidgetTemplate from "@components/widget_template";
import Resolution from "@components/dashboard/documents/resolution";
import Draft from "@components/dashboard/documents/draft";
import Paper from "@components/dashboard/documents/paper";
import { ScrollPanel } from "primereact/scrollpanel";
import { Divider } from "primereact/divider";
import type { Document } from "@/custom_types/custom_types";
import { useI18nContext } from "@/i18n/i18n-react";
import FlipMove from "react-flip-move";

/**
 * This Component is used in the Documents Widget on the Dashboard. It displays
 * all documents grouped by their category. The categories are "resolution" (the adopted
 * resolutions of the current committee), "draft" (the draft resolutions), and "paper"
 * (the working papers of the users country or of other countries that have been shared
 * with the user).
 */

export default function DocumentsWidget({
  documents,
}: { documents: Document[] }) {
  const { LL } = useI18nContext();

  return (
    <>
      <WidgetTemplate
        cardTitle={LL.participants.dashboard.widgetHeadlines.DOCUMENTS()}
      >
        {/* TODO Find a better solution for height limiting */}
        <ScrollPanel className="custom-scrollbar" style={{ maxHeight: "50vh" }}>
          <FlipMove
            duration={500}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
            appearAnimation="fade"
          >
            {documents.map((document: Document) => {
              if (document.category === "adopted") {
                return (
                  <div key={document.documentId}>
                    <Resolution
                      documentId={document.documentId}
                      topic={document?.topic}
                    />
                  </div>
                );
              }
            })}
          </FlipMove>
          <Divider style={{ marginTop: "0.4em", marginBottom: "0.4em" }} />
          <FlipMove
            duration={500}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
            appearAnimation="fade"
          >
            {documents.map((document: Document) => {
              if (document.category === "draft") {
                return (
                  <div key={document.documentId}>
                    <Draft
                      documentId={document.documentId}
                      introducedBy={document.introducedBy}
                      sponsors={document.sponsors}
                    />
                  </div>
                );
              }
            })}
          </FlipMove>
          <Divider style={{ marginTop: "0.4em", marginBottom: "0.4em" }} />
          <FlipMove
            duration={500}
            enterAnimation="accordionVertical"
            leaveAnimation="accordionVertical"
            appearAnimation="fade"
          >
            {documents.map((document: Document) => {
              if (document.category === "paper") {
                return (
                  <div key={document.documentId}>
                    <Paper
                      documentId={document.documentId}
                      introducedBy={document.introducedBy}
                      sponsors={document.sponsors}
                      shared={document.shared}
                    />
                  </div>
                );
              }
            })}
          </FlipMove>
        </ScrollPanel>
      </WidgetTemplate>
    </>
  );
}
