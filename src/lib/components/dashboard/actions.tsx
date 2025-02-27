import React, { useState } from "react";
import { Button } from "primereact/button";
import {
  ActionsOverlayChairMessage,
  ActionsOverlayResearchService,
} from "./actions_overlay";
import WidgetTemplate from "../WidgetTemplate";
import * as m from "@/paraglide/messages";
import FAIcon from "../FAIcon";

/**
 * This Component is used in the Actions Widget on the Dashboard.
 * The buttons of the widget open a dialog with a simple form that allows the user to contact the chair or the research team.
 */

export default function ActionsWidget() {
  const [displayChairDialog, setDisplayChairDialog] = useState(false);
  const [displayResearchDialog, setDisplayResearchDialog] = useState(false);

  return (
    <>
      <ActionsOverlayChairMessage
        showOverlay={displayChairDialog}
        setShowOverlay={setDisplayChairDialog}
      />
      <ActionsOverlayResearchService
        showOverlay={displayResearchDialog}
        setShowOverlay={setDisplayResearchDialog}
      />
      <WidgetTemplate
        cardTitle={m.sendRequest()}
      >
        <div className="flex flex-1 gap-2">
          <Button
            label={m.chair()}
            className="flex-1"
            icon={<FAIcon icon="gavel" />}
            severity="warning"
            onClick={() => setDisplayChairDialog(true)}
          />
          <Button
            label={m.researchSerivice()}
            className="flex-1"
            icon={<FAIcon icon="paper-plane" />}
            severity="help"
            onClick={() => setDisplayResearchDialog(true)}
          />
        </div>
      </WidgetTemplate>
    </>
  );
}
