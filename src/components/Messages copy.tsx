import React, { useState } from "react";
import { Message as MessageType, PartialUser } from "mpp-api-types";
import useMessages from "../hooks/MessageHooks";

interface Props {
    listingId: string;
    token: string;
}

const Messages: React.FC<Props> = ({ listingId, token }) => {
    const { messages, getListingMessages, postMessage } = useMessages();
    const [newMessage, setNewMessage] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const messageRequest = { content: newMessage }; // Add the 'content' property
        await postMessage(Number(listingId), messageRequest, token);

        setNewMessage("");
        getListingMessages(Number(listingId)); // Convert listingId to number
    };

    return (
        <div>
            {messages.map((message: MessageType) => (
                <p key={message.id}>
                    {typeof message.user === "object" && message.user !== null
                        ? (message.user as PartialUser).username
                        : message.user}
                    : {message.content}
                </p>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default Messages;
