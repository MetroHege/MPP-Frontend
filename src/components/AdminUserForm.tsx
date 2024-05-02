import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-modal";
import { useUser } from "../hooks/UserHooks";
import { useNavigate } from "react-router-dom";
import { PutUserRequest, UserWithId } from "mpp-api-types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

interface UserFormProps {
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    user: UserWithId;
}

const UserForm: React.FC<UserFormProps> = ({ showForm, setShowForm, user }) => {
    const [updatedUser, setUser] = useState<PutUserRequest>({});
    const { putUser } = useUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();

    // Function to handle changes in the form
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (user && value !== user[name as keyof typeof user]) {
            setUser({
                ...updatedUser,
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
            <div
                className={`bg-main-medium rounded-lg w-3/4 md:w-2/3 lg:w-1/2 ${theme === "light" ? "text-slate-950 bg-slate-100" : ""}`}
            >
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
                        className="flex flex-col ml-4 mr-4 w-full"
                        onSubmit={async e => {
                            e.preventDefault();
                            const token = localStorage.getItem("token");
                            if (token) {
                                const me = await putUser(user.id, updatedUser, token);
                                setShowForm(false);
                            } else {
                                console.log("Token not found");
                            }
                        }}
                    >
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold mb-2 md:mb-0"
                                htmlFor="username"
                            >
                                Käyttäjänimi:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="username"
                                autoComplete="username"
                                placeholder={user.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold mb-0 md:mb-2"
                                htmlFor="firstName"
                            >
                                Etunimi:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="firstName"
                                placeholder={user.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="lastName"
                            >
                                Sukunimi:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="lastName"
                                placeholder={user.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="lastName"
                            >
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="phone"
                                placeholder={user.phone || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="lastName"
                            >
                                Sähköposti:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="email"
                                name="email"
                                placeholder={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="lastName"
                            >
                                Salasana:
                            </label>
                            <div className="relative w-2/3 md:w-1/2">
                                <input
                                    className="w-full h-10 ml-4 md:ml-0 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleChange}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="h-5 w-5" />
                                    ) : (
                                        <FiEye className="h-5 w-5" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="lastName"
                            >
                                Kaupunki:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="city"
                                placeholder={user.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="ml-auto mt-4 mr-10 space-x-4">
                            <button
                                className="px-4 py-2 bg-green-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                type="submit"
                            >
                                Tallenna
                            </button>
                            <button
                                className="px-4 py-2 bg-red-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                type="button"
                                onClick={() => setShowForm(false)}
                            >
                                Peruuta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default UserForm;
