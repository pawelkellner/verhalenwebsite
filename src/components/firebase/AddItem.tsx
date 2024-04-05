import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function AddItem() {

    const addItem = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'verhalen'), {
                name: "Verhaal naam"
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return(
        <div>
            <p> here: {process.env.test}</p>
            <p>Test</p>
            <button onClick={addItem}>Add Item</button>
        </div>
    );
}
