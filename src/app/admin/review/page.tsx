"use client"
import React, {useEffect, useState} from "react";

import styles from "./page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";
import {Verhaal} from "../../../utils";
import TextInput from "../../../components/text-input/text-input";
import { sortStories } from "../../../utils";

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

  // const changeStories = (e) => {
  //     const searchTerm = e.target.value;
  // }

  return (
    <>
      <MainLayout>
        <PageTitle title="Niet gekeurde verhalen" />
      {/*<TextInput type={"text"} name={'underReviewSearch'} label={"Zoek verhalen"} onChange={changeStories} />*/}
        <div className={styles.cards__container}>
          { loading && (
              renderSkeletonCards()
          )}
          { sortStories(stories, true)?.map( (story, index) => (
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
          { sortStories(stories, false)?.map( (story, index) => (
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
