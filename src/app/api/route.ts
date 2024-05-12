import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

export async function GET(){
    return new Response('Get route');
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