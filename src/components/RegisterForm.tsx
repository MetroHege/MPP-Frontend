import { useEffect, useState } from "react";
import { useForm } from "../hooks/FormHooks";
import { useUser } from "../hooks/UserHooks";

const RegisterForm = () => {
    const { postUser } = useUser();
    const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
    const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const initValues = {
        username: "",
        password: "",
        email: "",
        confirmpassword: "",
        firstname: "",
        lastname: "",
        city: "",
        phonenumber: ""
    };

    const [inputs] = useState(initValues);

    useEffect(() => {
        setPasswordsMatch(inputs.password === inputs.confirmpassword);
    }, [inputs.password, inputs.confirmpassword]);

    const doRegister = async () => {
        try {
            if (usernameAvailable && emailAvailable) {
                await postUser(inputs);
            }
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const { handleSubmit, inputs } = useForm(doRegister, initValues);

    const { getUsernameAvailable, getEmailAvailable } = useUser();

    const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        const result = await getUsernameAvailable(event.currentTarget.value);
        setUsernameAvailable(result.available);
    };

    const handleEmailBlur = async () => {
        // can also be used like this
        const result = await getEmailAvailable(inputs.email);
        setEmailAvailable(result.available);
    };

    console.log(usernameAvailable, emailAvailable);

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
                                onBlur={handleUsernameBlur}
                                autoComplete="username"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="firstname">
                                Etunimi:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="firstname"
                                type="text"
                                id="firstname"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="lastname">
                                Sukunimi:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="lastname"
                                type="text"
                                id="lastname"
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
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="phonenumber">
                                Puhelinnumero:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="phonenumber"
                                type="tel"
                                id="phonenumber"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="email">
                                Sähköposti:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="email"
                                type="email"
                                id="email"
                                onBlur={handleEmailBlur}
                                autoComplete="email"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="password">
                                Salasana:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="confirmpassword">
                                Vahvista Salasana:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="confirmpassword"
                                type="password"
                                id="confirmpassword"
                                autoComplete="new-password"
                            />
                        </div>
                        {!passwordsMatch && <p>Passwords do not match!</p>}
                        <div className="w-full justify-start">
                            <p>
                                Luomalla tilin hyväksyt DivariNet:n{" "}
                                <a href="link_to_application_rules" className="text-blue-500">
                                    säännöt
                                </a>
                            </p>
                        </div>
                        <div className="w-full justify-start mt-2">
                            <button
                                className=" w-1/2 p-2 bg-green-gradient font-bold"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
