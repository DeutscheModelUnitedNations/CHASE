import React, { useContext } from "react";
import WidgetTemplate from "@components/widget_template";
import { useI18nContext } from "@/i18n/i18n-react";
import Whiteboard from "@/components/whiteboard";
import { Skeleton } from "primereact/skeleton";
import { CommitteeDataContext } from "@/contexts/committee_data";

/**
 * This Component is used in the Dashboard. It displays the Whiteboard Widget.
 * The Whiteboard Widget is a Markdown Viewer that allows the chairs to write
 * notes for the participants. For example, the chairs can write down important
 * information regarding the conference, organizational information, as well as
 * relevant contact information for different issues.
 */

export default function WhiteboardWidget() {
  const { LL } = useI18nContext();
  const whiteboardValue = useContext(CommitteeDataContext)?.whiteboardContent;

  return (
    <WidgetTemplate
      cardTitle={LL.participants.dashboard.widgetHeadlines.WHITEBOARD()}
    >
      {/* TODO find a better solution for scaling the Whitboard Box */}
      <div
        className="flex-1 flex bg-white rounded-md overflow-hidden"
        style={{ maxHeight: "50vh" }}
      >
        {whiteboardValue ? (
          <Whiteboard
            style={{ border: "none" }}
            value={whiteboardValue}
            readOnly={true}
          />
        ) : (
          <Skeleton width="100%" height="10rem" />
        )}
      </div>
    </WidgetTemplate>
  );
}
