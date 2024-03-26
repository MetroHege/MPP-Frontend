import { useState } from "react";
import { useForm } from "../hooks/FormHooks";
import { useUser } from "../hooks/UserHooks";
import { PostUsersRequest } from "mpp-api-types";

const RegisterForm = () => {
    const { postUser } = useUser();
    // const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
    // const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

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
        if (inputs.password !== confirmPassword) {
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

    const validatePhoneNumber = () => {
        if (!/^\d*$/.test(inputs.phone ?? "")) {
            setPhoneError("Vain numerot sallittu");
        } else {
            setPhoneError("");
        }
    };

    const validateEmailFormat = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email ?? "")) {
            setEmailError("Kirjoita sähköpostimuodossa");
        } else {
            setEmailError("");
        }
    };

    // const { getUsernameAvailable, getEmailAvailable } = useUser();

    // const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    //     console.log(event.currentTarget.value);
    //     const result = await getUsernameAvailable(event.currentTarget.value);
    //     setUsernameAvailable(result.available);
    // };

    // const handleEmailBlur = async () => {
    //     // can also be used like this
    //     const result = await getEmailAvailable(inputs.email);
    //     setEmailAvailable(result.available);
    // };

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
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="username"
                                type="text"
                                id="username"
                                onChange={handleInputChange}
                                // onBlur={handleUsernameBlur}
                                autoComplete="username"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="firstname">
                                Etunimi:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="firstName"
                                type="text"
                                id="firstname"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="lastname">
                                Sukunimi:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="lastName"
                                type="text"
                                id="lastname"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="city">
                                Kaupunki:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="city"
                                type="text"
                                id="city"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="phonenumber">
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="phone"
                                type="tel"
                                id="phonenumber"
                                onChange={handleInputChange}
                                onBlur={validatePhoneNumber}
                                pattern="\d*"
                            />
                        </div>
                        {phoneError && (
                            <div className="error-message">
                                <p className="text-red-500">{phoneError}</p>
                            </div>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="email">
                                Sähköposti:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleInputChange}
                                onBlur={validateEmailFormat}
                                autoComplete="email"
                            />
                        </div>
                        {emailError && (
                            <div className="error-message">
                                <p className="text-red-500">{emailError}</p>
                            </div>
                        )}
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="password">
                                Salasana:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="password"
                                type="password"
                                id="password"
                                onChange={handleInputChange}
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="confirmpassword">
                                Vahvista Salasana:
                            </label>
                            <div className="w-2/3 flex flex-col">
                                <input
                                    className="w-full h-10 rounded border border-slate-500 p-2 text-slate-950"
                                    name="confirmpassword"
                                    type="password"
                                    id="confirmpassword"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            </div>
                        </div>
                        <div className="w-full justify-start">
                            <p>
                                Luomalla tilin hyväksyt DivariNet:n{" "}
                                <a href="/rules" className="text-blue-500">
                                    säännöt
                                </a>
                            </p>
                        </div>
                        <div className="w-full justify-start mt-2">
                            <button
                                className=" w-1/2 p-2 bg-green-gradient font-bold"
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
