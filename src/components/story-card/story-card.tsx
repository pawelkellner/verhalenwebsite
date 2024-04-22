"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./story-card.scss";
import { StoryCardProps } from "./story-card.types";

import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import NoteSvg from "../svg/NoteSvg";

const StoryCard = ({
  title,
  image,
  text,
  author,
  songName,
}: StoryCardProps) => {
  const router = useRouter();

  const [introText, setIntroText] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [listenerSet, setListenerSet] = useState(false);

  useEffect(() => {
    if (!listenerSet) {
      window.addEventListener("resize", (e: Event) => {
        if (e.target instanceof Window) {
          setScreenWidth(e.target.innerWidth);
        }
      });

      setScreenWidth(window.innerWidth);
      setListenerSet(true);
    }

    shortText();
  }, [screenWidth]);

  function shortText() {
    let wordsArray = text.match(/[\w\S]+/g);
    let newIntroText: string;
    let stringIndex = 0;
    let amountOfWords;

    switch (true) {
      case screenWidth >= 768:
        amountOfWords = 180;
        break;
      case screenWidth >= 510:
        amountOfWords = 20;
        break;
      case screenWidth >= 400:
        amountOfWords = 15;
        break;
      default:
        amountOfWords = 10;
        break;
    }

    // wordsArray &&
    //   wordsArray.forEach((word, index) => {
    //     if (index === amountOfWords) {
    //       stringIndex = text.indexOf(word) + word.length;
    //     }
    //   });

    newIntroText = text.slice(0, 180);

    switch (newIntroText.slice(-1)) {
      case ",":
      case ".":
      case " ":
        newIntroText = newIntroText.slice(0, newIntroText.length - 1);
        break;
    }

    newIntroText += "...";

    setIntroText(newIntroText);
  }

  return (
    <button className="unstyled" onClick={() => router.push("/story")} >
      <article className="storycard">
        {image && (
          <div className="storycard__imageWrapper">
            <Image fill src={image} alt={"Image"} />
          </div>
        )}
        <div className="storycard__content">
          <div>
            {image && (
              <div className="storycard__imageWrapperMobile">
                <Image fill src={image} alt={"Image"} />
              </div>
            )}
            <div className="storycard__textWrapper">
              <Heading>{title}</Heading>
              <Paragraph>
                {introText}
                <a href="#" className="storycard__readmore">
                  {" "}
                  Lees verder
                </a>
              </Paragraph>
            </div>
          </div>
          <Paragraph>Geschreven door {author}</Paragraph>
          <span className="storycard__song">
            <Paragraph>{songName}</Paragraph>
            <NoteSvg />
          </span>
        </div>
      </article>
    </button>
  );
};

export default StoryCard;
