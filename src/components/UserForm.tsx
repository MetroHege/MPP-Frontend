import React, { useState } from "react";
import Modal from "react-modal";

const UserForm = () => {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        city: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Modal
            isOpen={true}
            style={{
                content: {
                    width: "50%",
                    margin: "auto",
                    padding: "20px",
                    backgroundColor: "var(--MainMedium)",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    maxHeight: "fit-content",
                    overflow: "auto"
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }
            }}
        >
            <form className="flex flex-col items-center mr-10">
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="username">
                        Username:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        name="username"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        autoComplete="username"
                        placeholder={user.username}
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="firstName">
                        Etunimi:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder={user.firstName}
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="lastName">
                        Sukunimi:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder={user.lastName}
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="phone">
                        Puhelinnumero:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        placeholder="0401234567"
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="email">
                        Sähköposti:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder={user.email}
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="password">
                        Salasana:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder={user.password}
                    />
                </div>
                <div className="flex w-full pb-2">
                    <label className="w-1/3 text-left font-bold" htmlFor="city">
                        Kaupunki:
                    </label>
                    <input
                        className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        placeholder={user.city}
                    />
                </div>
                <button className="w-1/2 p-2 bg-green-gradient font-bold" type="submit">
                    Tallenna
                </button>
            </form>
        </Modal>
    );
};

export default UserForm;
