import React, { FC, CSSProperties } from "react";

interface ParagraphProps {
  variant?: "sm" | "md";
  color?: string;
  fontWeight?: 200 | 300 | 400 | 500 | 600;
  children?: React.ReactNode;
}

const Paragraph: FC<ParagraphProps> = ({
  variant = "default",
  color = "",
  fontWeight = 300,
  children,
}) => {
  const getStyle = (
    variant: string,
    color: string,
    fontWeight: number
  ): CSSProperties => {
    switch (variant) {
      case "md":
        return {
          fontSize: "20px",
          lineHeight: "24px",
          fontWeight: fontWeight,
          color: color && color,
        };
      case "sm":
        return {
          fontSize: "18px",
          lineHeight: "22px",
          fontWeight: fontWeight,
          color: color && color,
        };
      default:
        return {
          fontSize: "14px",
          lineHeight: "18px",
          fontWeight: fontWeight,
          color: color && color,
        };
    }
  };

  return <p style={getStyle(variant, color, fontWeight)}>{children || ''}</p>;
};

export default Paragraph;
