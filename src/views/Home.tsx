import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const Home = () => {
    const options1 = ["Jalkapallo", "Koripallo", "Hiihto"];
    const options2 = ["Espoo", "Helsinki", "Hanko"];
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div>
                <p className="text-2xl mb-4">Suodata ilmoituksia:</p>
            </div>
            <div className="flex flex-row justify-between items-center mb-10">
                <div>
                    <Dropdown options={options1} buttonText="Tuotekategoriat" className="mr-2" />
                    <Dropdown options={options2} buttonText="Kaupunki" className="ml-2" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Etsi..."
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-gray-900"
                />
            </div>
            <div>
                <div className="flex flex-col">
                    <div className="mb-4 flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img
                            className="w-1/5 h-full object-cover"
                            src="https://picsum.photos/300"
                            alt="placeholder"
                        />
                        <div className="flex flex-col p-3 w-3/5">
                            <p className="text-4xl mt-2">Ilmoitus 1</p>
                            <p className="mt-2 text-l">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-4xl mt-2">160 €</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 w-1/5">
                            <p className="text-lg">12.1.2024</p>
                            <p className="text-lg">Hanko</p>
                            <p className="text-lg">Myydään</p>
                        </div>
                    </div>
                    <div className="mb-4 flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img
                            className="w-1/5 h-full object-cover"
                            src="https://picsum.photos/300/200"
                            alt="placeholder"
                        />
                        <div className="flex flex-col p-3 w-3/5">
                            <p className="text-4xl mt-2">Ilmoitus 2</p>
                            <p className="mt-2 text-l">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-4xl mt-2">160 €</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 w-1/5">
                            <p className="text-lg">12.1.2024</p>
                            <p className="text-lg">Hanko</p>
                            <p className="text-lg">Myydään</p>
                        </div>
                    </div>
                    <div className="mb-4 flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <img
                            className="w-1/5 h-full object-cover"
                            src="https://picsum.photos/200/300"
                            alt="placeholder"
                        />
                        <div className="flex flex-col p-3 w-3/5">
                            <p className="text-4xl mt-2">Ilmoitus 3</p>
                            <p className="mt-2 text-l">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-4xl mt-2">160 €</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 w-1/5">
                            <p className="text-lg">12.1.2024</p>
                            <p className="text-lg">Hanko</p>
                            <p className="text-lg">Myydään</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
