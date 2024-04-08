'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import "./addItem.css";

export default function AddItem() {
    const [verhalen, setVerhalen] = useState([]);

    const fetchVerhalen = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'verhalen'));
            const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVerhalen(verhalenData);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        fetchVerhalen();
    }, []);

    return (
        <div className="container">
            <h2>Verhalen</h2>
            <ul>
                {verhalen.map(verhaal => (
                    <li key={verhaal.id}>
                        <p>Name: {verhaal.name}</p>
                        <p>Number: {verhaal.number}</p>
                    </li>
                ))}
            </ul>
            <button onClick={fetchVerhalen}>Load verhalen</button>
        </div>
    );
}
