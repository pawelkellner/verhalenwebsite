"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import { Verhaal } from "../../../../../utils";

import styles from "../../../../story/page.module.scss";

import MainLayout from "../../../../../components/main-layout/main-layout";
import PlayButtonSvg from "../../../../../components/svg/PlayButtonSvg";
import PageTitle from "../../../../../components/page-title/page-title";
import Paragraph from "../../../../../components/typography/paragraph";
import Heading from "../../../../../components/typography/heading";
import AdminButtons from "../../../../../components/admin-buttons/admin-buttons";
import { useStories } from "../../../../../components/posts-provider/postsProvider";
import Button from "../../../../../components/button";
import { getFileExtensionFromUrl } from "../../../../../utils";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../auth-context";
import { isUserLoggedIn } from "../../../../actions";

export default function Story({ params }: { params: { slug: string } }) {
  const { stories } = useStories();
  const router = useRouter();
  const [story, setStory] = useState<Verhaal>();
  const { state } = useAuth();

  const monthsArray = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "october",
    "november",
    "december",
  ];

  const fileUrl = story?.storyFileUrl;
  const fileExtension = getFileExtensionFromUrl(fileUrl);
  const allowedExtensions = ["pdf", "readme", "txt"];
  const isAllowedFileType = allowedExtensions.includes(fileExtension);

  let date: string = "";
  const slug = params.slug.toString();

  useEffect(() => {
    if (!state.isUserAuthenticated) {
      router.replace("/admin");
      return;
    }
  }, []);

  useEffect(() => {
    if (stories) {
      setStory(stories.find((item) => item.id === slug));
    }
  }, [stories]);

  if (story) {
    const jsUnixTS =
      (story.createdAt.seconds + story.createdAt.nanoseconds * 10 ** -9) * 1000;
    const fullDate = new Date(jsUnixTS);

    date = `${fullDate.getDate()} ${
      monthsArray[fullDate.getMonth()]
    }, ${fullDate.getFullYear()}`;
  }

  if (state.isUserAuthenticated)
    return (
      <>
        <MainLayout>
          <PageTitle
            title={
              story?.storyTitle ? story.storyTitle : "Titel niet beschikbaar"
            }
            songTitle={
              story?.song
                ? `${story?.song.name} - ${story?.song.artist}`
                : story?.songTitle
            }
            paddingBottom={true}
            storyPage={true}
          />
          <div className={styles.story__content}>
            <div className={styles.story__story}>
              <div className={styles.story__titleMobile}>
                <Heading>{story?.storyTitle}</Heading>
              </div>
              {story?.storyText ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: story?.storyText
                      ? story?.storyText
                      : "Tekst niet beschikbaar",
                  }}
                />
              ) : (
                <>
                  <Paragraph variant="sm">
                    De schrijver van dit verhaal heeft ervoor gekozen om het
                    verhaal in een bestand in te dienen.
                  </Paragraph>{" "}
                  {story?.storyFileUrl && isAllowedFileType && (
                    <iframe
                      src={`${story.storyFileUrl}#toolbar=0`}
                      style={{ width: "100%", height: "100vh", marginTop: 8 }}
                    />
                  )}
                  <Button
                    onClick={() => {
                      window.open(story?.storyFileUrl, "_blank");
                    }}
                    variant="underlined"
                    style={{ paddingTop: 10 }}
                  >
                    Open verhaal
                  </Button>
                </>
              )}
            </div>
            <div className={styles.story__information}>
              <>
                <div className={styles.story__origin}>
                  {story?.email && (
                    <Paragraph>Schrijver email: {story?.email}</Paragraph>
                  )}
                  {story?.originText && (
                    <Paragraph>{story?.originText}</Paragraph>
                  )}
                  <div className={styles.story__author}>
                    <Paragraph>
                      Verhaal geschreven door {story?.author}
                    </Paragraph>

                    <Paragraph>
                      Gepubliceerd op {date ? date : "Niet beschikbaar"}
                    </Paragraph>
                  </div>
                </div>
                {(story?.songImage || story?.song) && (
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={story.song?.url ?? story.linkToSong}
                    className={styles.story__spotifyPlayer}
                  >
                    <span>
                      <Image
                        src={
                          story?.songImage
                            ? story?.songImage
                            : story?.song.albumImage
                        }
                        alt={"album cover"}
                        fill
                      />
                      <span />
                      <PlayButtonSvg />
                    </span>
                  </a>
                )}
              </>
            </div>
          </div>
        </MainLayout>
        <div className={styles.story__lyricsWrapper}>
          <MainLayout>
            <div>
              <Paragraph variant="md">
                Songtekst van &apos;
                {story?.song ? story?.song.name : story?.songTitle}&apos;
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
          <AdminButtons slug={slug} story={story} />
        </MainLayout>
      </>
    );
}
