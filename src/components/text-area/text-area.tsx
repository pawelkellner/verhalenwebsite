import "../text-input/text-input.scss";
import TextAreaProps from "./text-area.type";

const TextArea = ({ name, label, placeholder, rows, cols }: TextAreaProps) => {
  return (
    <div className="input__group">
      <label htmlFor={name}>{label}</label>
      <textarea
        style={{ resize: "none" }}
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
    </div>
  );
};

export default TextArea;
