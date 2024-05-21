import { cache } from 'react';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import * as url from "url";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface Verhaal {
    id: string;
    name: string;
    storyTitle: string;
    storyText: string | TrustedHTML;
    author: string;
    song: {
        album: string;
        albumImage: string | StaticImport;
        artist: string;
        id: string;
        name: string;
        type: string;
    };
    songTitle: string;
    songText: string | TrustedHTML;
    songImage?: string | StaticImport;
    songOrigin: string;
    linkToSong: string | StaticImport;
    quoteAuthor: string;
    quoteText: string;
    originText: string;
    number: number;
    createdAt: {
        seconds: number,
        nanoseconds: number
    };
}

export const fetchVerhalen = (async () => {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'verhalen'), orderBy('createdAt', 'asc')));
        const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Verhaal));
        return verhalenData;
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
})