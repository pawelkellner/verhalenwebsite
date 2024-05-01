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
  id,
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
    let newIntroText: string;
    let amountOfChars;

    switch (true) {
      case screenWidth >= 768:
        amountOfChars = 180;
        break;
      case screenWidth >= 510:
        amountOfChars = 152;
        break;
      case screenWidth >= 400:
        amountOfChars = 100;
        break;
      default:
        amountOfChars = 66;
        break;
    }

    newIntroText = text.slice(0, amountOfChars);

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
    <button className="unstyled" onClick={() => router.push(`story/${id}`)}>
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
            <div
              className={`storycard__textWrapper ${
                !introText && "skeletonText"
              }`}
            >
              <Heading>{title}</Heading>
              {introText ? (
                <Paragraph>
                  {introText}
                  <a href="#" className="storycard__readmore">
                    {" "}
                    Lees verder
                  </a>
                </Paragraph>
              ) : (
                <>
                  <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fuga, quod.
                  </Paragraph>
                  <Paragraph>Lorem ipsum dolor.</Paragraph>
                </>
              )}
            </div>
          </div>
          <Paragraph>
            <span>Geschreven door </span>
            {author}
          </Paragraph>
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
