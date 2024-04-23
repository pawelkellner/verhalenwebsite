import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Paragraph from "../typography/paragraph";
import styles from "../text-input/text-input.module.scss";

const DynamicCKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor),
  { loading: () => <div>Loading CKEditor...</div> }
);

const TextEditor = ({
  placeholder,
  label,
  onChange,
  required,
}: {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  required: boolean;
}) => {
  const [editorData, setEditorData] = useState(placeholder);

  useEffect(() => {
    setEditorData(placeholder);
  }, [placeholder]);

  return (
    <div className={styles.input__group}>
      <Paragraph>
        {label}
        {required && "*"}
      </Paragraph>
      {typeof window !== "undefined" && ( // Check if window is defined
        <DynamicCKEditor
          editor={ClassicEditor}
          data={editorData}
          onReady={(editor) => {
            editor.setData(placeholder);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      )}
    </div>
  );
};

export default TextEditor;
