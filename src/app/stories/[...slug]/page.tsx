"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../page.module.scss";

import { stories } from "../../../example-stories";

import MainLayout from "../../../components/main-layout/main-layout";
import Pagination from "../../../components/pagination/pagination";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

export default function Page({
  params,
}: {
  params: { slug: { index: string; searchTerm?: string } };
}) {
  const router = useRouter();

  const activeIndex = parseInt(params.slug[0]);
  const searchTerm = params.slug[1];

  const maxIndex = 11;

  return (
    <MainLayout>
      <PageTitle
        title={
          searchTerm
            ? `Zoekresultaten voor '${searchTerm}'`
            : `Pagina ${activeIndex} van ${maxIndex}`
        }
      />
      <div className={styles.cards__container}>
        {stories.map((story, index) => (
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
      <Pagination
        maxIndex={maxIndex}
        initialIndex={activeIndex}
        onIndexChange={(newIndex) => {
          router.push(`/stories/${newIndex}/${searchTerm ? searchTerm : ""}`);
        }}
      />
    </MainLayout>
  );
}
