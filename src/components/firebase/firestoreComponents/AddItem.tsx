'use client'
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
            let imageUrl = null;
            if (image) {
                const storage = getStorage(); 
                const storageRef = ref(storage, image.name); 
                await uploadBytes(storageRef, image); 
                imageUrl = await getDownloadURL(storageRef); 
            }

            const docRef = await addDoc(collection(db, 'verhalen'), {
                name: inputName,
                number: inputNumber,
                imageUrl: imageUrl,
                createdAt: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
            setInputName("");
            setInputNumber("");
            setImage(null); 
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
