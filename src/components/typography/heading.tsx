import React, { FC, CSSProperties } from "react";

interface HeadingProps {
  variant?: "xl" | "lg";
  fontWeight?: 200 | 300 | 400 | 500 | 600;
  children: React.ReactNode;
}

const Heading: FC<HeadingProps> = ({
  variant = "default",
  fontWeight = 400,
  children,
}) => {
  const getStyle = (variant: string, fontWeight: number): CSSProperties => {
    switch (variant) {
      case "xl":
        return {
          fontSize: "38px",
          lineHeight: "38px",
          fontWeight: fontWeight ? fontWeight : 500,
        };

      case "lg":
        return {
          fontSize: "26px",
          lineHeight: "26px",
          fontWeight: fontWeight ? fontWeight : 400,
        };

      default:
        return {
          fontSize: "26px",
          lineHeight: "26px",
          fontWeight: fontWeight ? fontWeight : 400,
        };
    }
  };

  const getHeadingTag = (variant: string): keyof JSX.IntrinsicElements => {
    switch (variant) {
      case "xl":
        return "h1";
      case "lg":
        return "h2";
      default:
        return "h2";
    }
  };

  const Tag = getHeadingTag(variant);

  return <Tag style={getStyle(variant, fontWeight)}>{children}</Tag>;
};

export default Heading;
