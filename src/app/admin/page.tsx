"use client"

import style from "./page.module.scss";
import React, { useState } from 'react';
import { authLogin } from "../../app/actions";

export default function AuthLogin() {

    async function loginWithCredentials() {
      const response = await authLogin("testemail@m.com", "testpassword");
      console.log("user email:", response)
    }

    

    return (
        <div className={style.about__container}>
          <button onClick={() => loginWithCredentials()}>Log in</button>
        </div>
    );
}

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);

{/* <h2>Login</h2>
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
            {error && <p style={{ color: 'red' }}>{error}</p>} */}