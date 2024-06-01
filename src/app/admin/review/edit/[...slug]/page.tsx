"use client";
import React, { useEffect, useState } from "react";

import "../../../../write/page.scss";

import MainLayout from "../../../../../components/main-layout/main-layout";
import PageTitle from "../../../../../components/page-title/page-title";
import { Verhaal } from "../../../../../utils";
import FormAdmin from "../../../../../components/form-admin/form-admin";
import { useStories } from "../../../../../components/posts-provider/postsProvider";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../auth-context";

export default function Story({ params }: { params: { slug: string } }) {
  const { stories } = useStories();
  const router = useRouter();
  const { state } = useAuth();

  const [story, setStory] = useState<Verhaal>();

  const slug = params.slug.toString();

  useEffect(() => {
    if (!state.isUserAuthenticated) {
      router.replace("/admin");
      return;
    }
  }, []);

  useEffect(() => {
    if (stories) {
      setStory(stories.find((item) => item.id === slug));
    }
  }, [stories]);

  if (state.isUserAuthenticated)
    return (
      <>
        <MainLayout className="write__container">
          <PageTitle
            title={
              story?.storyTitle ? story.storyTitle : "Geen Titel beschikbaar"
            }
          />
          {story ? (
            <FormAdmin
              id={story?.id}
              authorData={story?.author}
              emailData={story?.email}
              storyTitleData={story?.storyTitle}
              songData={story?.song ? story?.song : ""}
              songTitleData={story?.songTitle}
              linkToSongData={story?.song ? story?.song.url : story?.linkToSong}
              songImageData={story?.songImage}
              originTextData={story?.originText}
              storyTextFileData={story?.storyFileUrl}
              storyTextData={story?.storyText}
              songTextData={story?.songText}
            />
          ) : (
            "Loading..."
          )}
        </MainLayout>
      </>
    );
}
