import React, { FC, CSSProperties } from "react";
import { theme } from "../theme";

interface ButtonProps {
  variant?: "primary" | "secondary" | "neutral" | "disabled";
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = "default", children }) => {
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
      default:
        return {
          background: theme.grey[100],
          borderColor: theme.grey[100],
          color: theme.grey[400],
        };
    }
  };

  return <button style={getStyle(variant)}>{children}</button>;
};

export default Button;
