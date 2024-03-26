import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-modal";

interface UserFormProps {
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

const UserForm: React.FC<UserFormProps> = ({ showForm, setShowForm }) => {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        city: ""
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
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

                    <form className="flex flex-col items-center mb-0 ml-4 mr-4">
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
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleChange}
                                placeholder="0401234567"
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
                                        onClick={() => {
                                            // call your function to delete the account here
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
                </div>
            </div>
        </Modal>
    );
};

export default UserForm;
