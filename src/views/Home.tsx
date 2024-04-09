import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaBasketball } from "react-icons/fa6";
import useListing from "../hooks/ListingHooks";
import Listing from "../components/Listing";
import FilterDropdown from "../components/FilterDropdown";
import { Listing as Listingtype, User } from "mpp-api-types";
import { useUser } from "../hooks/UserHooks";

const Home = () => {
    const options1 = ["Jalkapallo", "Koripallo", "Hiihto"];
    const { listings, searchTerm, setSearchTerm } = useListing();
    const { user } = useUser();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const [sortOrder, setSortOrder] = useState("newest");

    const sortOptions = ["newest", "oldest", "low-high", "high-low"];
    const sortOptionsMapping = {
        newest: "Uusimmat",
        oldest: "Vanhimmat",
        "low-high": "Hinta nouseva",
        "high-low": "Hinta laskeva"
    };

    const handleSortChange = (selectedSortOption: string) => {
        const selectedSortOrder = Object.keys(sortOptionsMapping).find(
            key => sortOptionsMapping[key] === selectedSortOption
        );
        setSortOrder(selectedSortOrder || "newest");
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
                    <FilterDropdown
                        options={Object.values(sortOptionsMapping)}
                        buttonText="Lajittele"
                        selectedOption={sortOptionsMapping[sortOrder]}
                        handleOptionChange={handleSortChange}
                    />
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
                    listings
                        .filter((listing: Listingtype) => listing.user.id !== user?.id)
                        .sort((a, b) => {
                            switch (sortOrder) {
                                case "low-high":
                                    return a.price - b.price;
                                case "high-low":
                                    return b.price - a.price;
                                case "oldest":
                                    return a.id - b.id;
                                default:
                                    return b.id - a.id; // Assuming 'id' increases with each new listing
                            }
                        })
                        .map((listing: Listingtype) => (
                            <Listing
                                key={listing.id}
                                item={{ ...listing, id: listing.id }}
                                userItem={listing.user as unknown as User} // Fix: Cast userItem to unknown first, then to User type
                            />
                        ))}
                {listings && listings.length === 0 && searchTerm && (
                    <p className="my-8 text-4xl">
                        Valitettavasti haullasi ei löytynyt yhtään ilmoitusta, kokeile hakea jollain
                        muulla hakusanalla...
                    </p>
                )}
            </div>
        </>
    );
};

export default Home;
