'use client'
import React, { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Firebase.css"

export default function DeleteItem() {
    const [inputId, setInputId] = useState("");

    const deleteItem = async (e) => {
        e.preventDefault();
        try {
            await deleteDoc(doc(db, 'verhalen', inputId));
            console.log("Document with ID: ", inputId, " deleted successfully");
            setInputId("");
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }

    return (
        <div className="add_container">
            <p>Enter document ID to delete</p>
            <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
            />
            <button onClick={deleteItem}>Delete Item</button>
        </div>
    );
}
