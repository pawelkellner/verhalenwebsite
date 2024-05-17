import React from "react";
import Link from "next/link";

import Button, { ButtonProps } from "../button";

const LinkButton = ({
  children,
  href,
  onClick,
  className,
  buttonVariant,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
  buttonVariant?: ButtonProps["variant"];
}) => {
  return (
    <Link className={className} href={href}>
      <Button
        style={{ fontWeight: 300 }}
        variant={buttonVariant ? buttonVariant : "unstyled"}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
