// "use client";
import React from "react";

import Image from "next/image";

import { fetchVerhalen } from "../../../../utils";

import styles from "../../../../story/page.module.scss";

import MainLayout from "../../../../../components/main-layout/main-layout";
import PlayButtonSvg from "../../../../../components/svg/PlayButtonSvg";
import PageTitle from "../../../../../components/page-title/page-title";
import Paragraph from "../../../../../components/typography/paragraph";
import Heading from "../../../../../components/typography/heading";
import AdminButtons from "../../../../../components/admin-buttons/admin-buttons";

export default async function Story({ params }: { params: { slug: string } }) {
  const slug = params.slug.toString();
  const verhalen = await fetchVerhalen();

  const story = verhalen?.find((story) => story.id === slug);
  const date = new Date(Number(story?.createdAt)).toLocaleString("en-US");

  return (
    <>
      <MainLayout>
        <PageTitle
          title={
            story?.storyTitle ? story.storyTitle : "Titel niet beschikbaar"
          }
          songTitle={story?.songTitle}
          paddingBottom={true}
          storyPage={true}
        />
        <div className={styles.story__content}>
          <div className={styles.story__story}>
            <div className={styles.story__titleMobile}>
              <Heading>{story?.storyTitle}</Heading>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: story?.storyText
                  ? story?.storyText
                  : "Tekst niet beschikbaar",
              }}
            />
          </div>
          <div className={styles.story__information}>
            <div className={styles.story__origin}>
              {story?.originText && <Paragraph>{story?.originText}</Paragraph>}
              <div className={styles.story__author}>
                <Paragraph>Verhaal geschreven door {story?.author}</Paragraph>

                <Paragraph>Gepubliceerd op 25 maart, 2024</Paragraph>
              </div>
            </div>
            {story?.quoteAuthor && (
              <div className={styles.story__quote}>
                <h1>“{story?.quoteText}”</h1>
                <Paragraph>- {story?.quoteAuthor}</Paragraph>
              </div>
            )}
            {story?.songImage && (
              <div className={styles.story__spotifyPlayer}>
                <span>
                  <Image
                    src={story?.songImage ? story?.songImage : ""}
                    alt={"album cover"}
                    fill
                  />
                  <span />
                  <PlayButtonSvg />
                </span>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
      <div className={styles.story__lyricsWrapper}>
        <MainLayout>
          <div>
            <Paragraph variant="md">
              Songtekst van &apos;{story?.songTitle}&apos;
            </Paragraph>
            <div
              dangerouslySetInnerHTML={{
                __html: story?.songText
                  ? story?.songText
                  : "Songtekst niet beschikbaar",
              }}
              className={styles.story__lyrics}
            />
          </div>
        </MainLayout>
      </div>
      <MainLayout>
        <AdminButtons slug={slug} />
      </MainLayout>
    </>
  );
}
