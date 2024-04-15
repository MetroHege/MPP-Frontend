import React, { useState } from "react";
import Modal from "react-modal";
import { useTheme } from "../contexts/ThemeContext";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { theme } = useTheme();

    const [_error, setError] = useState("");

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsSubmitted(true);

        fetch("https://formcarry.com/s/dttdqRML0wv", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => response.json())
            .then(response => {
                if (response.code === 200) {
                    console.log("Form submitted successfully");
                } else if (response.code === 422) {
                    // Field validation failed
                    setError(response.message);
                } else {
                    // other error from formcarry
                    setError(response.message);
                }
            })
            .catch(error => {
                // request related error.
                setError(error.message ? error.message : error);
            });
    }

    return (
        <form className="flex flex-col items-center mb-0 ml-4 mr-4" onSubmit={e => onSubmit(e)}>
            <div className="flex flex-col w-2/3 mb-4">
                <label className="text-left text-xl font-bold mb-2" htmlFor="name">
                    Koko nimesi
                </label>
                <input
                    className="h-10 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    id="name"
                />
            </div>

            <div className="flex flex-col w-2/3 mb-4">
                <label className="text-left text-xl font-bold mb-2" htmlFor="email">
                    Sähköpostisi
                </label>
                <input
                    className="h-10 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    id="email"
                />
            </div>

            <div className="flex flex-col w-2/3 pb-2">
                <label className="text-left text-xl font-bold" htmlFor="message">
                    Viestisi
                </label>
                <p className="text-sm mb-2">
                    Jätäthän meille mahdollisimman tarkan kuvauksen ongelmastasi, jotta voimme
                    selvittää asiasi nopeammin ja tehokkaammin!
                </p>
                <textarea
                    className="h-64 mb-4 rounded border border-gray-300 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    id="message"
                    placeholder="Viestisi meille..."
                ></textarea>
            </div>

            <div className="flex w-2/3 pb-2">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    type="submit"
                >
                    Lähetä
                </button>
            </div>
            <Modal
                isOpen={isSubmitted}
                onRequestClose={() => setIsSubmitted(false)}
                className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                contentLabel="Form Submitted"
            >
                <div
                    className={`bg-main-medium rounded-lg w-1/3 ${theme === "light" ? "text-slate-950 bg-slate-100" : "text-white bg-main-medium"}`}
                >
                    <div className="flex flex-col items-start p-4">
                        <div className="flex items-center w-full">
                            <div className="font-medium text-lg">Kiitos yhteystiedoistasi!</div>
                            <svg
                                onClick={() => setIsSubmitted(false)}
                                className="ml-auto fill-current w-6 h-6 cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 18 18"
                            >
                                <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                            </svg>
                        </div>
                        <hr className="w-full mt-2 mb-3 border-gray-300" />
                        <p className="text-sm mb-2">Otamme sinuun yhteyttä mahdollisimman pian.</p>
                        <p className="text-sm mb-2">
                            Huomioithan kuitenkin, ettei DivariNet:ä ylläpidetä tällä hetkellä
                            aktiivisesti, joten vastaaminen saattaa kestää jonkin aikaa.
                        </p>
                        <p className="text-sm">Maltti on valttia! 😊</p>
                        <div className="ml-auto mt-4 space-x-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => {
                                    window.location.href = "/";
                                    setIsSubmitted(false);
                                }}
                            >
                                Palaa kotisivulle
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </form>
    );
}
