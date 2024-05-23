import "./footer.scss";
import Link from "next/link";
import LogoSvg from "../svg/LogoSvg";
import Paragraph from "../typography/paragraph";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__links">
          <Link href="/about">
            <Paragraph variant="md">Over SoundStories</Paragraph>
          </Link>
          <Link href="/write">
            <Paragraph variant="md">Schrijf jouw verhaal</Paragraph>
          </Link>
          <Link href="/admin">
            <Paragraph variant="md">Inloggen voor beheerders</Paragraph>
          </Link>
        </div>
        <div className="footer__copyright">
          <Paragraph variant="md">©2024 SoundStories</Paragraph>
        </div>
        <div className="footer__logo">
          <LogoSvg />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
