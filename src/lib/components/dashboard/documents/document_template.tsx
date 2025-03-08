import type { CountryCode } from "@/lib/types/types";
import React from "react";
import WidgetBoxTemplate from "../../WidgetBoxTemplate";
import FAIcon from "../../FAIcon";
import { SmallFlag } from "../../Flag";
import * as m from "@/paraglide/messages";

interface DocumentProps {
  documentId: string;
  introducedBy?: CountryCode;
  sponsors?: string[];
  shared?: boolean;
  icon: string;
  topic?: string;
}

/**
 * This Component is used in the Documents Widget on the Dashboard.
 * It creates Boxes, each containing a document's ID, its sponsors,
 * its topic, and a flag of the country. It is not used directly,
 * but rather through the individual document components "paper",
 * "draft" and "resolution".
 */

export default function Document({
  documentId,
  introducedBy,
  sponsors,
  shared,
  icon,
  topic,
}: DocumentProps) {
  return (
    <WidgetBoxTemplate>
      <FAIcon
        icon={icon}
        className="text-gray-icon text-2xl dark:text-primary-500"
      />
      <div className="flex-1 flex-col items-center justify-start">
        <div className="text-gray-text text-sm font-semibold dark:text-primary-800">
          {documentId}
        </div>
        {sponsors && (
          <div className="text-gray-icon text-xs dark:text-primary-800">
            {`${sponsors.length} ${m.signedSupporters()}`}
          </div>
        )}
        {topic && (
          <div className="text-gray-icon text-xs dark:text-primary-800">
            {topic}
          </div>
        )}
      </div>
      {shared && (
        <FAIcon
          icon="share-nodes"
          className="text-gray-icon dark:text-primary-800"
        />
      )}
      {introducedBy && <SmallFlag countryCode={introducedBy} />}
    </WidgetBoxTemplate>
  );
}
