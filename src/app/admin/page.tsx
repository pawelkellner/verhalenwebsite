"use client";
import style from "./page.module.scss";
import React, { useState, useEffect, useReducer } from "react";
import { authLogin, isUserLoggedIn, authLogout } from "../../app/actions";
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
    checkAuth();
  }, []);

  async function login() {
    await authLogin(email, password);
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

  useEffect(() => {
    console.log("HERE2", state.isUserAuthenticated);
  }, [state.isUserAuthenticated]);

  async function checkAuth() {
    const response = await isUserLoggedIn();
    dispatch({
      type: ActionTypes.AUTHENTICATE_USER,
      value: response !== false,
    });
  }

  async function logoutUser() {
    await authLogout();
    dispatch({ type: ActionTypes.AUTHENTICATE_USER, value: false });
    checkAuth();
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
      <div className={textInputStyles.input__group}>
        {state.isUserAuthenticated && (
          <Button
            variant="primary"
            style={{
              width: "100%",
            }}
            onClick={() => logoutUser()}
          >
            Log out
          </Button>
        )}
      </div>
    </MainLayout>
  );
}
