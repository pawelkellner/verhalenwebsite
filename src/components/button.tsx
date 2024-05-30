import React, { FC, CSSProperties } from "react";
import { theme } from "../theme";

export interface ButtonProps {
  onClick?: (value?) => void;
  variant?:
    | "primary"
    | "secondary"
    | "neutral"
    | "alert"
    | "warning"
    | "disabled"
    | "underlined"
    | "unstyled";
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}
const Button: FC<ButtonProps> = ({
  onClick,
  variant = "default",
  className,
  style: customStyle,
  children,
}) => {
  const getStyle = (variant: string): CSSProperties => {
    switch (variant) {
      case "primary":
        return {
          background: theme.primary,
          borderColor: theme.primary,
          color: theme.white,
        };
      case "secondary":
        return {
          background: "none",
          color: theme.primary,
          borderColor: theme.primary,
        };
      case "neutral":
        return {
          background: theme.grey[100],
          borderColor: theme.grey[100],
          color: theme.grey[500],
        };
        case "alert":
        return {
          background: "none",
          borderColor: "#ef4444",
          color: "#ef4444",
        };
      case "warning":
        return {
          background: "#ef4444",
          borderColor: "#ef4444",
          color: theme.white,
        };
      case "disabled":
        return {
          background: theme.grey[100],
          borderColor: theme.grey[100],
          color: theme.grey[300],
        };
      case "underlined":
        return {
          background: "none",
          color: "inherit",
          border: "none",
          padding: 0,
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
          textDecoration: "underline",
        };
      case "unstyled":
        return {
          background: "none",
          color: "inherit",
          border: "none",
          padding: 0,
          font: "inherit",
          cursor: "pointer",
          outline: "inherit",
        };
      default:
        return {
          background: theme.grey[100],
          borderColor: theme.grey[100],
          color: theme.grey[400],
        };
    }
  };
  return (
    <button
      onClick={onClick}
      style={{ ...getStyle(variant), ...customStyle }}
      className={className}
    >
      {children}
    </button>
  );
};
export default Button;
