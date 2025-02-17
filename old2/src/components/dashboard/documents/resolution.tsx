import React from "react";
import Document from "@components/dashboard/documents/document_template";

/**
 * This Component is used in the Documents Widget on the Dashboard.
 * It it uses the Document Widget to generate a Box containing
 * a resolution's ID and its topic.
 */

export default function Resolution({
  documentId,
  topic,
}: { documentId: string; topic?: string }) {
  return (
    <Document documentId={documentId} icon="file-contract" topic={topic} />
  );
}
