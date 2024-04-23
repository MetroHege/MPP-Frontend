import React, { useEffect, useRef, useState } from "react";
import { Message, MessageWithId, PartialUser } from "mpp-api-types";
import useMessages from "../hooks/MessageHooks";
import Messages from "./Messages";

interface Props {
    listingId: string;
    token: string;
}

const AdminMessage: React.FC<Props> = ({ listingId, token }) => {
    const { messages, getListingMessages, postMessage } = useMessages();
    const formRef = useRef<HTMLFormElement>(null);
    const [inputValue, setInputValue] = useState("");

    const getMessages = async () => {
        try {
            await getListingMessages(Number(listingId));
        } catch (error) {
            console.error("getMessages failed", error);
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <>
            {messages.map((message: MessageWithId) => (
                <li key={message.id}>
                    <div className="rounded-md border w-2/3 border-slate-500 bg-slate-100 p-2 text-slate-950 dark:bg-slate-100 dark:text-slate-950 mb-1">
                        <span className="font-bold ">
                            {typeof message.user === "object" && message.user !== null
                                ? (message.user as PartialUser).username + ":"
                                : message.user + ":"}
                        </span>
                        <span className="ml-2 whitespace-pre-wrap break-all overflow-wrap break-word max-w-full">
                            {message.content}
                        </span>
                    </div>
                </li>
            ))}
        </>
    );
};

export default AdminMessage;
