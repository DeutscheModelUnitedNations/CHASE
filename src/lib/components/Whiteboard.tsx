import { Editor } from "primereact/editor";
import { Skeleton } from "primereact/skeleton";
import React from "react";

/**
 * This Component is a wrapper for the PrimeReact Editor Component.
 * It allows easy usage of the Editor Component as a Whiteboard.
 * @param value The value (content / text) of the Whiteboard in html format
 * @param readOnly Whether the Whiteboard is read only or not. When readOnly is true, the Header of the Editor is hidden.
 * @param setContentFunction The function that is called when the content of the Whiteboard changes
 * @param rest The rest of the props that are passed to the PrimeReact Editor Component
 * @returns A Whiteboard Component
 */

export default function ChairWhiteboard({
  value,
  readOnly = false,
  setContentFunction,
  ...rest
}: {
  value?: string | null;
  readOnly?: boolean;
  setContentFunction?: (content: string) => void;
  [key: string]: unknown;
}) {
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"], // blocks

    [{ header: 1 }, { header: 2 }, { header: [1, 2, 3, 4, 5, 6, false] }], // custom dropdown for headers

    [{ list: "ordered" }, { list: "bullet" }], // lists
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["code", "link"], // code, link

    ["clean"], // remove formatting button

    ["image", "video"], // image, video
  ];

  return (
    <>
      {value ? (
        <Editor
          {...rest}
          modules={
            !readOnly && {
              toolbar: toolbarOptions,
            }
          }
          className="rounded-md"
          showHeader={false}
          readOnly={readOnly}
          value={value ?? ""}
          onTextChange={(e) => {
            if (setContentFunction) {
              if (e.htmlValue) setContentFunction(e.htmlValue);
            } else {
              console.warn(
                "setWhiteboardContent is not defined. Whiteboard content will not be saved.",
              );
            }
          }}
        />
      ) : (
        <Skeleton width="100%" height="10rem" className="!bg-primary-900" />
      )}
    </>
  );
}
