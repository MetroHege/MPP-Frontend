const LoginForm = () => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle input change
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <h3 className="mb-8 text-start text-3xl font-bold">Kirjaudu sisään</h3>
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
                                autoComplete="username"
                            />
                        </div>
                        <div className="flex w-full pb-2">
                            <label className="w-1/3 text-left font-bold" htmlFor="loginpassword">
                                Salasana:
                            </label>
                            <input
                                className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                                name="password"
                                type="password"
                                id="loginpassword"
                                onChange={handleInputChange}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="w-full justify-start mt-2">
                            <button
                                className=" w-1/2 p-2 bg-green-gradient font-bold"
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
