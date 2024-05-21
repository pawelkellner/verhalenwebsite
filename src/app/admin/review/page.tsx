import React from "react";

import styles from "./page.module.scss";

import filteredVerhalen from "../../../components/firebase/filteredVerhalen";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

export default async function Page() {
  const verhalen = await filteredVerhalen(true);

  const sortedVerhalen = verhalen?.sort((a, b) => {
    const dateA = new Date(
      a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
    ).getTime();
    const dateB = new Date(
      b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
    ).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <MainLayout>
        <PageTitle title="Ingezonden verhalen" />
        <div className={styles.cards__container}>
          {sortedVerhalen?.map((story, index) => (
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
