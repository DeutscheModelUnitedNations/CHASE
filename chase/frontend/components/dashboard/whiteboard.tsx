import React, { useContext, useState } from "react";
import WidgetTemplate from "@components/widget_template";
import { useI18nContext } from "@/i18n/i18n-react";
import Whiteboard from "@/components/whiteboard/whiteboard";
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
  const [fontSize, setFontSize] = useState<number>(18);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 1, 28));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 1, 12));

  return (
    <WidgetTemplate
      cardTitle={LL.participants.dashboard.widgetHeadlines.WHITEBOARD()}
      titleAdditionalContent={() => (
        <div className="flex items-center space-x-2">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={decreaseFontSize}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded">
            <i className="fas fa-minus" />
          </button>
          <span className="text-sm">{fontSize}</span>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={increaseFontSize}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded">
            <i className="fas fa-plus" />
          </button>
        </div>
      )}>
      {/* TODO find a better solution for scaling the Whitboard Box */}
      <div
        className="flex-1 flex bg-white rounded-md overflow-hidden"
        style={{ maxHeight: "50vh" }}>
        {whiteboardValue ? (
          <Whiteboard
            style={{ border: "none", fontSize: `${fontSize}px` }}
            value={whiteboardValue}
            readOnly={true}
            fontSize={fontSize}
          />
        ) : (
          <Skeleton width="100%" height="10rem" />
        )}
      </div>
    </WidgetTemplate>
  );
}
