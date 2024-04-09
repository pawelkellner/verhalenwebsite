'use client'
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import "./Auth.css";

export default function AuthLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const auth = getAuth();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div className='auth_container'>
            <h2>Login</h2>
            <p>Email</p>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>Password</p>
            <input
                type="text" //This should be password but that will give errors for some reason
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
