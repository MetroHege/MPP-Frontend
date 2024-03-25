import { useState } from "react";
import { FaFutbol } from "react-icons/fa";
import UserForm from "../components/UserForm";

const CustomSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label
            onClick={toggleCheck}
            className="toggle-label block overflow-hidden h-6 w-12 rounded-full bg-gray-300 cursor-pointer"
        >
            <span
                className={`toggle ${isChecked ? "translate-x-6" : "translate-x-0"} inline-block w-6 h-6 transform bg-white shadow-md rounded-full flex items-center justify-center`}
            >
                <FaFutbol color="black" size={20} />
            </span>
        </label>
    );
};

const Profile = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex mt-10">
            <div className="w-1/2">
                <h1 className="text-4xl mb-2">Tietoni:</h1>
                <p className="text-xl mb-1">Käyttäjänimi: JakeM</p>
                <p className="text-xl mb-1">Etunimi: Jaakko</p>
                <p className="text-xl mb-1">Sukunimi: Mäkinen</p>
                <p className="text-xl mb-1">Puhelinnumero: 0401234567</p>
                <p className="text-xl mb-1">Sähköposti: jaakko.makinen@gmail.com</p>
                <p className="text-xl mb-1">Salasana: **********</p>
                <p className="text-xl mb-1">Kaupunki: Hanko</p>
                <div className="flex flex-col">
                    <button
                        className="w-1/2 p-2 bg-yellow-gradient font-bold mb-2"
                        type="submit"
                        onClick={() => setShowForm(true)}
                    >
                        Muokkaa tietoja
                    </button>
                    {showForm && <UserForm />}
                    <button className="w-1/2 p-2 bg-red-gradient font-bold" type="submit">
                        Kirjaudu ulos
                    </button>
                </div>
            </div>
            <div className="w-1/2">
                <p className="text-4xl mb-2">Tili luotu: 13.1.2024 15:50</p>
                <p className="text-4xl mb-2">Aktiivisia ilmoituksia: 10</p>
                <div className="flex items-center">
                    <p className="mr-2 text-xl">Vaihda teemaa:</p>
                    <CustomSwitch />
                </div>
            </div>
        </div>
    );
};

export default Profile;
