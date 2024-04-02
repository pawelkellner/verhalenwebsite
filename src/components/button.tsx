import React, { FC, CSSProperties } from "react";

interface ButtonProps {
  variant?: "sm" | "md";
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ variant = "default", children }) => {
  const getStyle = (variant: string): CSSProperties => {
    switch (variant) {
      case "primary":
        return {
          fontSize: "20px",
        };
      case "secondary":
        return {
          fontSize: "14px",
        };
      default:
        return {
          fontSize: "14px",
        };
    }
  };

  return <p style={getStyle(variant)}>{children}</p>;
};

export default Button;
