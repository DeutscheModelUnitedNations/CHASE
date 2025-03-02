import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Dialog } from "primereact/dialog";
import { $Enums } from "@prisma/client";
import type { backend } from "@/lib/backend/clientsideBackend";
import Button from "../Button";
import { getFullTranslatedCountryNameFromISO3Code } from "@/lib/nation";
import * as m from "@/paraglide/messages";
import { languageTag } from "@/paraglide/runtime";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<(typeof backend)["conference"]>["committee"]
    >["messages"]["get"]
  >
>["data"];

export default function PrintMessageDocument({
  message,
  showDialog,
  setShowDialog,
}: {
  message: NonNullable<ChairMessages>[number];
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
}) {
  return (
    <>
      <Dialog
        header="Print Message"
        visible={showDialog}
        style={{ width: "75vw" }}
        breakpoints={{ "641px": "100vw" }}
        onHide={() => setShowDialog(false)}
      >
        <PDFViewer width="100%" height="600">
          <MessageDocument message={message} />
        </PDFViewer>
        <div className="mt-4 flex items-center justify-center">
          <PDFDownloadLink
            document={<MessageDocument message={message} />}
            fileName={`${message.id}.pdf`}
          >
            {({ url, loading, error }) => (
              <Button
                label="Download PDF"
                faIcon="download"
                loading={loading}
                disabled={!!(!loading && !error && url)}
              />
            )}
          </PDFDownloadLink>
        </div>
      </Dialog>
    </>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: "30px",
    paddingRight: "200px",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    borderBottom: "1px solid #000",
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
    lineHeight: 1.5,
  },
  headline: {
    fontSize: 20,
    marginBottom: 10,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
  },
  from: {
    fontWeight: 900,
  },
});

// Create Document Component
function MessageDocument({
  message,
}: {
  message: NonNullable<ChairMessages>[number];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <View style={styles.section}>
            <View style={styles.headline}>
              <Text>{m.messageOfAParticipant()}</Text>
            </View>
            <View style={styles.from}>
              <Text>
                {m.from({ from: "" })}{" "}
                {getFullTranslatedCountryNameFromISO3Code(
                  message.metaDelegation ?? "",
                )}{" "}
                / {message.metaCommittee}
              </Text>
            </View>
            <Text>
              {m.email()} {message.metaEmail}
            </Text>
            {message.category !== $Enums.MessageCategory.TO_CHAIR && (
              <Text>
                {m.category()} {message.category}
              </Text>
            )}
            <Text>
              {m.receivedAt({
                date: new Date(message.timestamp).toLocaleDateString(
                  languageTag(),
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                ),
                time: new Date(message.timestamp).toLocaleTimeString(
                  languageTag(),
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                ),
              })}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.subject}>
            <Text>{message.subject}</Text>
          </View>
          <Text>{message.message}</Text>
        </View>
      </Page>
    </Document>
  );
}
