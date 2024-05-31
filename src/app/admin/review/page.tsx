"use client";
import React, { useEffect } from "react";

import styles from "./page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";
import { useStories } from "../../../components/posts-provider/postsProvider";
import { useAuth } from "../../../auth-context";
import { useRouter } from "next/navigation";
import { isUserLoggedIn } from "../../actions";

export default function Page() {
  const { reviewedStories, notReviewedStories, loading } = useStories();
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isUserAuthenticated) {
      router.replace("/admin");
      return;
    }
  }, []);
  // useEffect(() => {
  //   authCheck();
  // }, []);

  // const authCheck = async () => {
  //   const user = await isUserLoggedIn();
  //   if (user !== false) {
  //     console.log("user is logged in,", user);
  //   } else {
  //     console.log("not logged in");
  //     // router.replace("/admin");
  //   }
  // };

  const renderSkeletonCards = () => {
    return (
      <>
        <StoryCard
          key={1}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
        <StoryCard
          key={2}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
        <StoryCard
          key={3}
          id={"idoski"}
          title={"Lorem ipsum dolor sit amet"}
          text={"Lorem ipsum dolor sit amet"}
          author={"Lorem ipsum"}
          songName={"Lorem ipsum dolor"}
          skeleton={true}
        />
      </>
    );
  };

  function renderPostsSection(posts, loading) {
    return (
      <div className={styles.cards__container}>
        {loading && renderSkeletonCards()}
        {posts?.map((story, index) => (
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
    );
  }

  if (state.isUserAuthenticated)
    return (
      <>
        <MainLayout>
          <PageTitle title="Niet gekeurde verhalen" />
          {renderPostsSection(notReviewedStories, loading)}
          <PageTitle title="Goedgekeurde verhalen" />
          {renderPostsSection(reviewedStories, loading)}
        </MainLayout>
      </>
    );
}
