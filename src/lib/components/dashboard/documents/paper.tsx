import React from "react";
import Document from "@/lib/components/dashboard/documents/document_template";
import type { CountryCode } from "@/lib/types/types";

/**
 * This Component is used in the Documents Widget on the Dashboard.
 * It it uses the Document Widget to generate a Box containing
 * a paper's ID, its sponsors, and a flag of the country.
 */

export default function Paper({
  documentId,
  introducedBy,
  sponsors,
  shared,
}: {
  documentId: string;
  introducedBy: CountryCode;
  sponsors?: string[];
  shared?: boolean;
}) {
  return (
    <Document
      documentId={documentId}
      icon="clipboard"
      introducedBy={introducedBy}
      sponsors={sponsors}
      shared={shared}
    />
  );
}
