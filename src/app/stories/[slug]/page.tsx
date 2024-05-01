"use client";
import React from "react";
import { useRouter } from "next/navigation";

import styles from "../page.module.scss";

import { stories } from "../../../example-stories";

import MainLayout from "../../../components/main-layout/main-layout";
import Pagination from "../../../components/pagination/pagination";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

export default function Page({ params }: { params: { slug: string } }) {
  const router = useRouter();

  return (
    <MainLayout>
      <PageTitle title="Verhalen" />

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
      <Pagination
        initialIndex={parseInt(params.slug)}
        onIndexChange={(index) => router.push(`/stories/${index}`)}
      />
    </MainLayout>
  );
}
