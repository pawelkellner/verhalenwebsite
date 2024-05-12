"use client"
import React, { useState } from "react";

import "./form.scss";
import lineStyle from "../page-title/styles.module.scss";

import Editor from "../editor/editor";
import TextInput from "../text-input/text-input";
import TextArea from "../text-area/text-area";
import Button from "../button";
import { submitStory } from "../../app/actions";

const Form = () => {
  const [author, setAuthor] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [linkToSong, setLinkToSong] = useState("");
  const [songImage, setSongImage] = useState<File | null>(null);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [storyText, setStoryText] = useState<React.ReactNode | null>(null);
  const [songText, setSongText] = useState<React.ReactNode | null>(null);

  const addItem = async (e) => {
    e.preventDefault();

    try {
      const storyData = {
        author: author,
        storyTitle: storyTitle,
        songTitle: songTitle,
        quoteText: quoteText,
        quoteAuthor: quoteAuthor,
        storyText: storyText,
        songText: songText,
      }

      const response = await submitStory(storyData, songImage);

      setAuthor("");
      setStoryTitle("");
      setSongTitle("");
      setLinkToSong("");
      setSongImage(null);
      setQuoteText("");
      setQuoteAuthor("");
      setStoryText(null);
      setSongText(null);
    } catch (e) {
      console.error('error: ', e)
    }
  };

  return (
    <form onSubmit={addItem}>
      <div className="inputs__group">
        <TextInput
          type="text"
          name="story_author"
          label="Vul hier je naam in als de auteur van dit verhaal"
          placeholder="Auteur"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <TextInput
          type="text"
          name="story_title"
          label="Titel van het verhaal"
          placeholder="Titel"
          onChange={(e) => setStoryTitle(e.target.value)}
          value={storyTitle}
          required
        />
        <div className="row">
          <TextInput
            type="text"
            name="song_title"
            label="Titel van het liedje"
            placeholder="Titel"
            onChange={(e) => setSongTitle(e.target.value)}
            value={songTitle}
            required
          />
          <TextInput
            type="text"
            name="link_to_song"
            label="Link naar het liedje (Spotify, Youtube oid)"
            placeholder="Link"
            onChange={(e) => setLinkToSong(e.target.value)}
            value={linkToSong}
            required
          />
        </div>
        <TextInput
          type="file"
          name="song_image"
          label="Afbeelding"
          onChange={(e) => setSongImage(e.target.files[0])}
          accept="image/png, image/jpeg"
        />
        <div className="row">
          <TextArea
            name="quote_text"
            label="Quote"
            placeholder="Verhaal"
            onChange={(e) => setQuoteText(e.target.value)}
            value={quoteText}
            cols={30}
            rows={5}
          />
          <TextInput
            type="text"
            name="quote_author"
            label="Quote auteur"
            placeholder="Auteur"
            onChange={(e) => setQuoteAuthor(e.target.value)}
            value={quoteAuthor}
          />
        </div>
        {/* <Editor
          placeholder="Er was eens een.."
          label="Verhaal tekst"
          onChange={(value) => setStoryText(value)}
          required
        />
        <Editor
          placeholder="Zie Ginds Komt De Stoomboot..."
          label="Songtekst"
          onChange={(value) => setSongText(value)}
          required
        /> */}
        <div className={lineStyle.line} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <input type="checkbox" id="confirm" />
          <label htmlFor="confirm" style={{ marginTop: -3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </label>
        </div>
        <Button variant="secondary" style={{ width: "100%" }}>
          Verstuur verhaal
        </Button>
      </div>
    </form>
  );
};

export default Form;