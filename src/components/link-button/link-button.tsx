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
        variant={buttonVariant ? buttonVariant : "unstyled"}
        onClick={() => onClick}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
