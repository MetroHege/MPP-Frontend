import { useState } from "react";
import { fetchData } from "../lib/functions";
import {
    DeleteMessageResponse,
    GetMessagesResponse,
    Message,
    PostMessagesRequest
} from "mpp-api-types";

const useMessages = () => {
    const [messages, setMessages] = useState<WithId<Message>[]>([]);

    const getListingMessages = async (id: number) => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/listings/" + id + "/messages");
            const messages = await fetchData<GetMessagesResponse>(url.toString());
            console.log("messages", messages);
            setMessages(messages);
        } catch (error) {
            console.error("getListingMessages failed", error);
        }
    };

    const getMessagesByListingId = async (id: number) => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/listings/" + id + "/messages");
            const messages = await fetchData<WithId<Message>[]>(url.toString());
            setMessages(messages);
        } catch (error) {
            console.error("getMessagesByListingId failed", error);
        }
    };

    const postMessage = async (id: number, message: PostMessagesRequest, token: string) => {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(message)
        };

        await fetchData(import.meta.env.VITE_SERVER + "/listings/" + id + "/messages", options);
    };

    const deleteMessage = async (id: number, token: string): Promise<DeleteMessageResponse> => {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };

        const response = await fetchData(import.meta.env.VITE_SERVER + "/messages/" + id, options);
        return response as DeleteMessageResponse;
    };

    return { messages, getListingMessages, postMessage, getMessagesByListingId, deleteMessage };
};

export default useMessages;
