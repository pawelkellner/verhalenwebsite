"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../page.module.scss";

import { stories } from "../../../example-stories";

import MainLayout from "../../../components/main-layout/main-layout";
import Pagination from "../../../components/pagination/pagination";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

export default function Page({ params }: { params: { slug: string } }) {
  const activeIndex = parseInt(params.slug);

  const [index, setIndex] = useState(activeIndex);

  const router = useRouter();

  const maxIndex = 11;

  return (
    <MainLayout>
      <PageTitle title={`Pagina ${activeIndex} van ${maxIndex}`} />

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
        maxIndex={maxIndex}
        initialIndex={activeIndex}
        onIndexChange={(newIndex) => {
          router.push(`/stories/${newIndex}`), setIndex(newIndex);
        }}
      />
    </MainLayout>
  );
}
