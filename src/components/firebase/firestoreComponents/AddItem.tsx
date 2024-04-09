'use client'
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import "./Firebase.css";

export default function AddItem() {
    const [inputName, setInputName] = useState("");
    const [inputNumber, setInputNumber] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const addItem = async (e) => {
        e.preventDefault();
        try {
            // Upload image to Firebase Storage
            let imageUrl = null;
            if (image) {
                const storage = getStorage(); // Initialize storage instance
                const storageRef = ref(storage, image.name); // Get reference to the file
                await uploadBytes(storageRef, image); // Upload file
                imageUrl = await getDownloadURL(storageRef); // Get download URL
            }

            // Add document to Firestore
            const docRef = await addDoc(collection(db, 'verhalen'), {
                name: inputName,
                number: inputNumber,
                imageUrl: imageUrl, // add image URL to Firestore document
                createdAt: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
            setInputName("");
            setInputNumber("");
            setImage(null); // reset image state after upload
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

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
            <p>Upload Image</p>
            <input type="file" onChange={handleImageChange} />
            <p>Name: {inputName}</p>
            <p>Number: {inputNumber}</p>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}
