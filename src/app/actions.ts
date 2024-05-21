"use server"

import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../firebase'; // Assuming the Firebase initialization file is named firebaseConfig.js and it exports the initialized app as 'app'
import { db } from "../firebase";

export async function submitStory(storyData, imageUrl) {
    try {
        const docRef = await addDoc(collection(db, "verhalen"), {
            ...storyData,
            songImage: imageUrl,
            createdAt: serverTimestamp(),
        });

        console.log("Document added successfully", docRef.id)
    } catch (e) {
        console.log(e)
        return JSON.stringify(e)
    }
}

export async function approveStory(story) {
    try {
        const docRef = doc(db, "verhalen", story.id);
        await updateDoc(docRef, {
            underReview: false
        });
        console.log("Story approved successfully")
    } catch (e) {
        console.log(e)
        return JSON.stringify(e)
    }
}

export async function deleteStory(story) {
    try {
        const docRef = doc(db, "verhalen", story.id);
        await deleteDoc(docRef);
        console.log("Story deleted successfully")
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
        return userEmail
    } catch (error) {
        console.log(error.message);
    }
}

export async function isUserLoggedIn() {
    try {
        const auth = getAuth(app);
        if (auth.currentUser !== null) {
            return auth.currentUser.email
        } else {
            return false
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function authLogout() {
    try {
        const auth = getAuth(app);
        await signOut(auth);
    } catch (error) {
        console.log(error.message);
    }
}
