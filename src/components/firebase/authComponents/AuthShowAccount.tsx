'use client'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

interface IUser {
    displayName: string | null;
    email: string | null;
    uid: string | null;
    // Add any other properties you expect to have in your User object
}

export default function AuthShowAccount() {
    const [user, setUser] = useState<IUser | null>(null); // Specify IUser as the type for user state
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
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
