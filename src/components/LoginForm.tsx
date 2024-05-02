import { useState } from "react";
import { useUserContext } from "../contexts/ContextHooks";
import { useForm } from "../hooks/FormHooks";
import { Credentials } from "../types/LocalTypes";
import { FiEye, FiEyeOff } from "react-icons/fi";

// This component is used to render a login form.
const LoginForm = () => {
    const { handleLogin } = useUserContext();
    const [showPassword, setShowPassword] = useState(false);

    const initValues: Credentials = { username: "", password: "" };

    // This function is used to handle the login process.
    const doLogin = async () => {
        handleLogin(inputs as Credentials);
    };

    // This hook is used to manage the login form.
    const { handleSubmit, handleInputChange, inputs } = useForm(doLogin, initValues);

    return (
        <div className="flex w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <h3 className="mb-8 text-start text-3xl font-bold">Kirjaudu sisään</h3>
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
                                autoComplete="username"
                            />
                        </div>
                        <div className="flex flex-col lg:flex-row w-full pb-2">
                            <label
                                className="w-full lg:w-1/3 text-left font-bold"
                                htmlFor="loginpassword"
                            >
                                Salasana:
                            </label>
                            <div className="relative w-3/4 lg:w-1/2">
                                <input
                                    className="h-10 rounded w-full border border-slate-500 p-2  bg-slate-50 pr-12 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    id="loginpassword"
                                    onChange={handleInputChange}
                                    autoComplete="current-password"
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer text-gray-500 "
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
                        <div className="w-full justify-start mt-2">
                            <button
                                className="w-2/3 lg:w-1/3 p-2 mb-2 bg-green-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                type="submit"
                            >
                                Kirjaudu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
