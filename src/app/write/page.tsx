"use client"
import React from "react";

import "./page.scss";
import style from "../about/page.module.scss";

import MainLayout from "../../components/main-layout/main-layout";

import PageTitle from "../../components/page-title/page-title";
import Form from "../../components/form/form";
import {useSiteContent} from "../../components/site-content-provider/siteContentProvider";

// export const metadata = {
//   title: "Schrijf je eigen verhaal",
//   description: "Schrijf je eigen verhaal",
// };

export default function Write() {
  const { content } = useSiteContent();

  return (
    <MainLayout className="write__container">
      <PageTitle
        title="Ook je verhaaltje op SoundStories? Stuur het in en ik zet het er - misschien - op!"
        paddingBottom
      />
      <div className={style.about__section}
           dangerouslySetInnerHTML={{
             __html: content.writeContent
                 ? content.writeContent
                 : "Aan het laden...",
           }}
      >
      </div>
      <Form />
    </MainLayout>
  );
}
