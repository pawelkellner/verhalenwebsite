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
import HamburgerSvg from "../svg/HamburgerSvg";
import LogoSvg from "../svg/LogoSvg";
import CloseSvg from "../svg/CloseSvg";

const Navigation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function search(e) {}

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    console.log(state.showSearchBar);
  }, [state.showSearchBar]);

  return (
    <>
      <nav className="nav">
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

          {isMenuOpen && (
            <CloseSvg
              iconClass="close"
              close={toggleMenu}
              iconColor="black"
            ></CloseSvg>
          )}
          {!isMenuOpen && (
            <HamburgerSvg
              open={toggleMenu}
              iconClass="open"
              iconColor="black"
            ></HamburgerSvg>
          )}
        </div>
      </nav>
      {isMenuOpen && (
        <div className="nav__hamburgerMenu container">
          <Link href="/about">
            <Paragraph variant="sm">Over Muziek verhalen</Paragraph>
          </Link>
          <Link href="/write">
            <Paragraph variant="sm">Schrijven</Paragraph>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navigation;
