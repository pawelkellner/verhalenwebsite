'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import "./addItem.css";

export default function AddItem() {
    const [verhalen, setVerhalen] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVerhalen = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(query(collection(db, 'verhalen'), orderBy('createdAt', 'asc')));
            const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVerhalen(verhalenData);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVerhalen();
    }, []);

    return (
        <div className="container">
            <h2>Verhalen</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {verhalen.map(verhaal => (
                        <li key={verhaal.id}>
                            <p>Name: {verhaal.name}</p>
                            <p>Number: {verhaal.number}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={fetchVerhalen} disabled={loading}>Load verhalen</button>
        </div>
    );
};

