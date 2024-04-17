"use client";
import React from "react";

import "./form.scss";

import Editor from "../editors/editor";
import TextInput from "../text-input/text-input";
import TextArea from "../text-area/text-area";

const Form = ({ formAction }: { formAction: (value) => void }) => {
  return (
    <form action={formAction}>
      <div className="inputs__group">
        <TextInput
          type="text"
          name="story_author"
          label="Vul hier je naam in als de auteur van dit verhaal"
          placeholder="Auteur"
        />
        <TextInput
          type="text"
          name="story_title"
          label="Titel van het verhaal"
          placeholder="Titel"
          required
        />
        <div className="row">
          <TextInput
            type="text"
            name="song_title"
            label="Titel van het liedje"
            placeholder="Titel"
            required
          />
          <TextInput
            type="text"
            name="link_to_song"
            label="Link naar het liedje (Spotify, Youtube oid)"
            placeholder="Link"
            required
          />
        </div>
        <TextInput
          type="file"
          name="song_image"
          label="Afbeelding"
          accept="image/png, image/jpeg"
        />
        <div className="row">
          <TextArea
            name="quote_text"
            label="Quote"
            placeholder="Verhaal"
            cols={30}
            rows={5}
          />
          <TextInput
            type="text"
            name="quote_author"
            label="Quote auteur"
            placeholder="Auteur"
          />
        </div>
        <Editor
          placeholder="Er was eens een.."
          label="Verhaal tekst"
          required
        />

        <Editor
          placeholder="Zie Ginds Komt De Stoomboot..."
          label="Songtekst"
          required
        />
      </div>
    </form>
  );
};

export default Form;
