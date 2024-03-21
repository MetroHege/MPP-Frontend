const RegisterForm = () => {
    // const handleInputChange = event => {
    //     // Handle input change
    // };

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     // Handle form submission
    // };

    return (
        <div className="flex w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <h3 className="mb-8 text-start text-3xl font-bold">Rekisteröidy</h3>
                    {/* add onSubmit={} to form */}
                    <form className="flex flex-col items-center mr-10">
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="username">
                                Käyttäjänimi:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="username"
                                type="text"
                                id="username"
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
                                // onBlur={handleEmailBlur}
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
                                // onChange={handleInputChange}
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
                                // onChange={handleInputChange}
                                autoComplete="new-password"
                            />
                        </div>
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
