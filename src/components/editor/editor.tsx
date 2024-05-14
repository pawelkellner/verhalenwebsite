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
  songText,
  required,
}: {
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
  songText?: string;
  required: boolean;
}) => {
  const [editorData, setEditorData] = useState(placeholder);

  useEffect(() => {
    setEditorData(placeholder);
  }, [placeholder]);

  useEffect(() => {
    if (songText) {
      setEditorData(songText);
    }
  }, [songText]);

  return (
    <div className={styles.input__group}>
      <Paragraph>
        {label}
        {required && "*"}
      </Paragraph>

      <CKEditor
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
    </div>
  );
};

export default TextEditor;
