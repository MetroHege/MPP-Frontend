import { useState } from "react";
import { useForm } from "../hooks/FormHooks";
import { useAuthentication, useUser } from "../hooks/UserHooks";
import { PostUsersRequest } from "mpp-api-types";
import { FiEye, FiEyeOff } from "react-icons/fi";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const { postUser } = useUser();
    const { postLogin } = useAuthentication();
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
    const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
    const { getUsernameAvailable, getEmailAvailable } = useUser();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [_errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const initValues = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        city: ""
    };

    const doRegister = async () => {
        const isValid = validateForm();
        if (!isValid || inputs.password !== confirmPassword) {
            setErrorMessage("Salasanat eivät täsmää");
            return;
        }
        setErrorMessage("");
        try {
            const userResponse = await postUser({
                username: inputs.username,
                password: inputs.password,
                email: inputs.email,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                phone: inputs.phone,
                city: inputs.city
            });
            resetForm();
            setConfirmPassword("");
            const loginResponse = await postLogin({
                username: userResponse.username,
                password: inputs.password
            });
            localStorage.setItem("token", loginResponse.token);
            navigate("/profile");
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const { handleSubmit, handleInputChange, inputs, resetForm } = useForm<PostUsersRequest>(
        doRegister,
        initValues
    );

    const handleUsernameBlur = async () => {
        const result = await getUsernameAvailable(inputs.username);
        setUsernameAvailable(result.available);
    };

    const handleEmailBlur = async () => {
        const result = await getEmailAvailable(inputs.email);
        setEmailAvailable(result.available);
    };

    const [validationErrors, setValidationErrors] = useState({
        username: "",
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateForm = () => {
        const errors = {
            username:
                inputs.username.trim() === ""
                    ? "Käyttäjänimi vaaditaan"
                    : !usernameAvailable
                      ? "Käyttäjänimi on jo käytössä"
                      : "",
            firstName: inputs.firstName.trim() === "" ? "Etunimi vaaditaan" : "",
            lastName: inputs.lastName.trim() === "" ? "Sukunimi vaaditaan" : "",
            city: inputs.city.trim() === "" ? "Kaupunki vaaditaan" : "",
            phone:
                inputs.phone?.trim() === ""
                    ? "Puhelinnumero vaaditaan"
                    : !validator.isMobilePhone(inputs.phone ?? "", "fi-FI", { strictMode: false })
                      ? "Syötä suomalainen puhelinnumero"
                      : "",
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email ?? "")
                ? "Väärä sähköpostimuoto"
                : !emailAvailable
                  ? "Sähköposti on jo käytössä"
                  : "",
            password: !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(inputs.password)
                ? "Vähintään 8 merkkiä, iso ja pieni kirjain sekä numero"
                : "",
            confirmPassword: inputs.password !== confirmPassword ? "Salasanat eivät täsmää" : ""
        };
        setValidationErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <h3 className="mb-8 text-start text-3xl font-bold">Rekisteröidy</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center mr-10">
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="username"
                            >
                                Käyttäjänimi:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="username"
                                type="text"
                                id="username"
                                onChange={handleInputChange}
                                onBlur={handleUsernameBlur}
                                autoComplete="username"
                            />
                        </div>
                        {validationErrors.username ||
                        (!usernameAvailable && "Käyttäjänimi on jo käytössä") ? (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">
                                    {validationErrors.username || "Käyttäjänimi on jo käytössä"}
                                </p>
                            </div>
                        ) : null}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="firstname"
                            >
                                Etunimi:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="firstName"
                                type="text"
                                id="firstname"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.firstName && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.firstName}</p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="lastname"
                            >
                                Sukunimi:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="lastName"
                                type="text"
                                id="lastname"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.lastName && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.lastName}</p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label className="w-full lg:w-1/3 text-left font-bold" htmlFor="city">
                                Kaupunki:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="city"
                                type="text"
                                id="city"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.city && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.city}</p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="phonenumber"
                            >
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="phone"
                                type="tel"
                                id="phonenumber"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.phone && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">{validationErrors.phone}</p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label className="w-full lg:w-1/3 text-left font-bold" htmlFor="email">
                                Sähköposti:
                            </label>
                            <input
                                className="w-3/4 lg:w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleInputChange}
                                onBlur={handleEmailBlur}
                                autoComplete="email"
                            />
                        </div>
                        {validationErrors.email || (!emailAvailable && "Email not available!") ? (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">
                                    {validationErrors.email || "Email not available!"}
                                </p>
                            </div>
                        ) : null}
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="password"
                            >
                                Salasana:
                            </label>
                            <div className="relative w-3/4 lg:w-1/2">
                                <input
                                    className="w-full h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 pr-12 dark:text-slate-950 dark:bg-slate-50"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    onChange={handleInputChange}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    autoComplete="new-password"
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
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="confirmpassword"
                            >
                                Vahvista salasana:
                            </label>
                            <div className="relative w-3/4 lg:w-1/2">
                                <input
                                    className="w-full h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 pr-12 dark:text-slate-950 dark:bg-slate-50"
                                    name="confirmpassword"
                                    type={showPassword ? "text" : "password"}
                                    id="confirmpassword"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
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
                        {validationErrors.confirmPassword && (
                            <div className="flex w-full justify-start lg:justify-center">
                                <p className="text-red-500 mb-1">
                                    {validationErrors.confirmPassword}
                                </p>
                            </div>
                        )}
                        <div className="w-full justify-start mb-4">
                            <p>
                                Luomalla tilin hyväksyt DivariNetin{" "}
                                <a href="/rules" className="text-blue-500">
                                    säännöt
                                </a>
                            </p>
                        </div>
                        <div className="w-full justify-start mt-2">
                            {!emailAvailable && (
                                <div className="flex w-3/5 justify-end pr-4">
                                    <p className="text-rose-500">Email not available!</p>
                                </div>
                            )}
                            <button
                                className="w-2/3 lg:w-1/3 p-2 mb-2 bg-green-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                type="submit"
                            >
                                Rekisteröidy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
