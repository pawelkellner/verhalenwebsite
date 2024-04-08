'use client'
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Firebase.css";

export default function ShowItem() {
    const [verhalen, setVerhalen] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVerhalen = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'verhalen'), orderBy('createdAt', 'asc')));
            const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVerhalen(verhalenData);
            console.log(verhalenData)
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchVerhalen();
    }, []);

    return (
        <div className="show_container">
            <h2>Verhalen</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {verhalen.map(verhaal => (
                        <li className="show_li" key={verhaal.id}>
                            <p>Name: {verhaal.name}</p>
                            <p>Number: {verhaal.number}</p>
                            <p>Id: {verhaal.id}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={fetchVerhalen} disabled={loading}>Load verhalen</button>
        </div>
    );
};

