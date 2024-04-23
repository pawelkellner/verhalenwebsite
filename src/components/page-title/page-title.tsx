import React from "react";
import style from "./page-title.module.scss";
import Paragraph from "../typography/paragraph";

const PageTitle = ({
  title,
  noTopPadding,
}: {
  title: string;
  noTopPadding?: boolean;
}) => {
  return (
    <div className={!noTopPadding ? style.top__padding : ""}>
      <Paragraph variant="md">{title}</Paragraph>
      <div className={style.line} />
    </div>
  );
};

export default PageTitle;
