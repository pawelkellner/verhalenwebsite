import { useEffect } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import styles from "../text-input/text-input.module.scss";

import Paragraph from "../typography/paragraph";

const TextEditor = ({
  placeholder,
  label,
  onChange,
  value,
  required,
}: {
  placeholder: string;
  label: string;
  onChange: (e) => void;
  value: React.ReactNode;
  required: boolean;
}) => {
  return (
    <div className={styles.input__group}>
      <Paragraph>
        {label}
        {required && "*"}
      </Paragraph>
      <CKEditor
        editor={ClassicEditor}
        data={placeholder}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default TextEditor;
