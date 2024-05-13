import { cache } from 'react';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

interface Verhaal {
    id: string;
    name: string;
    storyTitle: string;
    storyText: string | TrustedHTML;
    author: string;
    songTitle: string;
    songText: string | TrustedHTML;
    songImage?: string;
    songOrigin: string;
    linkToSong: string;
    quoteAuthor: string;
    quoteText: string;
    number: number;
    createdAt: object;
}

export const fetchVerhalen = cache(async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'verhalen'), orderBy('createdAt', 'asc')));
        const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Verhaal));
        return verhalenData;
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
})