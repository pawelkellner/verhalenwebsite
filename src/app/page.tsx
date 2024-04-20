import React from "react";

import styles from "./page.module.scss";

import { stories } from "../example-stories";

import MainLayout from "../components/main-layout/main-layout";
import Hero from "../components/hero/hero";
import PageTitle from "../components/page-title/page-title";
import StoryCard from "../components/story-card/story-card";

export default function Home() {
  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
        <div className={styles.cards__container}>
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              title={story.title}
              image={story.image}
              text={story.text}
              author={story.author}
              songName={story.songName}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
}
