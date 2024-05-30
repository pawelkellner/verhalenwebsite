"use client"
import React from "react";

import style from "./page.module.scss";

import MainLayout from "../../components/main-layout/main-layout";
import PageTitle from "../../components/page-title/page-title";
import Paragraph from "../../components/typography/paragraph";
import {useSiteContent} from "../../components/site-content-provider/siteContentProvider";

// export const metadata = {
//   title: "Over",
//   description: "Over SoundStories",
// };

export default function About() {
  const { content } = useSiteContent();

  return (
    <MainLayout>
      <PageTitle title="Over SoundStories" paddingBottom />
      <div className={style.about__container}
           dangerouslySetInnerHTML={{
             __html: content.aboutContent
                 ? content.aboutContent
                 : "Aan het laden...",
           }}
      >
      </div>
    </MainLayout>
  );
}
