import React from "react";
import PageTitle from "../components/page-title/page-title";
import Navigation from "../components/navigation/navigation";
import FirebasePage from "../components/firebase/FirebasePage"

export default function Home() {

  return (
    <>
      <Navigation></Navigation>
      <main className="container">
        <PageTitle noTopPadding title="Recente verhalen" />
      </main>
      <FirebasePage></FirebasePage>
    </>
  );
}
