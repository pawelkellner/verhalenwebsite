// "use client";
import React from "react";

import "../../../../write/page.scss";

import MainLayout from "../../../../../components/main-layout/main-layout";
import PageTitle from "../../../../../components/page-title/page-title";
import { fetchVerhalen } from "../../../../utils";
import FormAdmin from "../../../../../components/form-admin/form-admin";

export default async function Story({ params }: { params: { slug: string } }) {
  const slug = params.slug.toString();
  const verhalen = await fetchVerhalen();

  const story = verhalen?.find((story) => story.id === slug);
  const date = new Date(Number(story?.createdAt)).toLocaleString("en-US");
  console.log(date);

  return (
    <>
      <MainLayout className="write__container">
        <PageTitle
          title={
            story?.storyTitle ? story.storyTitle : "Geen Titel beschikbaar"
          }
        />

        <FormAdmin
          authorData={story?.author}
          storyTitleData={story?.storyTitle}
          songTitleData={story?.songTitle}
          linkToSongData={story?.linkToSong}
          songImageData={story?.songImage}
          originTextData={story?.originText}
          quoteTextData={story?.quoteText}
          quoteAuthorData={story?.quoteAuthor}
          storyTextData={story?.storyText}
          songTextData={story?.songText}
        />
      </MainLayout>
    </>
  );
}
