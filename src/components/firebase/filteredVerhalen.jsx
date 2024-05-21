import { fetchVerhalen } from "../../app/utils";

export default async function filteredVerhalen(boolean) {
    if (boolean === true) {
        console.log("true boolean");
    }

    try {
        const response = await fetchVerhalen();
        
        if (Array.isArray(response)) {
            const filteredResponse = response.filter(item => item.underReview === false);
            return filteredResponse;
        } else {
            console.error("Expected an array but received:", response);
            return [];
        }
    } catch (error) {
        console.error("Error fetching verhalen:", error);
        return [];
    }
}
