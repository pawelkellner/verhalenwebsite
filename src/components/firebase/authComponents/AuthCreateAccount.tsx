"use client";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "./Auth.css";

export default function AuthCreateAccount() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName })
          .then(() => {
            setDisplayName("");
            setEmail("");
            setPassword("");
          })
          .catch((updateError) => {
            console.error("Error updating profile:", updateError);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div className="auth_container">
      <h1>Create Account</h1>
      <p>Name</p>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <p>Email</p>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Password</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={createUser}>Create user</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
