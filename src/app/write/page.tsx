import React from "react";

import "./page.scss";

import MainLayout from "../../components/main-layout/main-layout";

import PageTitle from "../../components/page-title/page-title";
import Form from "../../components/form/form";
import Paragraph from "../../components/typography/paragraph";

export const metadata = {
  title: "Schrijf je eigen verhaal",
  description: "Schrijf je eigen verhaal",
};

export default function Write() {
  const formAction = async () => {
    "use server";
    console.log("a");
  };

  return (
    <MainLayout className="write__container">
      <PageTitle title="Schrijf jouw verhaal" />
      <div className="text__container">
        <Paragraph variant="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Paragraph>
      </div>
      <Form formAction={formAction} />
    </MainLayout>
  );
}
