import React from "react";
import styles from "./styles.module.scss";
import Paragraph from "../typography/paragraph";
import Heading from "../typography/heading";
import MusicSvg from "../svg/MusicSvg";

const PageTitle = ({
  title,
  noTopPadding,
  storyPage,
  paddingBottom,
  songTitle
}: {
  title: string;
  noTopPadding?: boolean;
  paddingBottom?: boolean;
  storyPage?: boolean;
  songTitle?: string;
}) => {
  return (
    <div className={`${!noTopPadding && styles.top__padding}`} data-padding-bottom={paddingBottom && true}>
        <div className={styles.title_wrapper} data-story-page={storyPage && true}>
            { songTitle ? (
            <>
                <Heading variant="lg">{title}</Heading>
                <div>
                  <div className={styles.scrollingText__container}>
                    <Paragraph variant="md" >{songTitle}</Paragraph>
                  </div>
                    <MusicSvg/>
                </div>
            </>
            ) : (
                <Paragraph variant="md">{title}</Paragraph>
            )}
        </div>
      <div className={styles.line} />
    </div>
  );
};

export default PageTitle;
