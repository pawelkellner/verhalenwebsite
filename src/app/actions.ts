"use server"

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; // Assuming the Firebase initialization file is named firebaseConfig.js and it exports the initialized app as 'app'
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

    const apiURL = 'https://api.lyrics.ovh';

    try {
        const response = await fetch(`${apiURL}/v1/${artist}/${title}`);
        const data = await response.json();
        return data.lyrics

    } catch (e) {
        console.log(e)
    }
}

export async function authLogin(email, password) {

    const auth = getAuth(app);

    try {
       const getUser = await signInWithEmailAndPassword(auth, email, password);
       const userEmail = getUser.user.email
       return [userEmail, "test"]
    } catch (error) {
        console.log(error.message);
    }
}
