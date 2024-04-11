import React from "react";

const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <main className={`container ${className}`}>{children}</main>;
};

export default MainLayout;
