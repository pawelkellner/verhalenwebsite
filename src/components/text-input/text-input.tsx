import "./text-input.scss";
import TextInputProps from "./text-input.type";

const TextInput = ({
  type,
  name,
  label,
  placeholder,
  required = false,
  accept,
}: TextInputProps) => {
  return (
    <div className="input__group">
      <label htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        accept={accept && accept}
      />
    </div>
  );
};

export default TextInput;
