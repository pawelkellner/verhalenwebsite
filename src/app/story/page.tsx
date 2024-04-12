import React from "react";
import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";

export const metadata = {
  title: "Verhaal",
  description: "Verhaal",
};

export default function Story() {
  return (
    <MainLayout>
      <PageTitle title="Verhaal" />
    </MainLayout>
  );
}
