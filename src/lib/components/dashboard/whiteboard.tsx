import React, { useContext } from "react";
import { Skeleton } from "primereact/skeleton";
import { CommitteeDataContext } from "@/lib/contexts/committee_data";
import WidgetTemplate from "../WidgetTemplate";
import Whiteboard from "../Whiteboard";
import * as m from "@/paraglide/messages";

/**
 * This Component is used in the Dashboard. It displays the Whiteboard Widget.
 * The Whiteboard Widget is a Markdown Viewer that allows the chairs to write
 * notes for the participants. For example, the chairs can write down important
 * information regarding the conference, organizational information, as well as
 * relevant contact information for different issues.
 */

export default function WhiteboardWidget() {
  const whiteboardValue = useContext(CommitteeDataContext)?.whiteboardContent;

  return (
    <WidgetTemplate cardTitle={m.whiteboard()}>
      {/* TODO find a better solution for scaling the Whitboard Box */}
      <div
        className="flex flex-1 overflow-hidden rounded-md bg-white"
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
