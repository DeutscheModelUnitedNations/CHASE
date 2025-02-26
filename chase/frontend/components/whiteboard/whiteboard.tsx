import { Editor } from "primereact/editor";
import { Skeleton } from "primereact/skeleton";
import React, { useEffect, useRef } from "react";

/**
 * This Component is a wrapper for the PrimeReact Editor Component.
 * It allows easy usage of the Editor Component as a Whiteboard.
 * @param value The value (content / text) of the Whiteboard in html format
 * @param readOnly Whether the Whiteboard is read only or not. When readOnly is true, the Header of the Editor is hidden.
 * @param setContentFunction The function that is called when the content of the Whiteboard changes
 * @param fontSize The font size to be applied to the editor content
 * @param rest The rest of the props that are passed to the PrimeReact Editor Component
 * @returns A Whiteboard Component
 */

export default function ChairWhiteboard({
  value,
  readOnly = false,
  setContentFunction,
  fontSize = 18,
  ...rest
}: {
  value?: string | null;
  readOnly?: boolean;
  setContentFunction?: (content: string) => void;
  fontSize?: number;
  [key: string]: unknown;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fontSize && editorRef.current) {
      const editorElement = editorRef.current.querySelector(
        ".p-editor-container .ql-container .ql-editor"
      ) as HTMLElement;
      if (editorElement) {
        editorElement.style.fontSize = `${fontSize}px`;
      }
    }
  }, [fontSize]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }, { header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["code", "link"],
    ["clean"],
    ["image", "video"],
  ];

  return (
    <div ref={editorRef}>
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
                "setWhiteboardContent is not defined. Whiteboard content will not be saved."
              );
            }
          }}
        />
      ) : (
        <Skeleton width="100%" height="10rem" className="!bg-primary-900" />
      )}
    </div>
  );
}
