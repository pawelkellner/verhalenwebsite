"use server"

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function submitStory(storyData, imageUrl) {
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


export async function getLyrics(artist, title) {
    console.log("pong")

    const apiURL = 'https://api.lyrics.ovh';

    try {
        console.log("here")
        const response = await fetch(`${apiURL}/v1/${artist}/${title}`);
        const data = await response.json();
        return data.lyrics

    } catch(e) {
        console.log(e)
    } 
}