import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-modal";

interface UserFormProps {
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

const UserForm: React.FC<UserFormProps> = ({ showForm, setShowForm }) => {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        city: ""
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Modal
            isOpen={showForm}
            onRequestClose={() => setShowForm(false)}
            shouldCloseOnOverlayClick={true}
            style={{
                content: {
                    width: "50%",
                    height: "fit-content",
                    margin: "auto",
                    padding: "20px",
                    backgroundColor: "var(--MainMedium)",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start"
                },
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }
            }}
        >
            <h1 className="text-4xl mb-4">Muokkaa tietojasi:</h1>
            <form className="flex flex-col items-center mb-0 ml-4 mr-4">
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="username">
                        Username:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        name="username"
                        type="text"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        autoComplete="username"
                        placeholder={user.username}
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="firstName">
                        Etunimi:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder={user.firstName}
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="lastName">
                        Sukunimi:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder={user.lastName}
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="phone">
                        Puhelinnumero:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        placeholder="0401234567"
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="email">
                        Sähköposti:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder={user.email}
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="password">
                        Salasana:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder={user.password}
                    />
                </div>
                <div className="flex w-2/3 pb-2">
                    <label className="w-1/3 text-left text-xl font-bold" htmlFor="city">
                        Kaupunki:
                    </label>
                    <input
                        className="w-1/2 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        placeholder={user.city}
                    />
                </div>
                <div className=" text-left">
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
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        content: {
                            width: "40%",
                            height: "fit-content",
                            margin: "auto",
                            padding: "15px",
                            backgroundColor: "var(--MainMedium)",
                            borderRadius: "10px",
                            border: "1px solid #ccc",
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start"
                        },
                        overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }}
                >
                    <h2 className="text-xl mb-2">Vahvista käyttäjätilin poisto</h2>
                    <p className="text-sm mb-2">
                        Oletko varma, että haluat poistaa tilisi? Mikäli poistat tilisi, kaikki
                        tietosi ja ilmoituksesi poistetaan pysyvästi.
                    </p>
                    <p className="text-sm mb-2">TÄMÄ TOIMINTO ON PERUUTTAMATON!</p>
                    <div className="w-2/3 mx-auto mt-4">
                        <div className="flex justify-between space-x-4">
                            <button
                                className="w-full p-2 bg-green-gradient font-bold rounded hover:brightness-75"
                                onClick={() => {
                                    // call your function to delete the account here
                                    setModalIsOpen(false);
                                }}
                            >
                                Hyväksy
                            </button>
                            <button
                                className="w-full p-2 bg-red-gradient font-bold rounded hover:brightness-75"
                                onClick={() => setModalIsOpen(false)}
                            >
                                Peruuta
                            </button>
                        </div>
                    </div>
                </Modal>
                <div className="w-2/3 mx-auto mt-4">
                    <div className="flex justify-between space-x-4">
                        <button
                            className="w-full p-2 bg-green-gradient font-bold rounded hover:brightness-75"
                            type="submit"
                        >
                            Tallenna
                        </button>
                        <button
                            className="w-full p-2 bg-red-gradient font-bold rounded hover:brightness-75"
                            type="button"
                            onClick={() => setShowForm(false)}
                        >
                            Peruuta
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default UserForm;
