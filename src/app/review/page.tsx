import React from "react";
import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";

export const metadata = {
  title: "Verhalen goedkeuren",
  description: "Verhalen goedkeuren",
};

export default function Review() {
  return (
    <MainLayout>
      <PageTitle title="Verhalen goedkeuren" />
    </MainLayout>
  );
}
