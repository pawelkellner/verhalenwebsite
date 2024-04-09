'use client'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AuthShowAccount() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("User is signed in");
            } else {
                setUser(null);
                console.log("User is not signed in");
            }
            setLoading(false);
        });
        
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUser(null);
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    return (
        <div className='auth_container'>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <div>
                    <p>Welcome, {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>UID: {user.uid}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Please sign in</p>
            )}
        </div>
    );
}
