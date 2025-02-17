import React, { useState } from "react";
import WidgetTemplate from "@components/widget_template";
import { Button } from "primereact/button";
import { useI18nContext } from "@/i18n/i18n-react";
import {
  ActionsOverlayChairMessage,
  ActionsOverlayResearchService,
} from "./actions_overlay";
import FAIcon from "../font_awesome_icon";

/**
 * This Component is used in the Actions Widget on the Dashboard.
 * The buttons of the widget open a dialog with a simple form that allows the user to contact the chair or the research team.
 */

export default function ActionsWidget() {
  const { LL } = useI18nContext();

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
        cardTitle={LL.participants.dashboard.widgetHeadlines.ACTIONS()}
      >
        <div className="flex-1 flex gap-2">
          <Button
            label={LL.participants.dashboard.actionsWidget.CHAIR_BUTTON()}
            className="flex-1"
            icon={<FAIcon icon="gavel" />}
            severity="warning"
            onClick={() => setDisplayChairDialog(true)}
          />
          <Button
            label={LL.participants.dashboard.actionsWidget.RESEARCH_SERVICE_BUTTON()}
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
