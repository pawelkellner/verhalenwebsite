"use client";
import { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Paragraph from "../typography/paragraph";
import styles from "../text-input/text-input.module.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextEditor = ({
  placeholder,
  label,
  onChange,
  value,
  required,
}: {
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  value?: string;
  required?: boolean;
}) => {
  const [editorData, setEditorData] = useState(placeholder);

  useEffect(() => {
    if (value) {
      setEditorData(value);
    }
  }, [value]);

  return (
    <div data-editor={true} className={styles.input__group}>
      <Paragraph variant="sm">
        {label}
        {required && "*"}
      </Paragraph>

      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default TextEditor;
