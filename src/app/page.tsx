import React from "react";
import MainLayout from "../components/main-layout/main-layout";
import PageTitle from "../components/page-title/page-title";
import Hero from "../components/hero/hero";
import StoryCard from "../components/story-card/story-card";

export default function Home() {
  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
        <StoryCard></StoryCard>
      </MainLayout>
    </>
  );
}
