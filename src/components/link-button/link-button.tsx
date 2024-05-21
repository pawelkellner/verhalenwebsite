import React, { CSSProperties } from "react";
import Link from "next/link";

import Button, { ButtonProps } from "../button";

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
  style?: CSSProperties;
}

const LinkButton = ({
  children,
  href,
  onClick,
  className,
  buttonVariant,
  style,
}: LinkButtonProps) => {
  return (
    <Link
      className={className}
      href={href}
      style={{ ...style, fontWeight: 300 }}
    >
      <Button
        style={{ width: "100%" }}
        variant={buttonVariant ? buttonVariant : "unstyled"}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
