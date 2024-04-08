import React from "react";
import MainLayout from "../components/main-layout/main-layout";
import PageTitle from "../components/page-title/page-title";

export default function Home() {
  return (
    <MainLayout>
      <PageTitle noTopPadding title="Recente verhalen" />
    </MainLayout>
  );
}
