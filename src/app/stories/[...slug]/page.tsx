import React from "react";

import filteredVerhalen from "../../../components/firebase/filteredVerhalen";

import { Verhaal } from "../../utils";

import styles from "../page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import Pagination from "../../../components/pagination/pagination";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

import { stories } from "../../../example-stories";

export default async function Page({
  params,
}: {
  params: { slug: { index: string; searchTerm?: string } };
}) {
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

  const storiesPerPage = 8;
  const maxIndex = Math.ceil(
    (sortedVerhalen ? sortedVerhalen?.length : storiesPerPage) / storiesPerPage
  );
  const activeIndex = parseInt(params.slug[0]);
  const startIndex = (activeIndex - 1) * storiesPerPage;

  const searchTerm = params.slug[1];

  const filterStories = (story: Verhaal) => {

    if (!searchTerm) {
      return true;
    }

    const titleMatch =
      story.storyTitle &&
      JSON.stringify(story.storyTitle)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const textMatch =
      story.storyText &&
      JSON.stringify(story.storyText)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const songNameMatch =
      story.songTitle &&
      story.songTitle.toLowerCase().includes(searchTerm.toLowerCase());

    return titleMatch || textMatch || songNameMatch;
  };

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
        {sortedVerhalen &&
          sortedVerhalen
            .slice(startIndex, startIndex + storiesPerPage)
            .filter(filterStories)
            .map((story, index) => (
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
      </div>
      <Pagination
        maxIndex={maxIndex}
        initialIndex={activeIndex}
        searchTerm={searchTerm}
      />
    </MainLayout>
  );
}
