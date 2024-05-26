import React from "react";

import filteredVerhalen from "../../../components/firebase/filteredVerhalen";

import { Verhaal } from "../../../utils";

import styles from "../page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import Pagination from "../../../components/pagination/pagination";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";

export default async function Page({
  params,
}: {
  params: { slug: { index: string; searchTerm?: string } };
}) {
  const verhalen = await filteredVerhalen(false);

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
    const songMatch =
      story.songTitle &&
      story.songTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const songNameMatch =
      story.song.name &&
      story.song.name.toLowerCase().includes(searchTerm.toLowerCase());
    const songArtistMatch =
      story.song.artist &&
      story.song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const authorNameMatch =
      story.author &&
      story.author.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      titleMatch ||
      textMatch ||
      songMatch ||
      songNameMatch ||
      songArtistMatch ||
      authorNameMatch
    );
  };

  const filteredStories = sortedVerhalen?.filter(filterStories) || [];
  const maxIndex = Math.ceil(filteredStories.length / storiesPerPage);
  const activeIndex = parseInt(params.slug[0], 10) || 1;
  const startIndex = (activeIndex - 1) * storiesPerPage;

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
        {filteredStories
          .slice(startIndex, startIndex + storiesPerPage)
          .map((story, index) => (
            <StoryCard
              key={index}
              id={story.id}
              title={story.storyTitle}
              image={story.song ? story.song.albumImage : story.songImage}
              text={story.storyText}
              author={story.author}
              songName={
                story.song
                  ? `${story?.song.name} - ${story?.song.artist}`
                  : story?.songTitle
              }
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
