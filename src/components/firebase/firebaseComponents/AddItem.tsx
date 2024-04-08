'use client'
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import serverTimestamp
import { db } from "../../../firebase";
import "./Firebase.css"

export default function AddItem() {
    const [inputName, setInputName] = useState("");
    const [inputNumber, setInputNumber] = useState("");

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'verhalen'), {
                name: inputName,
                number: inputNumber,
                createdAt: serverTimestamp(), // Include creation date
            });
            console.log("Document written with ID: ", docRef.id);
            setInputName("");
            setInputNumber("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <div className="add_container">
            <p>Fill in document name</p>
            <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
            />
            <p>Fill in document number</p>
            <input
                type="text"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
            />
            <p>Name: {inputName}</p>
            <p>Number: {inputNumber}</p>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}
