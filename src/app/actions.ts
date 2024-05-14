"use server"

import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

export async function submitStory(storyData, imageUrl){
    try {
        

        const docRef = await addDoc(collection(db, "verhalen"), {
            ...storyData,
            linkToSong: imageUrl,
            createdAt: serverTimestamp(),
        });

        console.log("Document added successfully", docRef.id)
    } catch (e) {
        console.log(e)
        return JSON.stringify(e)
    }
}