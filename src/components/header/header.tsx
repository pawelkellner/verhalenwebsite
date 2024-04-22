"use client";
import { useState, useReducer, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import "./header.scss";
import { initialState, reducer, ActionTypes } from "../../store/header-reducer";

import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import Button from "../button";
import LinkButton from "../link-button/link-button";

import SearchSvg from "../svg/SearchSvg";
import LogoSvg from "../svg/LogoSvg";

const Header = () => {
  const router = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [classString, setClassString] = useState("");

  useEffect(() => {
    if (router !== "/") {
      setClassString("nav -white");
    } else if (router === "/" && scrollHeight >= 50) {
      setClassString("nav -white");
    } else {
      setClassString("nav");
    }
  }, [scrollHeight, router]);

  function search(e) {}

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function changeScrollHeight() {
    if ( typeof window !== "undefined" ) {
      setScrollHeight(window.scrollY);
    }
  }

  function initScroll() {
    if (!eventAdded && typeof window !== "undefined" ) {
      window.addEventListener("scroll", changeScrollHeight);
      changeScrollHeight();
      setEventAdded(true);
    }
  }

  initScroll();

  return (
    <header>
      <nav className={classString} data-open={isMenuOpen}>
        <Link href="/" className="nav__logo">
          <Button variant="unstyled">
            <LogoSvg />
            <Heading variant="lg">Muziek verhalen</Heading>
          </Button>
        </Link>
        {router === "/" && (
          <div className="nav__searchWrapper">
            <input
              onInput={(e) => search(e)}
              type="text"
              placeholder="Zoek verhalen"
            />
            <SearchSvg iconColor="#7D7D7B" />
          </div>
        )}
        <div className="nav__buttons">
          <LinkButton href="/about">Over Muziek verhalen</LinkButton>

          <LinkButton href="/write" buttonVariant="primary">
            Schrijven
          </LinkButton>
          <input onInput={toggleMenu} type="checkbox" id="menu_checkbox" />
          <label className="hamburgercheck" htmlFor="menu_checkbox">
            <div />
            <div />
            <div />
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

export default Header;
