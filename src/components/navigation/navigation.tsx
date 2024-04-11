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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

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

  return (
    <header>
      <nav className={classString} data-open={isMenuOpen}>
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
            buttonVariant="primary"
            onClick={() =>
              dispatch({ type: ActionTypes.TOGGLE_SEARCH_BAR, value: false })
            }
          >
            Schrijven
          </LinkButton>
          <input
            onInput={toggleMenu}
            type="checkbox"
            id="menu_checkbox"
          ></input>
          <label className="hamburgercheck" htmlFor="menu_checkbox">
            <div></div>
            <div></div>
            <div></div>
          </label>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="nav__hamburgerMenu">
          <div className="container">
            <a href="/about">
              <Paragraph variant="sm">Over Muziek verhalen</Paragraph>
            </a>
            <a href="/write">
              <Paragraph variant="sm">Schrijven</Paragraph>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
