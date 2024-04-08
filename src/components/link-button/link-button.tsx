import React from "react";
import Link from "next/link";

import Button from "../button";

const LinkButton = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={href}>
      <Button variant="unstyled" onClick={() => onClick}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
