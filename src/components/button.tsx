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
          borderStyle: "solid",
          border: 1,
        };
      case "neutral":
        return {
          background: theme.primary,
          borderColor: theme.primary,
          color: theme.primary,
          borderStyle: "solid",
          border: 1,
        };
      case "disabled":
        return {
          background: theme.primary,
          borderColor: theme.primary,
        };
      default:
        return {
          background: "none",
          color: theme.primary,
          borderColor: theme.primary,
          borderStyle: "solid",
          border: 1,
        };
    }
  };

  return <button style={getStyle(variant)}>{children}</button>;
};

export default Button;
