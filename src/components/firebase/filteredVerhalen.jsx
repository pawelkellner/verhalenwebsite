import { fetchVerhalen } from "../../utils";

export default async function filteredVerhalen(boolean) {
  try {
    const response = await fetchVerhalen();

    if (!Array.isArray(response)) {
      console.error("Expected an array but received:", response);
      return [];
    }

    let filteredResponse;
    if (boolean === true) {
      // Filter for items where 'underReview' is true
      filteredResponse = response.filter((item) => item.underReview === true);
    } else {
      // Filter for items where 'underReview' is false
      filteredResponse = response.filter((item) => item.underReview === false);
    }

    return filteredResponse;
  } catch (error) {
    console.error("Error fetching verhalen:", error);
    return [];
  }
}
