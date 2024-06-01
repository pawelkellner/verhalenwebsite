import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Verhaal } from "../../utils";

export async function GET() {
    try {
        const querySnapshot = await getDocs(query(collection(db, 'verhalen'), orderBy('createdAt', 'asc')));
        const verhalenData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Verhaal));

        // Filter verhalenData to only include objects where underReview is false
        // const filteredVerhalenData = verhalenData.filter(verhaal => !verhaal.underReview === true);

        return new Response(JSON.stringify({
            body: verhalenData,
        }), {
            headers: {
                "Content-Type": "application/json",
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
    try {
        return new Response(JSON.stringify({
            message: `Empty post route`
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