import React from "react";
import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";

export const metadata = {
  title: "Over",
  description: "Over Verhalen website",
};

export default function About() {
  return (
    <MainLayout>
      <PageTitle title="Over Muziek Verhalen" />
    </MainLayout>
  );
}
