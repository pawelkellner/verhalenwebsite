import styles from "./text-input.module.scss";
import TextInputProps from "./text-input.type";

const TextInput = ({
  type,
  name,
  label,
  placeholder,
  onChange,
  value,
  required = false,
  accept,
  style,
}: TextInputProps) => {
  return (
    <div className={styles.input__group} style={style}>
      <label style={{ fontSize: 18 }} htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        accept={accept && accept}
      />
    </div>
  );
};

export default TextInput;
