import "react-responsive-carousel/lib/styles/carousel.min.css";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaBasketball } from "react-icons/fa6";
import useListing from "../hooks/ListingHooks";
import Listing from "../components/Listing";
import FilterDropdown from "../components/FilterDropdown";
import { ListingWithId, Listing as Listingtype, User } from "mpp-api-types";
import { useUser } from "../hooks/UserHooks";
import { useCategories } from "../hooks/CategoryHooks";
import { FiChevronDown } from "react-icons/fi";

// This component is the home view of the application.
const Home = () => {
    const { categories, getCategories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState(() => {
        const savedCategory = localStorage.getItem("selectedCategory");
        return savedCategory ? +savedCategory : -1;
    });
    const { listings, searchTerm, setSearchTerm, loadMore, sort, hasMore } = useListing({
        category: selectedCategory !== -1 ? +selectedCategory : undefined
    });
    const { user } = useUser();
    const [sortOrder, setSortOrder] = useState(() => {
        const savedSortOrder = localStorage.getItem("sortOrder");
        return savedSortOrder ? savedSortOrder : "newest";
    });

    useEffect(() => {}, [sortOrder]);

    useEffect(() => {
        const savedCategory = localStorage.getItem("selectedCategory");
        const savedSortOrder = localStorage.getItem("sortOrder");

        if (savedCategory) {
            setSelectedCategory(+savedCategory);
        }

        if (savedSortOrder) {
            setSortOrder(savedSortOrder);
        }
    }, []);

    // This function is used to handle the search change.
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // This object maps sort options to their corresponding strings.
    const sortOptionsMapping: { [key: string]: string } = {
        newest: "Uusin ensin",
        oldest: "Vanhin ensin",
        "low-high": "Hinta nouseva",
        "high-low": "Hinta laskeva"
    };

    // This object maps category ids to their corresponding strings.
    const categoryMapping: { [key: string]: string } = {};

    categories.forEach(category => {
        categoryMapping[category.id] = category.title;
    });

    // This function is used to handle the sort change.
    const handleSortChange = (selectedSortOption: string) => {
        const selectedSortOrder = Object.keys(sortOptionsMapping).find(
            key => sortOptionsMapping[key] === selectedSortOption
        );
        sort((selectedSortOrder as "newest" | "oldest" | "low-high" | "high-low") || "newest");
        localStorage.setItem("sortOrder", selectedSortOrder || "newest");
        setSortOrder(selectedSortOrder || "newest");
    };

    useEffect(() => {
        localStorage.setItem("selectedCategory", selectedCategory.toString());
        localStorage.setItem("sortOrder", sortOrder);
    }, [selectedCategory, sortOrder]);

    useEffect(() => {
        getCategories();
    }, []);

    // This function is used to clear the filters.
    const clearFilters = () => {
        setSelectedCategory(-1);
        setSortOrder("newest");
    };

    // This state is used to determine if the scroll button should be visible.
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

    // This function is used to scroll to the top of the page.
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
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center md:justify-between mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                    {/* This component is used to render a dropdown. */}
                    <Dropdown
                        buttonText="Tuotekategoriat"
                        className="mr-2"
                        value={+selectedCategory}
                        onChange={() => {}}
                        onOptionSelect={setSelectedCategory}
                    />
                    {/* This component is used to render a filter dropdown. */}
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
            {(selectedCategory !== -1 || sortOrder !== "newest") && (
                <div className="flex items-center mb-4 space-x-2">
                    <span>
                        {selectedCategory !== -1 &&
                            `${categories.find(category => category.id === selectedCategory)?.title}`}
                        {selectedCategory !== -1 && sortOrder !== "newest" && " | "}
                        {sortOrder !== "newest" && `${sortOptionsMapping[sortOrder]}`}
                    </span>
                    <button
                        className="bg-transparent border-none cursor-pointer text-2xl text-red-500"
                        onClick={clearFilters}
                    >
                        X
                    </button>
                </div>
            )}
            <div>
                {listings &&
                    listings
                        .filter((listing: Listingtype) =>
                            typeof listing.user === "number"
                                ? listing.user
                                : listing.user.id !== user?.id &&
                                  (selectedCategory === -1 || typeof listing.category === "number"
                                      ? listing.category
                                      : listing.category.id === selectedCategory)
                        )
                        .map((listing: ListingWithId) => (
                            // This component is used to display a single listing.
                            <Listing
                                key={listing.id}
                                item={{ ...listing, id: listing.id }}
                                userItem={listing.user as unknown as User}
                            />
                        ))}
                {listings && listings.length === 0 && (
                    <div>
                        <p className="my-8 text-4xl">Hmm...🤔</p>
                        <p className="my-8 text-4xl">
                            Valitettavasti haullasi ei näyttänyt löytyneen yhtään ilmoitusta,
                            kokeile jotain muuta...
                        </p>
                    </div>
                )}
                {listings && listings.length > 0 && hasMore && (
                    <div className="flex justify-center items-center my-4">
                        <FiChevronDown
                            className="text-6xl cursor-pointer animate-bounce"
                            onClick={loadMore}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
