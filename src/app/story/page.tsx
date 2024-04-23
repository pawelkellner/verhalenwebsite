import React from "react";
import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";
import styles from "./page.module.scss";
import Paragraph from "../../components/typography/paragraph";
import Heading from "../../components/typography/heading";
import Button from "../../components/button";

export const metadata = {
    title: "Verhaal",
    description: "Verhaal",
};

export default async function Story() {
    return (
        <>
            <MainLayout>
                <PageTitle title="Peter en de Powerpoint" songTitle='Armin van Buuren – Blah Blah Blah' paddingBottom={true}/>
                <div className={styles.story__content}>
                    <div className={styles.story__story}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam at atque cupiditate, debitis dignissimos dolorum enim esse exercitationem facere fugiat hic iure libero maiores minus molestiae nihil perferendis quas ratione sit tempora vitae voluptatem voluptatibus. Aspernatur commodi, libero officia quis repellat unde voluptas. Adipisci cum dolore eum maxime necessitatibus perspiciatis quae sapiente. Animi, consectetur consequuntur deleniti dolorem error expedita ipsum iusto maiores minus mollitia, nam necessitatibus non officiis qui quos recusandae repellat repudiandae, sapiente unde vero! Alias atque dolorem, illum iste itaque quasi sunt vero! Beatae eaque enim id illo laboriosam. Deleniti dolor doloremque eligendi enim exercitationem maiores modi molestias officia, quo ratione reprehenderit sapiente ullam voluptas? Ad cupiditate delectus dignissimos dolorum eaque exercitationem incidunt ipsa libero, molestias neque numquam omnis porro possimus quibusdam quidem repellendus sapiente sit? A architecto dolor dolorum neque non qui soluta! A accusamus ad assumenda dignissimos dolorem error expedita, explicabo fugiat hic illo magnam minima, neque nesciunt nihil nisi obcaecati reiciendis reprehenderit ullam? Amet cupiditate eius fugit laborum odit officia pariatur sed veritatis. Ea repellat reprehenderit sunt! Ad beatae, consequatur culpa deleniti doloribus ducimus eaque, et ex fugit nam nesciunt nobis nostrum numquam officiis quibusdam ratione, reprehenderit saepe sed sequi similique sint tenetur voluptates? Alias beatae corporis doloribus obcaecati quae quis quos recusandae rerum voluptatibus. Alias aperiam, commodi corporis dolor dolore dolores earum et eum, excepturi fugit illum incidunt ipsa laudantium repellendus, unde. Alias atque debitis dolorum eaque eligendi et eum eveniet facere harum illo maxime minima minus modi neque nobis non nulla numquam perspiciatis possimus quaerat, quasi quia quis repellendus repudiandae sapiente similique sunt totam ut vitae voluptates! Animi aperiam asperiores atque beatae commodi corporis cum dicta doloremque ea eligendi enim expedita fuga id illo ipsum laborum laudantium magni maiores nisi nostrum nulla, omnis perspiciatis quae qui quia quidem quod quos sunt vero!
                    </div>
                    <div className={styles.story__information}>
                        <div className={styles.story__origin}>
                            <Paragraph>Dit verhaal is geïnspireerd op was Peters eerste werkdag. bij zijn nieuwe bedrijf. Hij was aangenomen als marketingmanager, ondanks dat hij tot nu toe alleen op communicatie-afdelingen had gewerkt. Op zijn CV had hij één en ander wat aangedikt en tijdens het gesprek misschien ook niet alles helemaal waarheidsgetrouw weergegeven.</Paragraph>
                            <div className={styles.story__author}>
                                <Paragraph>Verhaal geschreven door Marjolein (gastschrijver)</Paragraph>
                                <Paragraph>Gepubliceerd op 25 maart, 2024</Paragraph>
                            </div>
                        </div>
                        <div className={styles.story__quote}>
                            <h1>“I once told a friend that nothing really ends. No one can prove it”</h1>
                            <Paragraph>- Tom Barman / Deus</Paragraph>
                        </div>
                        <div className={styles.story__spotifyPlayer}>
                            <span>
                                <span></span>
                            </span>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <div className={styles.story__lyricsWrapper}>
                <MainLayout>
                    <div>
                        <Paragraph variant="md">Songtekst van 'Blah Blah Blah'</Paragraph>
                        <div className={styles.story__lyrics}>
                        </div>
                    </div>
                </MainLayout>
            </div>
            <MainLayout>
                <div className={styles.story__buttons}>
                    <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>Lees nog een verhaal</Button>
                    <Paragraph>Of</Paragraph>
                    <Button variant="secondary" style={{ width: '100%', justifyContent: 'center'  }}>Schrijf er zelf een</Button>
                </div>
            </MainLayout>
        </>
    );
}
