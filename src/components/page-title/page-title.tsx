import React from "react";
import "./page-title.scss";
import Paragraph from "../typography/paragraph";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <>
      <Paragraph variant="md">{title}</Paragraph>
      <div className="line" />
    </>
  );
};

export default PageTitle;
