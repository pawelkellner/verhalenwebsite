"use client"
import React, {useEffect, useState} from "react";

import styles from "./page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";
import {Verhaal} from "../../../utils";

export default function Page() {

  const [stories, setStories] = useState<Verhaal[]>([]);
  const [limitedStories, setLimitedStories] = useState<Verhaal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api`, {
      method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
          setStories(data.body);
          // setLimitedStories(sortedVerhalen.slice(0, 7));
          setLoading(false);
        });
  }, []);

  const sortStories = (stories, underReview) => {
    return stories?.sort((a, b) => {
      const dateA = new Date(
          a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
      ).getTime();
      const dateB = new Date(
          b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
      ).getTime();
      return dateB - dateA;
    }).filter((item) => item.underReview === underReview)
  }

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
  }

  return (
    <>
      <MainLayout>
        <PageTitle title="Niet gekeurde verhalen" />
        <div className={styles.cards__container}>
          { loading && (
              renderSkeletonCards()
          )}
          { sortStories(stories, true).map( (story, index) => (
              <StoryCard
                  key={index}
                  id={story.id}
                  title={story.storyTitle}
                  image={story.song ? story.song.albumImage : story.songImage}
                  text={story.storyText}
                  author={story.author}
                  songName={
                    story?.song
                        ? `${story?.song.name} - ${story?.song.artist}`
                        : story?.songTitle
                  }
                  customUrl={`/admin/review/story/${story.id}`}
              />
            ))}
        </div>
        <PageTitle title="Goedgekeurde verhalen" />
        <div className={styles.cards__container}>
          { loading && (
              renderSkeletonCards()
          )}
          { sortStories(stories, false).map( (story, index) => (
              <StoryCard
                  key={index}
                  id={story.id}
                  title={story.storyTitle}
                  image={story.song ? story.song.albumImage : story.songImage}
                  text={story.storyText}
                  author={story.author}
                  songName={
                    story?.song
                        ? `${story?.song.name} - ${story?.song.artist}`
                        : story?.songTitle
                  }
                  customUrl={`/admin/review/story/${story.id}`}
              />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
