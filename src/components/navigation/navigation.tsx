"use client";
import { useState, useReducer, useEffect } from "react";

import "./navigation.scss";
import {
  initialState,
  reducer,
  ActionTypes,
} from "../../store/navigation-reducer";

import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import Button from "../button";
import LinkButton from "../link-button/link-button";

import SearchSvg from "../svg/SearchSvg";
import LogoSvg from "../svg/LogoSvg";

const Navigation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [classString, setClassString] = useState("");

  useEffect(() => {
    if (scrollHeight >= 367) {
      setClassString("nav -white");
    } else {
      setClassString("nav");
    }
  }, [scrollHeight]);

  function search(e) {}

  function changeScrollHeight() {
    setScrollHeight(window.scrollY);
  }

  function initScroll() {
    if (!eventAdded) {
      window.addEventListener("scroll", changeScrollHeight);
      changeScrollHeight();
      setEventAdded(true);
    }
  }

  initScroll();

  useEffect(() => {
    console.log(state.showSearchBar);
  }, [state.showSearchBar]);

  return (
    <>
      <nav className={classString} data_open={isMenuOpen}>
        <LinkButton href="/" className="nav__logo">
          <LogoSvg></LogoSvg>
          <Heading variant="lg">Muziek verhalen</Heading>
        </LinkButton>
        {state.showSearchBar && (
          <div className="nav__searchWrapper">
            <input
              onInput={(e) => search(e)}
              type="text"
              placeholder="Zoek verhalen"
            />
            <SearchSvg iconColor="#7D7D7B"></SearchSvg>
          </div>
        )}
        <div className="nav__buttons">
          <LinkButton
            href="/about"
            onClick={() =>
              dispatch({ type: ActionTypes.TOGGLE_SEARCH_BAR, value: false })
            }
          >
            Over Muziek verhalen
          </LinkButton>

          <LinkButton
            href="/write"
            onClick={() =>
              dispatch({ type: ActionTypes.TOGGLE_SEARCH_BAR, value: false })
            }
          >
            Schrijven
          </LinkButton>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="nav__hamburgerMenu container">
          <LinkButton href="/about">Over Muziek verhalen</LinkButton>
          <LinkButton href="/write">Schrijven</LinkButton>
        </div>
      )}
    </>
  );
};

export default Navigation;
