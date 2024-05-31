"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoSvg from "../svg/LogoSvg";
import Paragraph from "../typography/paragraph";
import "./footer.scss";
import { ActionTypes } from "../../store/auth-reducer";
import { useAuth } from "../../auth-context";
import { authLogout } from "../../app/actions";
import Button from "../button";

const Footer = () => {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  async function logoutUser() {
    await authLogout();
    localStorage.removeItem("isUserAuthenticated");
    dispatch({ type: ActionTypes.AUTHENTICATE_USER, value: false });
    router.push("/");
  }

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
          {state.isUserAuthenticated ? (
            <div
              style={{
                textAlign: "right",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
              }}
            >
              <Button
                onClick={() => logoutUser()}
                variant="unstyled"
                style={{ fontSize: 20 }}
              >
                Uitloggen
              </Button>
            </div>
          ) : (
            <Link href="/admin">
              <Paragraph variant="md">Inloggen voor beheerders</Paragraph>
            </Link>
          )}
        </div>

        <div className="footer__copyright">
          <LogoSvg />
          <Paragraph variant="md">©2024 SoundStories</Paragraph>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
