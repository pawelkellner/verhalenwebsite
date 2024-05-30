'use client'
import React, { useState, useEffect, ChangeEvent } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import "./Firebase.css";

interface Verhaal {
    id: string;
    name: string;
    number: string;
    imageUrl?: string;
}

export default function EditItem() {
    const [verhaal, setVerhaal] = useState<Verhaal | null>(null);
    const [inputId, setInputId] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedNumber, setEditedNumber] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null); 

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
                setVerhaal({ id: docSnap.id, ...docSnap.data() } as Verhaal);
            } else {
                setVerhaal(null);
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    const handleEdit = async () => {
        try {
            if (!verhaal) return;

            const docRef = doc(db, 'verhalen', verhaal.id);
            
            const oldImageUrl = verhaal.imageUrl;

            await updateDoc(docRef, {
                name: editedName,
                number: editedNumber
            });
    
            if (newImage) {
                const storage = getStorage();
                const storageRef = ref(storage, newImage.name);
                await uploadBytes(storageRef, newImage);
                const imageUrl = await getDownloadURL(storageRef);
    
                await updateDoc(docRef, { imageUrl: imageUrl });

                if (oldImageUrl) {
                    const oldImageRef = ref(storage, oldImageUrl);
                    await deleteObject(oldImageRef);
                }
            }
    
            setVerhaal(null);
            setInputId("");
            setEditedName("");
            setEditedNumber("");
            setNewImage(null);
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
                    <input type="file" onChange={(e) => setNewImage(e.target.files![0])} />
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};
