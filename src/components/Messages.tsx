import React, { useEffect, useRef, useState } from "react";
import { Message, PartialUser } from "mpp-api-types";
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

            setInputValue("");

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
                    <ul>
                        {messages.map((message: Message) => (
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
                        className="py-2 px-4  text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
