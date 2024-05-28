"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import "../form/form.scss";
import lineStyle from "../page-title/styles.module.scss";

import TextInput from "../text-input/text-input";
import TextArea from "../text-area/text-area";
import Button from "../button";
import { editStory } from "../../app/actions";
import { getLyrics } from "../../app/actions";
import dynamic from "next/dynamic";
import Paragraph from "../typography/paragraph";
import { SpotifyTrack } from "../form/form";

import SpotifySearch from "../spotify-search/spotify-search.jsx";

import { storage as firebaseStorage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Editor = dynamic(
  () => {
    return import("../editor/editor");
  },
  { ssr: false }
);

const FormAdmin = ({
  id,
  authorData,
  emailData,
  storyTitleData,
  songData,
  songTitleData,
  linkToSongData,
  songImageData,
  originTextData,
  storyTextData,
  storyTextFileData,
  songTextData,
}) => {
  const [author, setAuthor] = useState(authorData);
  const [email, setEmail] = useState(emailData);
  const [storyTitle, setStoryTitle] = useState(storyTitleData);

  const [songTitle, setSongTitle] = useState(songTitleData);
  const [songImage, setSongImage] = useState<File | null>(songImageData);
  const [song, setSong] = useState<SpotifyTrack | null>(songData);

  const [searchQuery, setSearchQuery] = useState(
    songData.name + " - " + songData.artist
  );
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistSongs, setArtistSongs] = useState([]);
  const [linkToSong, setLinkToSong] = useState(linkToSongData);

  const [originText, setOriginText] = useState(originTextData);
  const [storyText, setStoryText] = useState<string | undefined>(storyTextData);
  const [storyTextFile, setStoryTextFile] = useState<File | null>(
    storyTextFileData
  );
  const [songText, setSongText] = useState<string | undefined>(songTextData);
  3;

  const [manualSongInput, setManualSongInput] = useState(
    song?.name && song?.name.length > 1 ? false : true
  );
  const [manualStoryTextInput, setManualStoryTextInput] = useState(
    storyText && storyText.length > 1 ? true : false
  );

  const [alertText, setAlertText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const isStoryText =
    (storyText ? storyText?.length > 1 : false) || storyTextFile !== null;

  const isSong =
    (song?.name ? song?.name.length > 1 : false) ||
    (songTitle ? songTitle?.length > 1 : false);

  async function getSong(res) {
    setLinkToSong(res.url);
    setSong(res);

    const lyricResult = await getLyrics(res.artist, res.name);
    setSongText(lyricResult || undefined);
  }

  const addItem = async (e) => {
    e.preventDefault();

    if (storyTitle === "") {
      setAlertText("Verhaal titel mist");
      return;
    }

    if (!isSong) {
      setAlertText("Lied mist");
      return;
    }

    if (!isStoryText) {
      setAlertText("Verhaal tekst mist");
      return;
    }

    if (isLoading) return;
    else {
      setIsSuccess(false);
      setIsLoading(true);
      setAlertText("");
      try {
        let storyFileUrl: string | null = null;
        if (storyTextFile) {
          const storageRef = ref(
            firebaseStorage,
            `stories/${storyTextFile.name}`
          );
          await uploadBytes(storageRef, storyTextFile);
          storyFileUrl = await getDownloadURL(storageRef);
        }

        const storyData = {
          author: author,
          email: email,
          storyTitle: storyTitle,
          song: song,
          songTitle: songTitle,
          originText: originText,
          storyText: storyText,
          storyFileUrl: storyFileUrl,
          songText: songText,
          underReview: true,
        };

        let imageUrl: string | null = null;

        if (songImage) {
          const storageRef = ref(firebaseStorage, songImage.name);
          await uploadBytes(storageRef, songImage);
          imageUrl = await getDownloadURL(storageRef);
        }

        await editStory(id, storyData, imageUrl);
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
      />
      <TextInput
        type="email"
        name="story_email"
        label="Schrijver email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
        {song?.name !== "" && !manualSongInput && (
          <Button
            onClick={() => {
              setManualSongInput(true);
              setSong(null);
              setSelectedResult([]);
              setSearchQuery("");
              setLinkToSong("");
            }}
            variant="underlined"
            style={{ paddingTop: 10 }}
          >
            Vul handmatig in
          </Button>
        )}
      </div>
      <div>
        {manualSongInput && (
          <>
            <div className="row">
              <TextInput
                type="text"
                name="song_info"
                label="Artiest en titel van het liedje"
                placeholder={"Artiest en titel van het liedje"}
                onChange={(e) => setSongTitle(e.target.value)}
                value={songTitle}
              />
              <TextInput
                type="file"
                name="song_image"
                label="Afbeelding voor lied"
                onChange={(e) => setSongImage(e.target.files[0])}
                accept="image/png, image/jpeg"
              />
            </div>

            <Button
              onClick={() => {
                setManualSongInput(false), setSongTitle(""), setSongImage(null);
              }}
              variant="underlined"
              style={{ paddingTop: 10 }}
            >
              Terug naar de Spotify zoeker
            </Button>
          </>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {storyTextFileData && (
                <Button
                  onClick={() => {
                    window.open(storyTextFileData, "_blank");
                  }}
                  variant="underlined"
                  style={{ paddingTop: 10 }}
                >
                  Bekijk huidige tekst van schrijver
                </Button>
              )}
              <Button
                onClick={() => {
                  setManualStoryTextInput(true);
                }}
                variant="underlined"
                style={{ paddingTop: 10 }}
              >
                Terug naar handmatig schrijven
              </Button>
            </div>
          </>
        )}
      </div>
      <Editor
        label="Songtekst"
        onChange={(value) => setSongText(value)}
        value={songText}
      />
      <div className={lineStyle.line} />

      <Button
        variant={
          storyTitle === "" || !isStoryText || isLoading
            ? "disabled"
            : "secondary"
        }
        style={{ width: "100%" }}
        onClick={addItem}
      >
        Aanpassingen opslaan
      </Button>
      <Button
        variant={"neutral"}
        style={{ width: "100%" }}
        onClick={() => router.push("/admin/review")}
      >
        Aanpassingen ongedaan maken
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
        {alertText && <Paragraph color="red">{alertText}</Paragraph>}
        {isLoading && (
          <Paragraph variant="sm">
            Een moment, je verhaal wordt opgestuurd
          </Paragraph>
        )}

        {isSuccess && (
          <>
            <Paragraph variant="sm">Verhaal bewerken is gelukt</Paragraph>
            <Button
              onClick={(e) => {
                e.preventDefault(), router.push("/admin/review");
              }}
              style={{ width: "100%" }}
              variant="secondary"
            >
              Terug naar ingezonden verhalen
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormAdmin;
