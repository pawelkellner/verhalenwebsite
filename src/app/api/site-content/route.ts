import {collection, getDocs, query, orderBy, addDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../../../firebase";
import { SiteContent } from "../../../utils";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export async function GET(request: Request) {
    console.log(request)
    try {
        const querySnapshot = await getDocs(query(collection(db, 'siteContent'), orderBy('updatedAt', 'asc')));
        const siteData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SiteContent));

        return new Response(JSON.stringify({
            body: siteData,
        }), {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Expires": "0",
                "Surrogate-Control": "no-store"
            },
            status: 201,
        })
    } catch (error) {
        return new Response(JSON.stringify(error), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
}

export async function POST(request: Request) {
    const data = await request.json();

    try {
        let imageUrl: string | null = null;

        if (data.songImage) {
            const storage = getStorage();
            const storageRef = ref(storage, data.songImage.name);
            await uploadBytes(storageRef, data.songImage);
            imageUrl = await getDownloadURL(storageRef);
        }

        const docRef = await addDoc(collection(db, "verhalen"), {
            ...data.story,
            songImage: imageUrl,
            createdAt: serverTimestamp()
        });

        return new Response(JSON.stringify({
            message: `Document written with ID: ${docRef.id}`
        }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        })
    } catch (e) {
        return new Response(JSON.stringify(e), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 400,
        })
    }
}