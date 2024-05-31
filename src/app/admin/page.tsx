"use client";
import style from "./page.module.scss";
import React, { useState, useEffect } from "react";
import { authLogin, isUserLoggedIn } from "../../app/actions";
import Button from "../../components/button";
import { useRouter } from "next/navigation";
import TextInput from "../../components/text-input/text-input";
import MainLayout from "../../components/main-layout/main-layout";
import textInputStyles from "../../components/text-input/text-input.module.scss";
import { ActionTypes } from "../../store/auth-reducer";
import { useAuth } from "../../auth-context";

export default function AuthLogin() {
  const { state, dispatch } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state.isUserAuthenticated) {
      router.replace("/admin/review");
    }
  }, [state.isUserAuthenticated]);

  async function login() {
      const response = await authLogin(email, password);

      router.replace("/admin/review");
  }

  async function loginWithCredentials() {
    await authLogin("testemail@m.com", "testpassword");
    router.replace("/admin/review");
    dispatch({
      type: ActionTypes.AUTHENTICATE_USER,
      value: true,
    });
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
            <Button
              variant="secondary"
              style={{
                width: "100%",
              }}
              onClick={() => {
                loginWithCredentials();
              }}
            >
              DEV LOGIN
            </Button>
          </div>
        </>
      )}
    </MainLayout>
  );
}
