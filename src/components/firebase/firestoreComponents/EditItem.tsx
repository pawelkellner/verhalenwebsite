'use client'
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Firebase.css";

export default function EditItem() {
    const [verhaal, setVerhaal] = useState(null);
    const [inputId, setInputId] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedNumber, setEditedNumber] = useState("");

    useEffect(() => {
        if (verhaal) {
            setEditedName(verhaal.name || "");
            setEditedNumber(verhaal.number || "");
        }
    }, [verhaal]);

    const fetchVerhaal = async () => {
        try {
            const docRef = doc(db, 'verhalen', inputId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setVerhaal({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log('No such document!');
                setVerhaal(null);
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    const handleEdit = async () => {
        try {
            const docRef = doc(db, 'verhalen', verhaal.id);
            await updateDoc(docRef, {
                name: editedName,
                number: editedNumber
            });
            console.log("Document updated successfully!");
            setVerhaal(null);
            setInputId("");
            setEditedName("");
            setEditedNumber("");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div className="show_container">
            <p>Enter document ID to edit</p>
            <input
                type="text"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
            />
            <button onClick={fetchVerhaal}>Edit item</button>
            {verhaal && (
                <div>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                        type="text"
                        value={editedNumber}
                        onChange={(e) => setEditedNumber(e.target.value)}
                    />
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};
