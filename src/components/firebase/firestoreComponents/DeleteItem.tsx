'use client'
import React, { useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import "./Firebase.css";

export default function DeleteItem() {
    const [inputId, setInputId] = useState("");

    const deleteItem = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'verhalen', inputId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                
                await deleteDoc(docRef);
                console.log("Document with ID:", inputId, "deleted successfully");

                if (data.imageUrl) {
                    const storage = getStorage();
                    const imageRef = ref(storage, data.imageUrl);
                    await deleteObject(imageRef);
                    console.log("Image associated with the document deleted successfully");
                }
                
                setInputId("");
            } else {
                console.log('No such document!');
            }
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
