import { useState } from "react";
import { useForm } from "../hooks/FormHooks";
import { useUser } from "../hooks/UserHooks";
import { PostUsersRequest } from "mpp-api-types";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterForm = () => {
    const { postUser } = useUser();
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
    const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
    const { getUsernameAvailable, getEmailAvailable } = useUser();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [_errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            await postUser({
                username: inputs.username,
                password: inputs.password,
                email: inputs.email,
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                phone: inputs.phone ?? "",
                city: inputs.city
            });
            resetForm();
            setConfirmPassword("");
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const { handleSubmit, handleInputChange, inputs, resetForm } = useForm<PostUsersRequest>(
        doRegister,
        initValues
    );

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
            username: inputs.username.trim() === "" ? "Käyttäjänimi vaaditaan" : "",
            firstName: inputs.firstName.trim() === "" ? "Etunimi vaaditaan" : "",
            lastName: inputs.lastName.trim() === "" ? "Sukunimi vaaditaan" : "",
            city: inputs.city.trim() === "" ? "Kaupunki vaaditaan" : "",
            phone: inputs.phone && !/^\+\d*$/.test(inputs.phone) ? "Vain numerot sallittu" : "",
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email ?? "")
                ? "Väärä sähköpostimuoto"
                : "",
            password: !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(inputs.password)
                ? "Vähintään 8 merkkiä, iso ja pieni kirjain sekä numero"
                : "",
            confirmPassword: inputs.password !== confirmPassword ? "Salasanat eivät täsmää" : ""
        };
        setValidationErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        const result = await getUsernameAvailable(event.currentTarget.value);
        setUsernameAvailable(result.available);
    };

    const handleEmailBlur = async () => {
        const result = await getEmailAvailable(inputs.email);
        setEmailAvailable(result.available);
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <h3 className="mb-8 text-start text-3xl font-bold">Rekisteröidy</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center mr-10">
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="username">
                                Käyttäjänimi:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="username"
                                type="text"
                                id="username"
                                onChange={handleInputChange}
                                onBlur={event => {
                                    handleUsernameBlur(event);
                                }}
                                autoComplete="username"
                            />
                        </div>
                        {validationErrors.username ||
                        (!usernameAvailable && "Username not available!") ? (
                            <p className="text-red-500 mb-1">
                                {validationErrors.username || "Username not available!"}
                            </p>
                        ) : null}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="firstname">
                                Etunimi:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="firstName"
                                type="text"
                                id="firstname"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.firstName && (
                            <p className="text-red-500 mb-1">{validationErrors.firstName}</p>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="lastname">
                                Sukunimi:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="lastName"
                                type="text"
                                id="lastname"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.lastName && (
                            <p className="text-red-500 mb-1">{validationErrors.lastName}</p>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="city">
                                Kaupunki:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="city"
                                type="text"
                                id="city"
                                onChange={handleInputChange}
                            />
                        </div>
                        {validationErrors.city && (
                            <p className="text-red-500 mb-1">{validationErrors.city}</p>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="phonenumber">
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="phone"
                                type="tel"
                                id="phonenumber"
                                onChange={handleInputChange}
                                pattern="\+\d*"
                            />
                        </div>
                        {validationErrors.phone && (
                            <p className="text-red-500 mb-1">{validationErrors.phone}</p>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="email">
                                Sähköposti:
                            </label>
                            <input
                                className="w-2/4 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleInputChange}
                                onBlur={() => {
                                    handleEmailBlur();
                                }}
                                autoComplete="email"
                            />
                        </div>
                        {validationErrors.email || (!emailAvailable && "Email not available!") ? (
                            <p className="text-red-500 mb-1">
                                {validationErrors.email || "Email not available!"}
                            </p>
                        ) : null}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="password">
                                Salasana:
                            </label>
                            <div className="relative w-2/4">
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
                            <p className="text-red-500 mb-1">{validationErrors.password}</p>
                        )}
                        <div className="flex w-full pb-2 mb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="confirmpassword">
                                Vahvista Salasana:
                            </label>
                            <div className="relative w-2/4">
                                <input
                                    className="h-10 rounded w-full border border-slate-500 p-2 bg-slate-50 pr-12 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
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
                            <p className="text-red-500 mb-1">{validationErrors.confirmPassword}</p>
                        )}
                        <div className="w-full justify-start mb-4">
                            <p>
                                Luomalla tilin hyväksyt DivariNet:n{" "}
                                <a href="/rules" className="text-blue-500">
                                    säännöt
                                </a>
                            </p>
                        </div>
                        <div className="w-full justify-start mt-2">
                            <button
                                className="w-1/3 p-2 mb-2 bg-green-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
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
