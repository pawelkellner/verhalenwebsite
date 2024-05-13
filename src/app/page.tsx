import React from "react";

import Link from "next/link";

import styles from "./page.module.scss";

import { stories } from "../example-stories";
import { fetchVerhalen } from "./utils";

import MainLayout from "../components/main-layout/main-layout";
import Pagination from "../components/pagination/pagination";
import PageTitle from "../components/page-title/page-title";
import StoryCard from "../components/story-card/story-card";
import Hero from "../components/hero/hero";

export default async function Home() {
  const verhalen = await fetchVerhalen();

  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
        <div className={styles.cards__container}>
          {verhalen?.map((story, index) => (
            <StoryCard
              key={index}
              id={story.id}
              title={story.storyTitle}
              image={story.songImage}
              text={story.storyText}
              author={story.author}
              songName={story.songTitle}
            />
          ))}
          {stories.slice(0, 8).map((story, index) => (
            <StoryCard
              key={index}
              id={story.id}
              title={story.title}
              image={story.image}
              text={story.text}
              author={story.author}
              songName={story.songName}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {stories?.length && stories?.length > 8 ? (
            <Link href={`/stories/${2}`}>
              <Pagination maxIndex={3} />
            </Link>
          ) : (
            <>
              <div style={{ pointerEvents: "none" }}>
                <Pagination maxIndex={1} />
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
}
