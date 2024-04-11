import React from "react";
import Link from "next/link";

import Button, { ButtonProps } from "../button";

const LinkButton = ({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <Link className={className} href={href}>
      <Button variant="unstyled" onClick={() => onClick}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
