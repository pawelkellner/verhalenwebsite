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
  const [song, setSong] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [linkToSong, setLinkToSong] = useState("");

  const [songImage, setSongImage] = useState<File | null>(null);
  const [originText, setOriginText] = useState("");
  const [storyText, setStoryText] = useState<string | undefined>(undefined);
  const [storyTextFile, setStoryTextFile] = useState<File | null>(null);
  const [songText, setSongText] = useState<string | undefined>(undefined);
  3;

  const [manualSongInput, setManualSongInput] = useState(false);
  const [manualStoryTextInput, setManualStoryTextInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const isStoryText =
    (storyText && storyText?.length > 1) || storyTextFile !== undefined;

  async function getSong(res) {
    setSong(res);

    const lyricResult = await getLyrics(res.artist, res.name);
    setSongText(lyricResult || undefined);
  }

  const addItem = async (e) => {
    e.preventDefault();

    if (storyTitle === "" || !isStoryText || isLoading) return;
    else {
      setIsSuccess(false);
      setIsLoading(true);
      try {
        const storyData = {
          author: author,
          storyTitle: storyTitle,
          song: song,
          songTitle: songTitle,
          originText: originText,
          // storyTextFile: storyTextFile,
          storyText: storyText,
          songText: songText,
          underReview: true,
        };

        let imageUrl: string | null = null;

        if (songImage) {
          const storageRef = ref(firebaseStorage, songImage.name);
          await uploadBytes(storageRef, songImage);
          imageUrl = await getDownloadURL(storageRef);
        }

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
        setOriginText("");
        setStoryText("");
        setStoryTextFile(null);
        setSongText(undefined);
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
        label="Auteur verhaal"
        placeholder="Auteur"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        required
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
      <div>
        <div className="row">
          {!manualSongInput && (
            <SpotifySearch
              getSong={getSong}
              setSong={setSong}
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
          )}
          <TextInput
            type="text"
            name="link_to_song"
            label="Link naar het liedje (Spotify, Youtube oid)"
            placeholder="Link"
            onChange={(e) => setLinkToSong(e.target.value)}
            value={linkToSong}
          />
        </div>
        {song !== "" && !manualSongInput && (
          <Button
            onClick={() => {
              setManualSongInput(true), setSong("");
            }}
            variant="underlined"
            style={{ paddingTop: 10 }}
          >
            Niet gevonden? Vul het handmatig in
          </Button>
        )}
      </div>
      <div>
        {manualSongInput && (
          <div className="row">
            <TextInput
              type="file"
              name="song_image"
              label="Afbeelding voor lied"
              onChange={(e) => setSongImage(e.target.files[0])}
              accept="image/png, image/jpeg"
            />
            <TextInput
              type="text"
              name="song_info"
              label="Artiest en titel van het liedje"
              placeholder={"Artiest en titel van het liedje"}
              onChange={(e) => setSongTitle(e.target.value)}
              value={songTitle}
            />
          </div>
        )}
        {manualSongInput && (
          <Button
            onClick={() => {
              setManualSongInput(false), setSongTitle(""), setSongImage(null);
            }}
            variant="underlined"
            style={{ paddingTop: 10 }}
          >
            Terug naar de Spotify zoeker
          </Button>
        )}
      </div>
      <TextArea
        name="origin_text"
        label="Extra informatie (zichtbaar bij verhaaltje)"
        placeholder="Extra informatie"
        onChange={(e) => setOriginText(e.target.value)}
        value={originText}
        cols={30}
        rows={5}
      />
      <div>
        {manualStoryTextInput && (
          <>
            <Editor
              label="Verhaal tekst"
              onChange={(value) => setStoryText(value)}
              value={storyText}
              required
            />
            <Button
              onClick={() => {
                setManualStoryTextInput(false), setStoryText("");
              }}
              variant="underlined"
              style={{ paddingTop: 10 }}
            >
              Terug naar document uploaden
            </Button>
          </>
        )}
        {!manualStoryTextInput && (
          <>
            <TextInput
              type="file"
              name="story_text"
              label="Verhaal tekst*"
              onChange={(e) => setStoryTextFile(e.target.files[0])}
              accept=".doc, .docx, .rtf, .txt, .pdf"
            />
            <Button
              onClick={() => {
                setManualStoryTextInput(true);
              }}
              variant="underlined"
              style={{ paddingTop: 10 }}
            >
              Of schrijf het handmatig
            </Button>
          </>
        )}
      </div>
      <Editor
        label="Songtekst"
        onChange={(value) => setSongText(value)}
        value={songText}
      />
      <div className={lineStyle.line} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <input type="checkbox" id="confirm" required />
        <label htmlFor="confirm" style={{ marginTop: -3 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </label>
      </div>
      <Button
        variant={
          storyTitle === "" || !isStoryText || isLoading
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
