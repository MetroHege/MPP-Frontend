import React, { useEffect, useRef, useState } from "react";
import { Message, Message as MessageType, PartialUser } from "mpp-api-types";
import useMessages from "../hooks/MessageHooks";

interface Props {
    listingId: string;
    token: string;
}

const Messages: React.FC<Props> = ({ listingId, token }) => {
    const { messages, getListingMessages, postMessage } = useMessages();
    const formRef = useRef<HTMLFormElement>(null);
    const [inputValue, setInputValue] = useState("");

    //console.log(token, listingId, content, time);

    const doMessage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const form = event.currentTarget;
        const content = (form.elements.namedItem("message") as HTMLInputElement).value;
        try {
            await postMessage(Number(listingId), { content }, token);
            await getMessages();

            if (formRef.current) {
                formRef.current.reset();
                setInputValue(content);
            }
        } catch (error) {
            console.error("postMessage failed", error);
        }
    };

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
            {messages.length > 0 && (
                <>
                    <h3 className="mb-2 mt-4 text-xl">Messages</h3>
                    <ul>
                        {messages.map((message: Message) => (
                            <li key={message.id}>
                                <div className="rounded-md border border-slate-500 bg-slate-100 p-2 text-slate-950">
                                    <span className="font-bold ">
                                        {typeof message.user === "object" && message.user !== null
                                            ? (message.user as PartialUser).username
                                            : message.user}
                                    </span>
                                    <span className="ml-2 ">{message.content}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {token && (
                <form onSubmit={doMessage} className="mt-4">
                    <input
                        className="rounded-lg border-transparent flex-1 border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        name="message"
                        placeholder="Kirjoita viesti..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button
                        className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        type="submit"
                    >
                        Lähetä
                    </button>
                </form>
            )}
            <form onSubmit={doMessage} className="mt-4">
                <div className="flex flex-col">
                    <input
                        className="w-2/3 mb-2 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 pr-12 dark:text-slate-950 dark:bg-slate-50"
                        name="message"
                        placeholder="Kirjoita viesti..."
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button
                        className="w-1/3 p-2 mb-2 bg-green-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                        type="submit"
                    >
                        Lähetä
                    </button>
                </div>
            </form>
        </>
    );
};

export default Messages;
