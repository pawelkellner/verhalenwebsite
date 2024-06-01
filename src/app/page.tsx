"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import styles from "./page.module.scss";

import MainLayout from "../components/main-layout/main-layout";
import Pagination from "../components/pagination/pagination";
import PageTitle from "../components/page-title/page-title";
import StoryCard from "../components/story-card/story-card";
import Hero from "../components/hero/hero";
import { useStories } from "../components/posts-provider/postsProvider";

export default function Home() {
  const { reviewedStories, loading, limitedStories } = useStories();

  const renderSkeletonCards = () => {
    return (
      <>
        <StoryCard
          key={1}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
        <StoryCard
          key={2}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
        <StoryCard
          key={3}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
      </>
    );
  };

  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
        <div className={styles.cards__container}>
          {loading && renderSkeletonCards()}
          {limitedStories?.map((story, index) => (
            <StoryCard
              key={index}
              id={story.id}
              title={story.storyTitle}
              image={story.song ? story.song.albumImage : story.songImage}
              text={story.storyText}
              author={story.author}
              songName={
                story.song
                  ? `${story.song.name} - ${story.song.artist}`
                  : story.songTitle
              }
            />
          ))}
        </div>

        {reviewedStories?.length && reviewedStories?.length > 8 ? (
          <Link href={`/stories/${2}`}>
            <Pagination disabled={true} maxIndex={3} />
          </Link>
        ) : (
          <>
            <div style={{ pointerEvents: "none" }}>
              <Pagination disabled={true} maxIndex={1} />
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
}
