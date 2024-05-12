// "use client";
import React from "react";

import Image from "next/image";

import styles from "../page.module.scss";

import { stories } from "../../../example-stories";

import MainLayout from "../../../components/main-layout/main-layout";
import PlayButtonSvg from "../../../components/svg/PlayButtonSvg";
import PageTitle from "../../../components/page-title/page-title";
import Paragraph from "../../../components/typography/paragraph";
import Heading from "../../../components/typography/heading";
import LinkButton from "../../../components/link-button/link-button";
import {fetchVerhalen} from "../../utils";

export default async function Story({ params }: { params: { slug: string } }) {
  // const slug = parseInt(params.slug);
  const slug = params.slug;
  const verhalen = await fetchVerhalen();
  // const story = stories.find((story) => story.id === slug);
  const story = verhalen?.find((story) => story.id === slug);
  const date = new Date(Number(story?.createdAt)).toLocaleString("en-US")
  console.log(date)

  return (
    <>
      <MainLayout>
        <PageTitle
          title={story?.storyTitle ? story.storyTitle : "Titel niet beschikbaar"}
          songTitle={story?.songTitle}
          paddingBottom={true}
          storyPage={true}
        />
        <div className={styles.story__content}>
          <div className={styles.story__story}>
            <div className={styles.story__titleMobile}>
              <Heading>Peter en de Powerpoint</Heading>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            aperiam at atque cupiditate, debitis dignissimos dolorum enim esse
            exercitationem facere fugiat hic iure libero maiores minus molestiae
            nihil perferendis quas ratione sit tempora vitae voluptatem
            voluptatibus. Aspernatur commodi, libero. <br />
            <br />
            Officia quis repellat unde voluptas. Adipisci cum dolore eum maxime
            necessitatibus perspiciatis quae sapiente. Animi, consectetur
            consequuntur deleniti dolorem error expedita ipsum iusto maiores
            minus mollitia, nam necessitatibus non officiis qui quos recusandae
            repellat repudiandae, sapiente unde vero! Alias atque dolorem, illum
            iste itaque quasi sunt vero! Beatae eaque enim id illo laboriosam.
            Deleniti dolor doloremque eligendi enim exercitationem maiores modi
            molestias officia, quo ratione reprehenderit sapiente ullam
            voluptas? Ad cupiditate delectus dignissimos dolorum eaque
            exercitationem incidunt ipsa libero, molestias neque numquam omnis
            porro possimus quibusdam quidem repellendus sapiente sit? A
            architecto dolor dolorum neque non qui soluta! A accusamus ad
            assumenda dignissimos dolorem error expedita, explicabo fugiat.
            <br />
            <br />
            Hic illo magnam minima, neque nesciunt nihil nisi obcaecati
            reiciendis reprehenderit ullam?
            <br />
            <br />
            Amet cupiditate eius fugit laborum odit officia pariatur sed
            veritatis. Ea repellat reprehenderit sunt! Ad beatae, consequatur
            culpa deleniti doloribus ducimus eaque, et ex fugit nam nesciunt
            nobis nostrum numquam officiis quibusdam ratione, reprehenderit
            saepe sed sequi similique sint tenetur voluptates? Alias beatae
            corporis doloribus obcaecati quae quis quos recusandae rerum
            voluptatibus. Alias aperiam, commodi corporis dolor dolore dolores
            earum et eum, excepturi fugit illum incidunt ipsa laudantium
            repellendus, unde.
            <br />
            <br />
            Alias atque debitis dolorum eaque eligendi et eum eveniet facere
            harum illo maxime minima minus modi neque nobis non nulla numquam
            perspiciatis possimus quaerat, quasi quia quis repellendus
            repudiandae sapiente similique sunt totam ut vitae voluptates!
            <br />
            <br />
            Animi aperiam asperiores atque beatae commodi corporis cum dicta
            doloremque ea eligendi enim expedita fuga id illo ipsum laborum
            laudantium magni maiores nisi nostrum nulla, omnis perspiciatis quae
            qui quia quidem quod quos sunt vero!
          </div>
          <div className={styles.story__information}>
              <div className={styles.story__origin}>
            {story?.songOrigin && (
                <Paragraph>
                  Dit verhaal is geïnspireerd op was Peters eerste werkdag. bij
                  zijn nieuwe bedrijf. Hij was aangenomen als marketingmanager,
                  ondanks dat hij tot nu toe alleen op communicatie-afdelingen had
                  gewerkt. Op zijn CV had hij één en ander wat aangedikt en
                  tijdens het gesprek misschien ook niet alles helemaal
                  waarheidsgetrouw weergegeven.
                </Paragraph>
            )}
                <div className={styles.story__author}>
                  <Paragraph>
                    Verhaal geschreven door {story?.author}
                  </Paragraph>

                  <Paragraph>Gepubliceerd op 25 maart, 2024</Paragraph>
                </div>
              </div>
            {story?.quoteAuthor && (
              <div className={styles.story__quote}>
                  <h1>
                      “{story?.quoteText}”
                  </h1>
                <Paragraph>- {story?.quoteAuthor}</Paragraph>
              </div>
            )}
            {story?.songImage && (
              <div className={styles.story__spotifyPlayer}>
                <span>
                    <Image src={story?.songImage ? story?.songImage : ''} alt={"album cover"} fill />
                  <span />
                  <PlayButtonSvg />
                </span>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
      <div className={styles.story__lyricsWrapper}>
        <MainLayout>
          <div>
            <Paragraph variant="md">
              Songtekst van &apos;{story?.songTitle}&apos;
            </Paragraph>
            <div className={styles.story__lyrics}>
              All we ever hear from you is blah, blah, blah
              <br />
              So, all we ever do is go ya, ya, ya
              <br />
              And we don&apos;t even care about what they say
              <br />
              &apos;Cause it&apos;s ya-ya, ya-ya
              <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is <br />
              Blah, blah, blah, blah, blah, blah
              <br />
              Blah, blah, blah, blah, blah, blah <br />
              Blah, blah, blah, blah, blah, blah...
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
              <br />
              <br />
              All we ever hear from you is blah, blah, blah <br />
              So, all we ever do is go ya, ya, ya <br />
              And we don&apos;t even care about what they say <br />
              &apos;Cause it&apos;s ya-ya, ya-ya <br />
              Blah-blah, blah-blah
            </div>
          </div>
        </MainLayout>
      </div>
      <MainLayout>
        <div className={styles.story__buttons}>
          <LinkButton href={`/story/${slug + 1}`} buttonVariant="secondary">
            Lees nog een verhaal
          </LinkButton>
          <Paragraph>Of</Paragraph>
          <LinkButton href="/write" buttonVariant="secondary">
            Schrijf er zelf een
          </LinkButton>
        </div>
      </MainLayout>
    </>
  );
}
