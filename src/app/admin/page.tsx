"use client";
import style from "./page.module.scss";
import React, { useState, useEffect } from "react";
import { authLogin } from "../../app/actions";
import Button from "../../components/button";
import { useRouter } from "next/navigation";
import TextInput from "../../components/text-input/text-input";
import MainLayout from "../../components/main-layout/main-layout";
import textInputStyles from "../../components/text-input/text-input.module.scss";
import { ActionTypes } from "../../store/auth-reducer";
import { useAuth } from "../../auth-context";
import Paragraph from "../../components/typography/paragraph";

export default function AuthLogin() {
  const { state, dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (state.isUserAuthenticated) {
      router.replace("/admin/review");
    }
  }, [state.isUserAuthenticated]);

  async function login() {
    const response = await authLogin(email, password);

    if ( response === email ) {
      localStorage.setItem("isUserAuthenticated", "true");
      router.replace("/admin/review");
      dispatch({
        type: ActionTypes.AUTHENTICATE_USER,
        value: true,
      });
      setAlertMessage('');
    } else {
      setAlertMessage('Verkeerde email of wachtwoord. Probeer nog een keer');
    }
  }

  return (
    <MainLayout className={style.about__container}>
      {!state.isUserAuthenticated && (
        <>
          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            label="Wachtwoord"
            type="password"
            name="password"
            placeholder="Wachtwoord"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className={textInputStyles.input__group}>
            { alertMessage && (
              <Paragraph color={'red'}>
                {alertMessage}
              </Paragraph>
            )}
            <Button
              variant="primary"
              style={{
                marginTop: 12,
                width: "100%",
              }}
              onClick={() => login()}
            >
              Log in
            </Button>
          </div>
        </>
      )}
    </MainLayout>
  );
}
