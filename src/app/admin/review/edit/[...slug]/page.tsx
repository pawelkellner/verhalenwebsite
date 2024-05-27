"use client";
import React, {useEffect, useState} from "react";

import "../../../../write/page.scss";

import MainLayout from "../../../../../components/main-layout/main-layout";
import PageTitle from "../../../../../components/page-title/page-title";
import { Verhaal } from "../../../../../utils";
import FormAdmin from "../../../../../components/form-admin/form-admin";

export default function Story({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<Verhaal>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api`, {
      method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setStory(data.body?.find((item) => item.id === slug))
        });
  }, []);

  const slug = params.slug.toString();

  return (
    <>
      <MainLayout className="write__container">
        <PageTitle
          title={
            story?.storyTitle ? story.storyTitle : "Geen Titel beschikbaar"
          }
        />
          { story ? (
            <FormAdmin
              id={story?.id}
              authorData={story?.author}
              storyTitleData={story?.storyTitle}
              songData={story?.song ? story?.song : ""}
              songTitleData={story?.songTitle}
              linkToSongData={story?.song.url}
              songImageData={story?.songImage}
              originTextData={story?.originText}
              storyTextData={story?.storyText}
              songTextData={story?.songText}
            />
          ) : 'Loading...' }
      </MainLayout>
    </>
  );
}
