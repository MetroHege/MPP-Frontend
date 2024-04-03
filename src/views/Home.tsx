import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaBasketball } from "react-icons/fa6";
import useListing from "../hooks/ListingHooks";
import Listing from "../components/Listing";
import { Listing as Listingtype, User } from "mpp-api-types";

const Home = () => {
    const options1 = ["Jalkapallo", "Koripallo", "Hiihto"];
    const options2 = ["Espoo", "Helsinki", "Hanko"];
    const [searchTerm, setSearchTerm] = useState("");
    const { listings } = useListing();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (!isVisible && window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else if (isVisible && window.scrollY <= window.innerHeight) {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#000"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <FaBasketball
                            style={{ fontSize: "50px", opacity: "0.7", color: "orange", zIndex: 1 }}
                        />
                    </div>
                    <FaArrowUp style={{ fontSize: "40px", color: "#fff", zIndex: 2 }} />
                </button>
            )}
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
                {listings &&
                    listings.map((listing: Listingtype) => (
                        <Listing
                            key={listing.id}
                            item={{ ...listing, id: listing.id }}
                            userItem={listing.user as unknown as User} // Fix: Cast userItem to unknown first, then to User type
                        />
                    ))}
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
