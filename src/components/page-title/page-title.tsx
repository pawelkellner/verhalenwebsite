import React from "react";
import "./page-title.scss";
import Paragraph from "../typography/paragraph";

const PageTitle = ({
  title,
  noTopPadding,
}: {
  title: string;
  noTopPadding?: boolean;
}) => {
  return (
    <div className={`${!noTopPadding && "top__padding"}`}>
      <Paragraph variant="md">{title}</Paragraph>
      <div className="line" />
    </div>
  );
};

export default PageTitle;
