import React from "react";
import MainLayout from "../components/main-layout/main-layout";
import PageTitle from "../components/page-title/page-title";
import Hero from "../components/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <MainLayout>
        <PageTitle noTopPadding title="Recente verhalen" />
      </MainLayout>
    </>
  );
}
