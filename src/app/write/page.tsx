import React from "react";
import PageTitle from "../../components/page-title/page-title";

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
      <form action={formAction}>
        <input type="text" name="story_author" />
        <input type="text" name="story_title" />
        <input type="text" name="song_title" />
        <input type="text" name="link_to_song" />
        <input type="text" name="link_to_song" />
        <input type="file" accept="image/png, image/jpeg" />
        <textarea name="quote_text" cols={30} rows={5}></textarea>
        <input type="text" name="quote_author" />
      </form>
    </main>
  );
}
