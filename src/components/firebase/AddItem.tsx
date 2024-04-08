'use client'
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./addItem.css"

export default function AddItem() {
    const [inputValue, setInputValue] = useState("");

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'verhalen'), {
                name: inputValue
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return(
        <div className="container">
            <p>Fill in document name</p>
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <p>{inputValue}</p>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}
