"use client";
import React, { useEffect } from "react";

import Link from "next/link";

import styles from "./page.module.scss";

import { useState } from "react";
import {sortStories, Verhaal} from "../utils";

import MainLayout from "../components/main-layout/main-layout";
import Pagination from "../components/pagination/pagination";
import PageTitle from "../components/page-title/page-title";
import StoryCard from "../components/story-card/story-card";
import Hero from "../components/hero/hero";

export default function Home() {
  const [stories, setStories] = useState<Verhaal[]>([]);
  const [limitedStories, setLimitedStories] = useState<Verhaal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStories(sortStories(data.body, false));
        setLimitedStories(sortStories(data.body, false).slice(0, 7));
        setLoading(false);
      });
  }, []);

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
          {loading && (
            renderSkeletonCards()
          )}
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

        {stories?.length && stories?.length > 8 ? (
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
