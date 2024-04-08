"use client";
import React from "react";
import Editor from "../editors/editor";

const Form = ({ formAction }: { formAction: (value) => void }) => {
  return (
    <form action={formAction}>
      <input type="text" name="story_author" />
      <input type="text" name="story_title" />
      <input type="text" name="song_title" />
      <input type="text" name="link_to_song" />
      <input type="text" name="link_to_song" />
      <input type="file" accept="image/png, image/jpeg" />
      <textarea name="quote_text" cols={30} rows={5}></textarea>
      <input type="text" name="quote_author" />
      <Editor />
    </form>
  );
};

export default Form;
