import { fetchData } from "../lib/functions";

const useLike = () => {
    const postLike = async (media_id: number, token: string) => {
        // Send a POST request to /likes with object { media_id } and the token in the Authorization header.
        const options: RequestInit = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ media_id })
        };

        return await fetchData<any>(import.meta.env.VITE_MEDIA_API + "/likes", options);
    };

    const deleteLike = async (like_id: number, token: string) => {
        // Send a DELETE request to /likes/:like_id with the token in the Authorization header.
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<any>(import.meta.env.VITE_MEDIA_API + "/likes/" + like_id, options);
    };

    const getCountByMediaId = async (media_id: number) => {
        // Send a GET request to /likes/:media_id to get the number of likes.
        return await fetchData<{ count: number }>(
            import.meta.env.VITE_MEDIA_API + "/likes/count/" + media_id
        );
    };

    const getUserLike = async (media_id: number, token: string) => {
        // Send a GET request to /likes/bymedia/user/:media_id to get the user's like on the media.
        const options: RequestInit = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<any>(
            import.meta.env.VITE_MEDIA_API + "/likes/bymedia/user/" + media_id,
            options
        );
    };

    return { postLike, deleteLike, getCountByMediaId, getUserLike };
};

export default useLike;
