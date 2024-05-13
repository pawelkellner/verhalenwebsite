"use server"

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function submitStory(storyData, songImage) {
    try {
        let imageUrl: string | null = null;

        if (songImage) {
            const storage = getStorage();
            const storageRef = ref(storage, songImage.name);
            await uploadBytes(storageRef, songImage);
            imageUrl = await getDownloadURL(storageRef);
        }

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