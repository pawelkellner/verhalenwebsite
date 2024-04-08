import React, { FC, CSSProperties } from "react";
import { theme } from "../theme";

interface ButtonProps {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "neutral" | "disabled" | "unstyled";
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  onClick,
  variant = "default",
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
          color: theme.grey[400],
        };
      case "disabled":
        return {
          background: theme.grey[100],
          borderColor: theme.grey[100],
          color: theme.grey[300],
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
    <button onClick={onClick} style={getStyle(variant)}>
      {children}
    </button>
  );
};

export default Button;
