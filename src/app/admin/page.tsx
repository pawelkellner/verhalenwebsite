"use client";

import style from "./page.module.scss";
import React, { useState } from "react";
import { authLogin, isUserLoggedIn, authLogout } from "../../app/actions";
import Button from "../../components/button";
import LinkButton from "../../components/link-button/link-button";
import { useRouter } from "next/navigation";

export default function AuthLogin() {
  const router = useRouter();

  async function loginWithCredentials() {
    const response = await authLogin("testemail@m.com", "testpassword");
    console.log("user email:", response);
    // router.replace("/");
  }

  async function checkAuth() {
    const response = await isUserLoggedIn();
    if (response !== false) {
      console.log("user email:", response);
      // router.replace("/");
    } else {
      console.log("user is not logged in");
    }
  }

  async function logoutUser() {
    try {
      await authLogout();
    } catch (e) {
      console.log(e);
    }
    checkAuth();
  }

  return (
    <div className={style.about__container}>
      <Button
        variant="primary"
        style={{
          width: "100%",
          minWidth: 200,
          maxWidth: 500,
        }}
        onClick={() => loginWithCredentials()}
      >
        Log in
      </Button>
      <Button
        variant="secondary"
        style={{
          width: "100%",
          minWidth: 200,
          maxWidth: 500,
        }}
        onClick={() => checkAuth()}
      >
        Check auth
      </Button>
      <Button
        variant="secondary"
        style={{
          width: "100%",
          minWidth: 200,
          maxWidth: 500,
        }}
        onClick={() => logoutUser()}
      >
        Log out
      </Button>
    </div>
  );
}

// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState(null);

{
  /* <h2>Login</h2>
            <p>Email</p>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
                type="password" // Change type to 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          
            <button>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} */
}
