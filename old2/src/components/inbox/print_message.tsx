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
import Button from "../button";
import type { BackendInstanceType } from "@/contexts/backend";
import { useI18nContext } from "@/i18n/i18n-react";
import getCountryNameByCode from "@/misc/get_country_name_by_code";
import type { TranslationFunctions } from "@/i18n/i18n-types";
import { $Enums } from "@prisma/generated/client";

type ChairMessages = Awaited<
  ReturnType<
    ReturnType<
      ReturnType<BackendInstanceType["conference"]>["committee"]
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
  const { LL, locale } = useI18nContext();

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
          <MessageDocument message={message} LL={LL} locale={locale} />
        </PDFViewer>
        <div className="flex justify-center items-center mt-4">
          <PDFDownloadLink
            document={
              <MessageDocument message={message} LL={LL} locale={locale} />
            }
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
  LL,
  locale,
}: {
  message: NonNullable<ChairMessages>[number];
  LL: TranslationFunctions;
  locale: string | undefined;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <View style={styles.section}>
            <View style={styles.headline}>
              <Text>{LL.messageBoard.pdf.HEADLINE()}</Text>
            </View>
            <View style={styles.from}>
              <Text>
                {LL.messageBoard.pdf.FROM()}{" "}
                {getCountryNameByCode(
                  message?.metaDelegation,
                  locale ?? "de-de",
                )}{" "}
                / {message.metaCommittee}
              </Text>
            </View>
            <Text>
              {LL.messageBoard.pdf.EMAIL()} {message.metaEmail}
            </Text>
            {message.category !== $Enums.MessageCategory.TO_CHAIR && (
              <Text>
                {LL.messageBoard.pdf.CATEGORY()} {message.category}
              </Text>
            )}
            <Text>
              {LL.messageBoard.pdf.TIME({
                date: new Date(message.timestamp).toLocaleDateString(locale, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                time: new Date(message.timestamp).toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
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
