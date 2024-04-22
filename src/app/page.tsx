import React from "react";
import MainLayout from "../components/main-layout/main-layout";
import PageTitle from "../components/page-title/page-title";
import Hero from "../components/hero/hero";
import StoryCard from "../components/story-card/story-card";
import { fetchVerhalen } from "./utils";

export default async function Home() {
    const verhalen = await fetchVerhalen();

    console.log('bennnin')

  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
          { verhalen && verhalen.map( verhaal => (
            <StoryCard/>
          ))}
      </MainLayout>
    </>
  );
}

