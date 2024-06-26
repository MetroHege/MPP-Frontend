import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import { useMe } from "../hooks/UserHooks";
import { useNavigate } from "react-router-dom";
import { Error, PutMeRequest, PutUserRequest, UserWithId } from "mpp-api-types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import validator from "validator";
import { useForm } from "../hooks/FormHooks";

interface UserFormProps {
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    setParentUser: Dispatch<SetStateAction<UserWithId | null>>;
}

// This component is used to render a user form.
const UserForm: React.FC<UserFormProps> = ({ showForm, setShowForm, setParentUser }) => {
    const [user, setUser] = useState<PutUserRequest>({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { deleteMe, putMe } = useMe();
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();
    const [originalUser, setOriginalUser] = useState(user);
    const [showPassword, setShowPassword] = useState(false);
    const { theme } = useTheme();
    const [_errorMessage, setErrorMessage] = useState("");

    const initValues = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        city: ""
    };

    useEffect(() => {
        setOriginalUser(user);
    }, []);

    // This function is used to register a user.
    const doUserUpdate = async () => {
        const isValid = validateForm();
        if (!isValid) return;
        setErrorMessage("");
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const me = await putMe(
                    {
                        username: inputs.username === "" ? undefined : inputs.username,
                        password: inputs.password === "" ? undefined : inputs.password,
                        email: inputs.email === "" ? undefined : inputs.email,
                        firstName: inputs.firstName === "" ? undefined : inputs.firstName,
                        lastName: inputs.lastName === "" ? undefined : inputs.lastName,
                        phone: inputs.phone === "" ? undefined : inputs.phone,
                        city: inputs.city === "" ? undefined : inputs.city
                    },
                    token
                );
                setParentUser(me);
                setShowForm(false);
            } else {
                console.log("Token not found");
            }
            resetForm();
            navigate("/profile");
        } catch (error: any) {
            const errors = {
                username: "",
                firstName: "",
                lastName: "",
                city: "",
                phone: "",
                email: "",
                password: ""
            };

            switch (error.message) {
                case "Username already in use":
                    errors.username = "Käyttäjänimi on jo käytössä";
                    break;
                case "Email already in use":
                    errors.email = "Sähköposti on jo käytössä";
                    break;
                default:
                    setErrorMessage(error.message);
                    break;
            }
            setValidationErrors(errors);

            console.log((error as Error).message);
        }
    };

    // This hook is used to manage the registration form.
    const { handleSubmit, handleInputChange, inputs, resetForm } = useForm<PutMeRequest>(
        doUserUpdate,
        initValues
    );

    // This function is used to handle the change event.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event);
        const { name, value } = event.target;
        if (originalUser && value !== originalUser[name as keyof typeof originalUser]) {
            setUser({
                ...user,
                [name]: value
            });
        }
    };

    // This function is used to validate the registration form.
    const [validationErrors, setValidationErrors] = useState({
        username: "",
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
        email: "",
        password: ""
    });

    // This function is used to validate the registration form.
    const validateForm = () => {
        const errors = {
            username:
                inputs.username?.trim() !== "" && inputs.username?.trim() === ""
                    ? "Käyttäjänimi vaaditaan"
                    : (inputs.username !== "" ? (inputs.username as string) : "xyz").length < 3
                      ? "Käyttäjänimen tulee olla vähintään 3 merkkiä"
                      : "",
            firstName:
                inputs.firstName?.trim() !== "" && inputs.firstName?.trim() === ""
                    ? "Etunimi vaaditaan"
                    : "",
            lastName:
                inputs.lastName?.trim() !== "" && inputs.lastName?.trim() === ""
                    ? "Sukunimi vaaditaan"
                    : "",
            city:
                inputs.city?.trim() !== "" && inputs.city?.trim() === ""
                    ? "Kaupunki vaaditaan"
                    : "",
            phone:
                (inputs.phone?.trim() !== "" &&
                    (inputs.phone?.trim() === ""
                        ? "Puhelinnumero vaaditaan"
                        : !validator.isMobilePhone(inputs.phone ?? "", "fi-FI", {
                                strictMode: false
                            })
                          ? "Syötä suomalainen puhelinnumero"
                          : "")) ||
                "",
            email:
                (inputs.email !== "" &&
                    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email ?? "")
                        ? "Väärä sähköpostimuoto"
                        : "")) ||
                "",
            password:
                inputs.password !== "" &&
                !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(inputs.password as string)
                    ? "Vähintään 8 merkkiä, iso ja pieni kirjain sekä numero"
                    : ""
        };
        setValidationErrors(errors);
        return !Object.values(errors).some(error => error !== "");
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

                    <form className="flex flex-col ml-4 mr-4 w-full" onSubmit={handleSubmit}>
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
                                value={user.username}
                                onChange={handleChange}
                                autoComplete="username"
                                placeholder={user.username}
                            />
                        </div>
                        {validationErrors.username ? (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">
                                    {validationErrors.username || "Käyttäjänimi on jo käytössä"}
                                </p>
                            </div>
                        ) : null}
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
                                value={user.firstName}
                                onChange={handleChange}
                                placeholder={user.firstName}
                            />
                        </div>
                        {validationErrors.firstName && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.firstName}</p>
                            </div>
                        )}
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
                                value={user.lastName}
                                onChange={handleChange}
                                placeholder={user.lastName}
                            />
                        </div>
                        {validationErrors.lastName && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.lastName}</p>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="phone"
                            >
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="phone"
                                value={user.phone || ""}
                                onChange={handleChange}
                                placeholder={user.phone || ""}
                            />
                        </div>
                        {validationErrors.phone && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.phone}</p>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="email"
                            >
                                Sähköposti:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder={user.email}
                            />
                        </div>
                        {validationErrors.email ? (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">
                                    {validationErrors.email || "Email not available!"}
                                </p>
                            </div>
                        ) : null}
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="password"
                            >
                                Salasana:
                            </label>
                            <div className="relative w-2/3 md:w-1/2">
                                <input
                                    className="w-full h-10 ml-4 md:ml-0 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder={user.password}
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
                        {validationErrors.password && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.password}</p>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row w-full pb-2">
                            <label
                                className="w-full md:w-1/3 pl-4 text-left text-xl font-bold md:mb-0"
                                htmlFor="city"
                            >
                                Kaupunki:
                            </label>
                            <input
                                className="w-2/3 ml-4 md:ml-0 md:w-1/2 h-10 rounded border border-gray-300 p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                type="text"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                                placeholder={user.city}
                            />
                        </div>
                        {validationErrors.city && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.city}</p>
                            </div>
                        )}
                        <div className="pl-4">
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
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                        contentLabel="Modal"
                    >
                        <div
                            className={`bg-main-medium rounded-lg w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 ${theme === "light" ? "text-slate-950 bg-slate-100" : ""}`}
                        >
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
                                        className="px-4 py-2 bg-green-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                        onClick={async () => {
                                            const token = localStorage.getItem("token");
                                            if (token) {
                                                await deleteMe(token);
                                                setIsDeleted(true);
                                            }
                                            setModalIsOpen(false);
                                        }}
                                    >
                                        Kyllä
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
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
                        <div
                            className={`rounded-lg w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 ${theme === "light" ? "text-slate-950 bg-slate-100" : "text-white bg-main-medium"}`}
                        >
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
                                <div className="flex flex-col ml-auto mt-4 space-x-4">
                                    <button
                                        className="px-4 mb-2 py-2 bg-green-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                        onClick={() => {
                                            navigate("/");
                                            setIsDeleted(false);
                                        }}
                                    >
                                        Palaa kotisivulle
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
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
