"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Verhaal } from "../../../utils";
import { formatDate } from "../../../utils";
import { useAuth } from "../../../auth-context";
import { deleteStory } from "../../actions";

import styles from "../page.module.scss";

import Button from "../../../components/button";
import MainLayout from "../../../components/main-layout/main-layout";
import PlayButtonSvg from "../../../components/svg/PlayButtonSvg";
import PageTitle from "../../../components/page-title/page-title";
import Paragraph from "../../../components/typography/paragraph";
import Heading from "../../../components/typography/heading";
import LinkButton from "../../../components/link-button/link-button";

export default function Story({ params }: { params: { slug: string } }) {
  const [stories, setStories] = useState<Verhaal[]>([]);
  const [story, setStory] = useState<Verhaal>();
  const [loading, setLoading] = useState(true);

  const { state } = useAuth();
  const router = useRouter();

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

  let date: string = "";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStories(data.body);
        setStory(data.body?.find((item) => item.id === slug));
        setLoading(false);
      });
  }, []);

  const slug = params.slug;

  const verhalenIds = stories?.map((story) => story.id) || [];
  const randomId = verhalenIds[Math.floor(Math.random() * verhalenIds.length)];

  if (story) {
    const jsUnixTS =
      (story.createdAt.seconds + story.createdAt.nanoseconds * 10 ** -9) * 1000;
    const fullDate = new Date(jsUnixTS);

    date = `${fullDate.getDate()} ${
      monthsArray[fullDate.getMonth()]
    }, ${fullDate.getFullYear()}`;
  }

  const handleDeleteStory = async () => {
    await deleteStory(story);
    router.push("/");
  };

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

                <Paragraph>
                  Gepubliceerd op {date ? date : "Niet beschikbaar"}
                </Paragraph>
              </div>
            </div>
            {story?.songImage || story?.song ? (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={story.song.url ? story.song.url : ""}
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
            ) : (
              ""
            )}
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
        <div className={styles.story__buttons}>
          <LinkButton href={`/story/${randomId}`} buttonVariant="secondary">
            Lees nog een verhaal
          </LinkButton>
          <Paragraph>Of</Paragraph>
          <LinkButton href="/write" buttonVariant="secondary">
            Schrijf er zelf een
          </LinkButton>
          {state.isUserAuthenticated === true && (
            <>
              <Paragraph>Of</Paragraph>
              <Button onClick={() => handleDeleteStory()} variant="warning">
                Verhaal verwijderen
              </Button>
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
}
