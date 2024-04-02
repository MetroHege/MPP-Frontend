import { fetchData } from "../lib/functions";
import { useUser } from "./UserHooks";

const useComment = () => {
    const postComment = async (comment_text: string, media_id: number, token: string) => {
        // Send a POST request to /comments with the comment object and the token in the Authorization header.
        const options: RequestInit = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment_text, media_id })
        };

        return await fetchData<MessageResponse>(
            import.meta.env.VITE_MEDIA_API + "/comments",
            options
        );
    };

    const { getUserById } = useUser();

    const getCommentsByMediaId = async (media_id: number) => {
        // TODO: Send a GET request to /comments/:media_id to get the comments.
        const comments = await fetchData<Comment[]>(
            import.meta.env.VITE_MEDIA_API + "/comments/bymedia/" + media_id
        );
        const commentsWithUsername = await Promise.all<Comment & { username: string }>(
            comments.map(async comment => {
                const user = await getUserById(comment.user_id);
                return { ...comment, username: user.username };
            })
        );
        return commentsWithUsername;
    };

    return { postComment, getCommentsByMediaId };
};

export default useComment;
