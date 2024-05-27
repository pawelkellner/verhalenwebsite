import React from "react";

import "./page.scss";
import style from "../about/page.module.scss";

import MainLayout from "../../components/main-layout/main-layout";

import Heading from "../../components/typography/heading";
import PageTitle from "../../components/page-title/page-title";
import Form from "../../components/form/form";
import Paragraph from "../../components/typography/paragraph";

export const metadata = {
  title: "Schrijf je eigen verhaal",
  description: "Schrijf je eigen verhaal",
};

export default function Write() {
  return (
    <MainLayout className="write__container">
      <PageTitle title="Schrijf jouw verhaal" paddingBottom />
      <div className={style.about__section}>
        <Paragraph variant="sm">
          Ook je verhaaltje op SoundStories? Stuur het in en ik zet het er -
          misschien - op!
        </Paragraph>
      </div>
      <br /> <br />
      <div className={style.about__section}>
        <Heading variant="sm" fontWeight={300}>
          Eisen
        </Heading>
        <Paragraph variant="sm">
          • Je verhaaltje is niet langer dan 1000 woorden
        </Paragraph>
        <Paragraph variant="sm">
          • Geïnspireerd door een liedje, in de breedste zin van het woord. Het
          liedje mag er in genoemd worden, maar dat hoeft niet.
        </Paragraph>
        <Paragraph variant="sm">
          • Het is het leukst als het verhaaltje ook zonder de songtekst te
          begrijpen is (maar dat de tekst of de muziek eventueel wel iets
          toevoegt voor de lezer)
        </Paragraph>
        <Paragraph variant="sm">
          • Doe je best een foutloos geschreven verhaal in te leveren 😊
        </Paragraph>
      </div>
      <br /> <br />
      <div className={style.about__section}>
        <Heading variant="sm" fontWeight={300}>
          Tips
        </Heading>
        <Paragraph variant="sm">
          • Niet alle songteksten werken voor mij: Soms is het liedje op
          zichzelf al een rond verhaal, soms is het juist te cryptisch of
          poëtisch
        </Paragraph>
        <Paragraph variant="sm">
          • Kom je er tijdens het schrijven achter dat het niet werkt: gooi het
          weg en probeer een ander liedje!
        </Paragraph>
        <Paragraph variant="sm">
          • Probeer het gevoel dat de muziek je geeft in woorden om te zetten,
          niet alleen de tekst
        </Paragraph>
        <br /> <br />
      </div>
      <Form />
    </MainLayout>
  );
}
