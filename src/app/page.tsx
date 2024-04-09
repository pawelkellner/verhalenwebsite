import React from "react";
import PageTitle from "../components/page-title/page-title";
import Navigation from "../components/navigation/navigation";

export default function Home() {

  return (
    <>
      <Navigation></Navigation>
      <main className="container">
        <PageTitle noTopPadding title="Recente verhalen" />
      </main>
    </>
  );
}
