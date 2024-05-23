import React from "react";

import style from "./page.module.scss";

import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";
import Heading from "../../components/typography/heading";
import Paragraph from "../../components/typography/paragraph";

export const metadata = {
  title: "Over",
  description: "Over SoundStories",
};

export default function About() {
  return (
    <MainLayout>
      <PageTitle title="Over SoundStories" />
      <div className={style.about__container}>
        <div>
          <Paragraph variant="sm">
            Mijn naam is Inge, de schrijvende alter ego van Ingrid van de
            Bovenkamp. <br /> <br />
            December 2023 deed ik, Inge dus, mee aan een schrijfwedstrijd:
            “Schrijf een verhaal van maximaal 750 woorden waarin een liedje een
            hoofdrol speelt”. Samen met collega-schrijvers uit mijn schrijfgroep
            heb ik een poging gewaagd, helaas is geen van onze verhaaltjes in de
            top-3 terecht gekomen. Maar ik kan
            <br /> <br />
            sindsdien niet meer stoppen met korte verhaaltjes schrijven die
            geïnspireerd zijn door een bestaand liedje. En heb daar heel veel
            lol in.
            <br /> <br />
            Ik nodig iedereen uit ook een poging te wagen: Neem een liedje dat
            je leuk vindt, ga er helemaal in op, lees de tekst, vertaal het,
            luister het nog tig keer en schrijf er een verhaaltje bij. En wie
            weet kom het wel als gastverhaaltje op deze site.
            <br /> <br />
            Veel dank aan Ties, Pawel en Samed, studenten Software Developer van
            het Mediacollege Amsterdam, die deze mooie site gemaakt hebben.
          </Paragraph>
        </div>
        <div>
          <div className={style.about__section}>
            <Heading variant="sm">Schrijven</Heading>
            <Paragraph variant="sm">
              Ook je verhaaltje op SoundStories? Stuur het in en ik zet het er -
              misschien - op!
            </Paragraph>
          </div>
          <br /> <br />
          <div className={style.about__section}>
            <Heading variant="sm">Eisen</Heading>
            <Paragraph variant="sm">
              • Je verhaaltje is niet langer dan 1000 woorden
            </Paragraph>
            <Paragraph variant="sm">
              • Geïnspireerd door een liedje, in de breedste zin van het woord.
              Het liedje mag er in genoemd worden, maar dat hoeft niet.
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
            <Heading variant="sm">Tips</Heading>
            <Paragraph variant="sm">
              • Niet alle songteksten werken voor mij: Soms is het liedje op
              zichzelf al een rond verhaal, soms is het juist te cryptisch of
              poëtisch
            </Paragraph>
            <Paragraph variant="sm">
              • Kom je er tijdens het schrijven achter dat het niet werkt: gooi
              het weg en probeer een ander liedje!
            </Paragraph>
            <Paragraph variant="sm">
              • Probeer het gevoel dat de muziek je geeft in woorden om te
              zetten, niet alleen de tekst
            </Paragraph>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
