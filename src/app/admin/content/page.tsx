"use client";
import React, { useEffect, useState } from "react";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import TextInput from "../../../components/text-input/text-input";
import Button from "../../../components/button";
import style from "./page.module.scss";
import { isUserLoggedIn, submitContent } from "../../actions";
import { useSiteContent } from "../../../components/site-content-provider/siteContentProvider";
import Paragraph from "../../../components/typography/paragraph";
import { useAuth } from "../../../auth-context";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// import { useCheckAuth } from "../../../utils";

const TextEditor = dynamic(
  () => {
    return import("../../../components/editor/editor");
  },
  { ssr: false }
);

export default function Page() {
  const { state } = useAuth();
  const router = useRouter();
  // const { checkAuth } = useCheckAuth();

  const { content } = useSiteContent();
  const [about, setAbout] = useState("");
  const [write, setWrite] = useState("");
  const [homeHeading, setHomeHeading] = useState("");
  const [homeText, setHomeText] = useState("");
  const [homeButton, setHomeButton] = useState("");
  const [writeCheckbox, setWriteCheckbox] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [alertText, setAlertText] = useState("");

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  useEffect(() => {
    if (!state.isUserAuthenticated) {
      router.replace("/admin");
      return;
    }

    setHomeHeading(content?.homeHeading);
    setHomeText(content?.homeText);
    setHomeButton(content?.homeButton);
    setWriteCheckbox(content?.writeCheckboxText);
  }, [content, state.isUserAuthenticated, router]);

  const isAboutText = about ? about?.length > 1 : false;
  const isWriteText = write ? write?.length > 1 : false;

  const parseData = (formData) => {
    const parsedObj = {
      homeHeading: formData.get("homeHeading"),
      homeText: formData.get("homeText"),
      homeButton: formData.get("homeButton"),
      writeContent: write,
      writeCheckboxText: formData.get("writeCheckbox"),
      aboutContent: about,
    };

    return parsedObj;
  };

  const editContent = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = parseData(data);

    if (!homeHeading) {
      setAlertText("Home heading mist!");
      return;
    }

    if (!homeText) {
      setAlertText("Home tekst mist!");
      return;
    }

    if (!homeButton) {
      setAlertText("Home button tekst mist!");
      return;
    }

    if (!isAboutText) {
      setAlertText("Over Soundstories tekst mist!");
      return;
    }

    if (!writeCheckbox) {
      setAlertText("Schrijven checkbox tekst mist!");
      return;
    }

    if (!isWriteText) {
      setAlertText("Schrijven omschrijving tekst mist!");
      return;
    }

    try {
      setAlertText("");
      const isLoggedIn = await isUserLoggedIn();
      let contentId = "rdalkwfnaoi";

      if ( content?.id ) {
        contentId = content?.id
      }

      if (isLoggedIn) {
        const response = await submitContent(
          dataObj,
          contentId
        );
        setLoading(true);

        if (JSON.parse(response).success) {
          setLoading(false);
          setSuccessMessage(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setWriteData = (data) => {
    setWrite(data);
  };

  const setAboutData = (data) => {
    setAbout(data);
  };

  if (state.isUserAuthenticated)
    return (
      <>
        <MainLayout>
          <PageTitle title="Content beheer" />
          <form onSubmit={editContent} className={style.form__styling}>
            <TextInput
              name={"homeHeading"}
              type={"text"}
              label={"Home heading"}
              value={homeHeading || ""}
              onChange={(e) => {
                setHomeHeading(e.target.value);
              }}
            />
            <TextInput
              name={"homeText"}
              type={"text"}
              label={"Home tekst"}
              value={homeText || ""}
              onChange={(e) => {
                setHomeText(e.target.value);
              }}
            />
            <TextInput
              name={"homeButton"}
              type={"text"}
              label={"Home button"}
              value={homeButton || ""}
              onChange={(e) => {
                setHomeButton(e.target.value);
              }}
            />
            <TextEditor
              placeholder={"..."}
              label={"Over ons"}
              value={content?.aboutContent || about || ""}
              onChange={setAboutData}
            />
            <TextInput
              name={"writeCheckbox"}
              type={"text"}
              label={"Schrijven - checkbox"}
              value={writeCheckbox || ""}
              onChange={(e) => {
                setWriteCheckbox(e.target.value);
              }}
            />
            <TextEditor
              placeholder={"..."}
              label={"Schrijven - omschrijving"}
              value={content?.writeContent || write || ""}
              onChange={setWriteData}
            />
            <Button
              variant={
                homeHeading === "" ||
                homeText === "" ||
                homeButton === "" ||
                writeCheckbox === "" ||
                !isAboutText ||
                !isWriteText ||
                loading
                  ? "disabled"
                  : "secondary"
              }
              style={{ width: "100%" }}
            >
              Pas content aan
            </Button>
            {alertText && <Paragraph color="red">{alertText}</Paragraph>}
            {successMessage && (
              <Paragraph variant="sm">Aanpassingen zijn opgeslagen!</Paragraph>
            )}
          </form>
        </MainLayout>
      </>
    );
}
