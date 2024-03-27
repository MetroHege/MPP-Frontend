import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import { useMe } from "../hooks/UserHooks";
import { useNavigate } from "react-router-dom";
import { PutUserRequest } from "mpp-api-types";

interface UserFormProps {
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

const UserForm: React.FC<UserFormProps> = ({ showForm, setShowForm }) => {
    const [user, setUser] = useState<PutUserRequest>({});

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { deleteMe, putMe } = useMe();
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();
    const [originalUser, setOriginalUser] = useState(user);

    useEffect(() => {
        setOriginalUser(user);
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (originalUser && value !== originalUser[name as keyof typeof originalUser]) {
            setUser({
                ...user,
                [name]: value
            });
        }
    };

    return (
        <Modal
            isOpen={showForm}
            onRequestClose={() => setShowForm(false)}
            className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
            contentLabel="Modal"
        >
            <div className="bg-main-medium rounded-lg w-1/3">
                <div className="flex flex-col items-start p-4">
                    <div className="flex items-center w-full">
                        <div className="font-medium text-lg">Muokkaa tietojasi:</div>
                        <svg
                            onClick={() => setShowForm(false)}
                            className="ml-auto fill-current w-6 h-6 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 18"
                        >
                            <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                        </svg>
                    </div>

                    <hr className="w-full mt-2 mb-3 border-gray-300" />

                    <form
                        className="flex flex-col items-center mb-0 ml-4 mr-4"
                        onSubmit={async e => {
                            e.preventDefault();
                            const token = localStorage.getItem("token");
                            if (token) {
                                await putMe(user, token);
                                setShowForm(false);
                            } else {
                                console.log("Token not found");
                            }
                        }}
                    >
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="username">
                                Käyttäjänimi:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                autoComplete="username"
                                placeholder={user.username}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label
                                className="w-1/3 text-left text-xl font-bold"
                                htmlFor="firstName"
                            >
                                Etunimi:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                placeholder={user.firstName}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                                Sukunimi:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                placeholder={user.lastName}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="text"
                                name="phone"
                                value={user.phone || ""}
                                onChange={handleChange}
                                placeholder={user.phone || ""}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                                Sähköposti:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder={user.email}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                                Salasana:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder={user.password}
                            />
                        </div>
                        <div className="flex w-2/3 pb-2">
                            <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                                Kaupunki:
                            </label>
                            <input
                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                type="text"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                                placeholder={user.city}
                            />
                        </div>
                        <div className=" text-left">
                            <p>
                                Mikäli haluat poistaa tilisi kokonaisuudessaan, paina{" "}
                                <button
                                    type="button"
                                    className="text-blue-500"
                                    onClick={event => {
                                        event.stopPropagation(); // Add this line
                                        setModalIsOpen(true);
                                    }}
                                >
                                    TÄSTÄ
                                </button>
                            </p>
                        </div>
                        <div className="ml-auto mt-4 space-x-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                type="submit"
                            >
                                Tallenna
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                type="button"
                                onClick={() => setShowForm(false)}
                            >
                                Peruuta
                            </button>
                        </div>
                    </form>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                        contentLabel="Modal"
                    >
                        <div className="bg-main-medium rounded-lg w-1/3">
                            <div className="flex flex-col items-start p-4">
                                <div className="flex items-center w-full">
                                    <div className=" font-medium text-lg">
                                        Vahvista käyttäjätilin poisto
                                    </div>
                                    <svg
                                        onClick={() => setModalIsOpen(false)}
                                        className="ml-auto fill-current w-6 h-6 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                                    </svg>
                                </div>

                                <hr className="w-full mt-2 mb-3 border-gray-300" />

                                <p className=" text-sm mb-2">
                                    Oletko varma, että haluat poistaa tilisi? Mikäli poistat tilisi,
                                    kaikki tietosi ja ilmoituksesi poistetaan pysyvästi.
                                </p>
                                <p className="text-red-500 text-sm mb-2">
                                    TÄMÄ TOIMINTO ON PERUUTTAMATON!
                                </p>

                                <div className="ml-auto mt-4 space-x-4">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={async () => {
                                            const token = localStorage.getItem("token");
                                            if (token) {
                                                await deleteMe(token);
                                                setIsDeleted(true);
                                            }
                                            setModalIsOpen(false);
                                        }}
                                    >
                                        Hyväksy
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => setModalIsOpen(false)}
                                    >
                                        Peruuta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={isDeleted}
                        onRequestClose={() => setIsDeleted(false)}
                        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                        contentLabel="Account Deleted"
                    >
                        <div className="bg-main-medium rounded-lg w-1/3">
                            <div className="flex flex-col items-start p-4">
                                <div className="flex items-center w-full">
                                    <div className="font-medium text-lg">
                                        Käyttähätilisi on poistettu
                                    </div>
                                    <svg
                                        onClick={() => setIsDeleted(false)}
                                        className="ml-auto fill-current w-6 h-6 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                                    </svg>
                                </div>
                                <hr className="w-full mt-2 mb-3 border-gray-300" />
                                <p className="text-sm mb-2">
                                    Käyttäjätilisi ja siihen liittyvät tiedot on poistettu
                                    pysyvästi.
                                </p>
                                <div className="ml-auto mt-4 space-x-4">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => {
                                            navigate("/");
                                            setIsDeleted(false);
                                        }}
                                    >
                                        Palaa kotisivulle
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => {
                                            navigate("/contact");
                                            setIsDeleted(false);
                                        }}
                                    >
                                        Anna palautetta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </Modal>
    );
};

export default UserForm;
