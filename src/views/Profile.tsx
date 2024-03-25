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

    // const { handleLogout } = useUserContext();

    return (
        <>
            <div className="flex mt-10 mb-10">
                <div className="w-1/2">
                    <h1 className="text-4xl mb-4">Tietoni:</h1>
                    <p className="text-2xl mb-2">Käyttäjänimi: JakeM</p>
                    <p className="text-2xl mb-2">Etunimi: Jaakko</p>
                    <p className="text-2xl mb-2">Sukunimi: Mäkinen</p>
                    <p className="text-2xl mb-2">Puhelinnumero: 0401234567</p>
                    <p className="text-2xl mb-2">Sähköposti: jaakko.makinen@gmail.com</p>
                    <p className="text-2xl mb-2">Salasana: **********</p>
                    <p className="text-2xl mb-4">Kaupunki: Hanko</p>
                    <div className="flex flex-col">
                        <button
                            className="w-1/2 p-2 bg-yellow-gradient font-bold mb-2 rounded hover:brightness-75"
                            type="submit"
                            onClick={() => setShowForm(true)}
                        >
                            Muokkaa tietoja
                        </button>
                        <UserForm showForm={showForm} setShowForm={setShowForm} />
                        <button
                            className="w-1/2 p-2 bg-red-gradient font-bold rounded hover:brightness-75"
                            type="submit"
                            // onClick={handleLogout}
                        >
                            Kirjaudu ulos
                        </button>
                    </div>
                </div>
                <div className="w-1/2">
                    <p className="text-4xl mb-4">Tili luotu: 13.1.2024 15:50</p>
                    <p className="text-4xl mb-4">Aktiivisia ilmoituksia: 10</p>
                    <p className="text-4xl mb-4">Kyselyjä ilmoituksissa: 12</p>
                    <p className="text-4xl mb-4">Tykkäyksiä ilmoituksissa: 4</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-2xl">Vaihda teemaa:</p>
                        <CustomSwitch />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 my-4 mx-2"></div>
            <div>
                <h1 className="text-4xl mb-4">Ilmoituksesi:</h1>
                <div className="flex flex-col">
                    <div className="flex justify-between p-2 mb-2 rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4">
                        <div className="flex">
                            <img
                                className="rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4"
                                src="https://picsum.photos/300"
                                alt="placeholder"
                            />
                            <div className="flex flex-col ml-4 w-1/2">
                                <p className="text-4xl mt-2">Ilmoitus 1</p>
                                <p className="text mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="text-4xl mt-2">160 €</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mr-2">
                            <p className="text-2xl">12.1.2024</p>
                            <p className="text-2xl">Hanko</p>
                            <p className="text-2xl">Myydään</p>
                        </div>
                    </div>
                    <div className="flex justify-between bg-main-light p-2 mb-2 rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4">
                        <div className="flex">
                            <img
                                className="rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4"
                                src="https://picsum.photos/200/300?grayscale"
                                alt="placeholder"
                            />
                            <div className="flex flex-col ml-4 w-1/2">
                                <p className="text-4xl mt-2">Ilmoitus 2</p>
                                <p className="text mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="text-4xl mt-2">160 €</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mr-2">
                            <p className="text-2xl">12.1.2024</p>
                            <p className="text-2xl">Hyvinkää</p>
                            <p className="text-2xl">Myydään</p>
                        </div>
                    </div>
                    <div className="flex justify-between bg-main-dark p-2 mb-2 rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4">
                        <div className="flex">
                            <img
                                className="rounded-custom1 rounded-t-custom2 rounded-b-custom3 rounded-l-custom4"
                                src="https://baconmockup.com/400/400"
                                alt="placeholder"
                            />
                            <div className="flex flex-col ml-4 w-1/2">
                                <p className="text-4xl mt-2">Ilmoitus 3</p>
                                <p className="text mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="text-4xl mt-2">160 €</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mr-2">
                            <p className="text-2xl">12.1.2024</p>
                            <p className="text-2xl">Enontekiö</p>
                            <p className="text-2xl">Myydään</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
