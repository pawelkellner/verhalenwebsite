"use client";
import "./navigation.scss";
import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import Button from "../button";
import SearchSvg from "../svg/SearchSvg";
import HamburgerSvg from "../svg/HamburgerSvg";
import LogoSvg from "../svg/LogoSvg";
import CloseSvg from "../svg/CloseSvg";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function search(e) {}

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <nav className="nav">
        <a href="/" className="nav__logo">
          <LogoSvg></LogoSvg>
          <Heading variant="lg">Muziek verhalen</Heading>
        </a>
        <div className="nav__searchWrapper">
          <input
            onInput={(e) => search(e)}
            type="text"
            placeholder="Zoek verhalen"
          />
          <SearchSvg iconColor="#7D7D7B"></SearchSvg>
        </div>
        <div className="nav__buttons">
          <a href="/about">Over Muziek verhalen</a>
          <a href="/write">
            <Button variant="primary">Schrijven</Button>
          </a>
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
          <a href="/about">
            <Paragraph variant="sm">Over Muziek verhalen</Paragraph>
          </a>
          <a href="/write">
            <Paragraph variant="sm">Schrijven</Paragraph>
          </a>
        </div>
      )}
    </>
  );
};

export default Navigation;
