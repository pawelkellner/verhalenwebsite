import React from "react";
import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";

export const metadata = {
  title: "Schrijf je eigen verhaal",
  description: "Schrijf je eigen verhaal",
};

export default function Write() {
  return (
    <MainLayout>
      <PageTitle title="Schrijven" />
    </MainLayout>
  );
}
