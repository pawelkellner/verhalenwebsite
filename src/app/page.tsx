import React from "react";
import PageTitle from "../components/page-title/page-title";
import Navigation from "../components/navigation/navigation";
import Hero from "../components/hero/hero";

export default function Home() {

  return (
    <>
        <Navigation></Navigation>
        <Hero></Hero>
        <main className="container">
            <PageTitle noTopPadding title="Recente verhalen" />
        </main>
    </>
  );
}
