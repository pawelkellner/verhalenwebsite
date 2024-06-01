"use server"

import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { app } from '../firebase'; // Assuming the Firebase initialization file is named firebaseConfig.js and it exports the initialized app as 'app'
import { db } from "../firebase";

const storage = getStorage(app);

export async function submitContent(contentData, contentId) {
    try {
        const docRef = doc(db, "siteContent", contentId);

        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const updatePayload = {
                ...contentData,
                updatedAt: serverTimestamp(),
            };

            await updateDoc(docRef, updatePayload);

            return JSON.stringify({
                message: 'Content edited successfully',
                success: true
            })
        } else {
            const docRef = await addDoc(collection(db, "siteContent"), {
                ...contentData,
                createdAt: serverTimestamp(),
            });

            return JSON.stringify({
                message: 'Content added successfully',
                success: true
            })
        }
    } catch (e) {
        console.error(e);
        return JSON.stringify(e);
    }
}

export async function submitStory(storyData, imageUrl) {
    try {
        const docRef = await addDoc(collection(db, "verhalen"), {
            ...storyData,
            songImage: imageUrl,
            createdAt: serverTimestamp(),
        });

    } catch (e) {
        console.log(e);
        return JSON.stringify(e);
    }
}

export async function editStory(storyId, updatedData, newImageUrl) {
    try {
        const docRef = doc(db, "verhalen", storyId);

        // Get the document data to find the current image URL
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const storyData = docSnapshot.data();
            const currentImageUrl = storyData.songImage;

            // Delete the old image from Firebase Storage if a new image URL is provided
            if (newImageUrl && currentImageUrl) {
                const imageRef = ref(storage, currentImageUrl);
                await deleteObject(imageRef);
            }

            const updatePayload = {
                ...updatedData,
                updatedAt: serverTimestamp(),
            };

            if (newImageUrl) {
                updatePayload.songImage = newImageUrl;
            }

            await updateDoc(docRef, updatePayload);

            return JSON.stringify({
               success: true
            });
        } else {
            throw new Error("Document does not exist");
        }
    } catch (e) {
        console.log(e);
        return JSON.stringify(e);
    }
}

export async function approveStory(story) {
    try {
        const docRef = doc(db, "verhalen", story.id);
        await updateDoc(docRef, {
            underReview: false
        });
    } catch (e) {
        console.log(e);
        return JSON.stringify(e);
    }
}

export async function disApproveStory(story) {
    try {
        const docRef = doc(db, "verhalen", story.id);
        await updateDoc(docRef, {
            underReview: true
        });
    } catch (e) {
        console.log(e);
        return JSON.stringify(e);
    }
}

export async function deleteStory(story) {
    try {
        const docRef = doc(db, "verhalen", story.id);

        // Get the document data to find the image URL
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const storyData = docSnapshot.data();
            const imageUrl = storyData.songImage;

            // Delete the image from Firebase Storage
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }
        }

        await deleteDoc(docRef);
    } catch (e) {
        console.log(e);
        return JSON.stringify(e);
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
