import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { SiteContent } from "../../../utils";

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