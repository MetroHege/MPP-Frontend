import { ErrorResponse } from "../types/MessageTypes";

// This function is used to fetch data from the server.
const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
        const errorJson = json as unknown as ErrorResponse;
        console.log("errorJson", errorJson);
        if (errorJson.message) {
            throw new Error(errorJson.message);
        }
        throw new Error(`Error ${response.status} occured`);
    }
    return json;
};

export { fetchData };
