"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./form.scss";
import lineStyle from "../page-title/styles.module.scss";

import TextInput from "../text-input/text-input";
import TextArea from "../text-area/text-area";
import Button from "../button";
import { submitStory } from "../../app/actions";
import { getLyrics } from "../../app/actions";
import dynamic from "next/dynamic";
import Paragraph from "../typography/paragraph";

import SpotifySearch from "../spotify-search/spotify-search.jsx";

import { storage as firebaseStorage } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Editor = dynamic(
  () => {
    return import("../editor/editor");
  },
  { ssr: false }
);

const Form = () => {
  const [author, setAuthor] = useState("");
  const [storyTitle, setStoryTitle] = useState("");

  const [songTitle, setSongTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [linkToSong, setLinkToSong] = useState("");

  const [songImage, setSongImage] = useState<File | null>(null);
  const [originText, setOriginText] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [storyText, setStoryText] = useState<React.ReactNode | null>(null);
  const [songText, setSongText] = useState<React.ReactNode | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  async function getSong(res) {
    setSongTitle(res.name);
    const lyricResult = await getLyrics(res.artist, res.name);
    console.log(lyricResult);
    setSongText(lyricResult);
  }

  const addItem = async (e) => {
    e.preventDefault();

    if (
      storyTitle === "" ||
      songTitle === "" ||
      storyText === "" ||
      songText === "" ||
      isLoading
    )
      return;
    else {
      setIsSuccess(false);
      setIsLoading(true);
      try {
        const storyData = {
          author: author,
          storyTitle: storyTitle,
          songTitle: songTitle,
          quoteText: quoteText,
          quoteAuthor: quoteAuthor,
          originText: originText,
          storyText: storyText,
          songText: songText,
        };

        let imageUrl: string | null = null;

        console.log("songImage:", songImage);

        if (songImage) {
          const storageRef = ref(firebaseStorage, songImage.name);
          await uploadBytes(storageRef, songImage);
          imageUrl = await getDownloadURL(storageRef);
        }

        console.log("imageUrl:", imageUrl);

        const response = await submitStory(storyData, imageUrl);

        setAuthor("");
        setStoryTitle("");
        setSongTitle("");
        setSearchResults([]);
        setSearchQuery("");
        setSelectedResult([]);
        setArtistAlbums([]);
        setArtistSongs([]);
        setLinkToSong("");
        setSongImage(null);
        setQuoteText("");
        setQuoteAuthor("");
        setOriginText("");
        setStoryText(null);
        setSongText(null);
      } catch (e) {
        console.error("error: ", e);
      }
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return (
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
        <SpotifySearch
          getSong={getSong}
          setSongTitle={setSongTitle}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          artistAlbums={artistAlbums}
          setArtistAlbums={setArtistAlbums}
          artistSongs={artistSongs}
          setArtistSongs={setArtistSongs}
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
      <TextArea
        name="origin_text"
        label="Totstandkomming"
        placeholder="Totstandkomming"
        onChange={(e) => setOriginText(e.target.value)}
        value={originText}
        cols={30}
        rows={5}
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
      <Editor
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
      />
      <div className={lineStyle.line} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <input type="checkbox" id="confirm" />
        <label htmlFor="confirm" style={{ marginTop: -3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </label>
      </div>
      <Button
        variant={
          storyTitle === "" ||
          songTitle === "" ||
          storyText === "" ||
          songText === "" ||
          isLoading
            ? "disabled"
            : "secondary"
        }
        style={{ width: "100%" }}
        onClick={addItem}
      >
        Verstuur verhaal
      </Button>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {isLoading && (
          <Paragraph variant="sm">
            Een moment, je verhaal wordt opgestuurd
          </Paragraph>
        )}
        {isSuccess && (
          <>
            <Paragraph variant="sm">
              Je verhaal is verstuurd en zal zo snel mogelijk goed- of afgekeurd
              worden. Intussentijd, kan je nog een verhaal schrijven of verhalen
              van andere gebruikers lezen
            </Paragraph>
            <Button
              onClick={(e) => {
                e.preventDefault(), router.push("/");
              }}
              style={{ width: "100%" }}
              variant="secondary"
            >
              Lees verhalen
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
