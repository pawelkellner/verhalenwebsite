import React from "react";

import style from "./page.module.scss";

import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";
import Paragraph from "../../components/typography/paragraph";

export const metadata = {
  title: "Over",
  description: "Over SoundStories",
};

export default function About() {
  return (
    <MainLayout>
      <PageTitle title="Over SoundStories" paddingBottom />
      <div className={style.about__container}>
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
          geïnspireerd zijn door een bestaand liedje. En heb daar heel veel lol
          in.
          <br /> <br />
          Ik nodig iedereen uit ook een poging te wagen: Neem een liedje dat je
          leuk vindt, ga er helemaal in op, lees de tekst, vertaal het, luister
          het nog tig keer en schrijf er een verhaaltje bij. En wie weet kom het
          wel als gastverhaaltje op deze site.
          <br /> <br />
          Veel dank aan Ties, Pawel en Samed, studenten Software Developer van
          het Mediacollege Amsterdam, die deze mooie site gemaakt hebben.
        </Paragraph>
      </div>
    </MainLayout>
  );
}
