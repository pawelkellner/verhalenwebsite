import React from "react";

import PageTitle from "../../components/page-title/page-title";
import Form from "../../components/form/form";

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
    <main>
      <PageTitle title="Schrijf jouw verhaal" />
      <Form formAction={formAction} />
    </main>
  );
}
