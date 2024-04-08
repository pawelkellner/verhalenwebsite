import React from "react";
import Head from "next/head";
import Paragraph from "../../components/typography/paragraph";

export const metadata = {
  title: "Over",
  description: "Over Verhalen website",
};

export default function About() {
  return (
    <>
      <main>
        <Paragraph variant="sm">About</Paragraph>
      </main>
    </>
  );
}
