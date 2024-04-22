import { ListingWithId, PostListingsResponse, User } from "mpp-api-types";
import { Carousel } from "react-responsive-carousel";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserHooks";
import useListing from "../hooks/ListingHooks";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import qualityToText from "../functions/qualityToText";
import Modal from "react-modal";
import { useCategories } from "../hooks/CategoryHooks";
import Dropdown from "../components/Dropdown";
import Messages from "../components/Messages";

enum Quality {
    New = 5,
    LikeNew = 4,
    Good = 3,
    Fair = 2,
    Poor = 1
}

const Single: React.FC = () => {
    const { state } = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const item: PostListingsResponse = state;
    const userItem: User = state.user;
    const { user } = useUser();
    const { theme } = useTheme();
    const { fetchListingsByCategory } = useListing();
    const [randomListings, setRandomListings] = useState<ListingWithId[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
    const { categories } = useCategories();
    const [category, setCategory] = useState(0);
    const [formData, setFormData] = useState(item);
    const { putListing, deleteListing } = useListing();

    const token = localStorage.getItem("token") || "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageClick = () => {
        setIsCarouselModalOpen(true);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await deleteListing(item.id, token);
                console.log(token);
            } catch (error) {
                console.error("Failed to delete listing:", error);
            }
        } else {
            console.log("Token not found");
        }
        navigate("/profile");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            const listing = {
                ...formData,
                category: (category !== 0 && category) || undefined,
                images: undefined,
                thumbnail: undefined,
                user: undefined,
                time: undefined
            };

            await putListing(
                item.id,
                {
                    ...listing
                },
                token
            );

            setModalIsOpen(false);
        } else {
            console.log("Token not found");
        }
    };

    useEffect(() => {
        const fetchAndSetRandomListings = async () => {
            let categoryListings = await fetchListingsByCategory(
                typeof item.category === "number" ? item.category : item.category.id
            );
            if (categoryListings && categoryListings.length > 0) {
                categoryListings = categoryListings.filter(
                    listing =>
                        listing.id !== item.id &&
                        (typeof listing.user === "number" ? listing.user : listing.user.id) !==
                            user?.id
                );
                const shuffled = [...categoryListings].sort(() => 0.5 - Math.random());
                setRandomListings(shuffled.slice(0, 3));
            }
        };

        fetchAndSetRandomListings();
    }, [typeof item.category === "number" ? item.category : item.category.id, item.id, user?.id]);

    return (
        <div className="flex">
            <div className="w-1/2">
                <button
                    className="px-4 mt-4 mb-3 py-2 bg-red-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    &#8592; Takaisin
                </button>
                {typeof item.images !== "string" ? (
                    <div className={`relative ${isCarouselModalOpen ? "pointer-events-none" : ""}`}>
                        <Carousel
                            showThumbs={false}
                            selectedItem={0}
                            key={item.id}
                            onClickItem={handleImageClick}
                        >
                            {item.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        className="w-64 h-150 object-cover rounded"
                                        src={image.url}
                                        alt={`Listing ${item.id}`}
                                    />
                                </div>
                            ))}
                        </Carousel>
                        <Modal
                            isOpen={isCarouselModalOpen}
                            onRequestClose={() => setIsCarouselModalOpen(false)}
                            className="bg-transparent z-50"
                            style={{
                                overlay: {
                                    backgroundColor: "rgba(0, 0, 0, 0.75)"
                                }
                            }}
                        >
                            <Carousel showThumbs={false}>
                                {item.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-center items-center h-full"
                                    >
                                        <img
                                            src={image.url}
                                            alt={`Listing ${item.id}`}
                                            className="max-w-2xl max-h-2xl object-contain"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                            <button
                                onClick={() => setIsCarouselModalOpen(false)}
                                className="absolute top-5 right-5 text-white text-4xl bg-transparent border-none"
                            >
                                X
                            </button>
                        </Modal>
                    </div>
                ) : (
                    <></>
                )}
                <div className="p-3 flex mb-4">
                    <p className="text-4xl mt-2 w-1/2 font-bold">{item.title}</p>
                    <p className="text-4xl mt-2 w-1/2 text-right font-bold">{+item.price} €</p>{" "}
                </div>
                <div className="flex justify-between items-center">
                    <h2 className=" text-2xl">Lisätiedot</h2>
                    {user?.id === (typeof item.user === "number" ? item.user : item.user.id) && (
                        <div className="mt-2">
                            <button
                                onClick={() => setModalIsOpen(true)}
                                className="px-4 py-2 bg-yellow-gradient rounded font-bold text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                            >
                                Muokkaa
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 ml-2 bg-red-gradient rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md font-bold"
                            >
                                Poista
                            </button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={() => setModalIsOpen(false)}
                                className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                                contentLabel="Edit Listing"
                            >
                                <div
                                    className={`bg-main-medium rounded-lg w-1/3 ${theme === "light" ? "text-slate-950 bg-slate-100" : "text-white bg-main-medium"}`}
                                >
                                    <form
                                        className="flex flex-col items-start p-4"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="flex items-center w-full">
                                            <div className="font-medium text-lg">
                                                Muokkaa ilmoitusta
                                            </div>
                                            <svg
                                                onClick={() => setModalIsOpen(false)}
                                                className="ml-auto fill-current w-6 h-6 cursor-pointer"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 18 18"
                                            >
                                                <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                                            </svg>
                                        </div>
                                        <hr className="w-full mt-2 mb-3 border-gray-300" />
                                        <div className="flex w-full pb-2">
                                            <label
                                                className="w-1/3 pl-4 text-left text-xl font-bold"
                                                htmlFor="title"
                                            >
                                                Otsikko:
                                            </label>
                                            <input
                                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                placeholder="Title"
                                            />
                                        </div>
                                        <div className="flex w-full pb-2">
                                            <label
                                                className="w-1/3 pl-4 text-left text-xl font-bold"
                                                htmlFor="description"
                                            >
                                                Kuvaus:
                                            </label>
                                            <textarea
                                                className="w-1/2 h-30 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Description"
                                            />
                                        </div>
                                        <div className="flex w-full pb-2">
                                            <label
                                                className="w-1/3 pl-4 text-left text-xl font-bold"
                                                htmlFor="price"
                                            >
                                                Hinta:
                                            </label>
                                            <input
                                                className="w-1/2 h-10 rounded border border-gray-300 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="Price"
                                            />
                                        </div>
                                        <div className="flex w-full pb-2">
                                            <p className="w-1/3 pl-4 text-left text-xl font-bold">
                                                Tyyppi:
                                            </p>
                                            <div className="w-1/2 flex items-center flex-row">
                                                <input
                                                    className="mr-2"
                                                    type="radio"
                                                    name="type"
                                                    value="buy"
                                                    checked={formData.type === "buy"}
                                                    onChange={handleChange}
                                                />
                                                <p className="text-lg">Ostetaan</p>
                                                <input
                                                    className="ml-4 mr-2"
                                                    type="radio"
                                                    name="type"
                                                    value="sell"
                                                    checked={formData.type === "sell"}
                                                    onChange={handleChange}
                                                />
                                                <p className="text-lg">Myydään</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full pb-2">
                                            <label
                                                className="w-1/3 pl-4 text-left text-xl font-bold"
                                                htmlFor="quality"
                                            >
                                                Kunto:
                                            </label>
                                            <div className="grid grid-cols-2 gap-4 pb-2">
                                                <label className="col-span-1">
                                                    <input
                                                        type="radio"
                                                        name="quality"
                                                        value={Quality.New}
                                                        onChange={handleChange}
                                                        className="mr-1"
                                                    />
                                                    Uusi
                                                </label>
                                                <label className="col-span-1">
                                                    <input
                                                        type="radio"
                                                        name="quality"
                                                        value={Quality.LikeNew}
                                                        onChange={handleChange}
                                                        className="mr-1"
                                                    />
                                                    Erinomainen
                                                </label>
                                                <label className="col-span-1">
                                                    <input
                                                        type="radio"
                                                        name="quality"
                                                        value={Quality.Good}
                                                        onChange={handleChange}
                                                        className="mr-1"
                                                    />
                                                    Hyvä
                                                </label>
                                                <label className="col-span-1">
                                                    <input
                                                        type="radio"
                                                        name="quality"
                                                        value={Quality.Fair}
                                                        onChange={handleChange}
                                                        className="mr-1"
                                                    />
                                                    Tyydyttävä
                                                </label>
                                                <label className="col-span-2">
                                                    <input
                                                        type="radio"
                                                        name="quality"
                                                        value={Quality.Poor}
                                                        onChange={handleChange}
                                                        className="mr-1"
                                                    />
                                                    Huono
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex w-full pb-2">
                                            <label
                                                className="w-1/3 pl-4 text-left text-xl font-bold"
                                                htmlFor="category"
                                            >
                                                Kategoria:
                                            </label>
                                            <Dropdown
                                                buttonText="Tuotekategoriat"
                                                className="mb-4"
                                                value={category}
                                                onChange={e => {
                                                    setCategory(Number(e.target.value));
                                                }}
                                                onOptionSelect={(id: number) => {
                                                    console.log("Selected category ID:", id);
                                                    setCategory(id);
                                                }}
                                            />
                                            {category !== 0 && (
                                                <div className="flex items-center space-x-2">
                                                    {categories.find(cat => cat.id === category)
                                                        ?.title && (
                                                        <span>
                                                            {
                                                                categories.find(
                                                                    cat => cat.id === category
                                                                )?.title
                                                            }
                                                        </span>
                                                    )}
                                                    <button
                                                        className="bg-transparent border-none cursor-pointer text-2xl text-red-500"
                                                        onClick={() => setCategory(0)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-auto mt-4 pr-4 space-x-4">
                                            <button
                                                className="px-4 py-2 bg-green-gradient rounded font-bold text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                                type="submit"
                                            >
                                                Tallenna
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-gradient rounded font-bold text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                                                type="button"
                                                onClick={() => setModalIsOpen(false)}
                                            >
                                                Peruuta
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    )}
                </div>
                <hr className="w-full mt-2 mb-3 border-gray-300" />
                <p className="mb-10">{item.description}</p>
                <div>
                    <h1 className="text-4xl mb-4">Kysymykset:</h1>
                    <Messages listingId={item?.id.toString()} token={token} />
                </div>
            </div>
            <div className="w-1/2 flex flex-col items-start mt-16 ml-4">
                <div
                    className={`rounded-lg shadow-lg mb-4 p-4 bg-main-light flex display-flex w-3/4 ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
                >
                    <div className="w-1/2 xl-0 md:ml-4 text-2xl">
                        <p>Myyjä:</p>
                        <p>Tyyppi:</p>
                        <p>Ilmoitettu:</p>
                        <p>Kaupunki:</p>
                        <p>Kunto:</p>
                        <p>Kategoria:</p>
                    </div>
                    <div className="w-1/2 ml-4 text-2xl">
                        <p>{userItem.username}</p>
                        <p>{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                        <p>{new Date(item.time).toLocaleDateString("fi-FI")}</p>
                        <p>{userItem.city}</p>
                        <p>{qualityToText(item.quality)}</p>
                        <p>
                            {typeof item.category === "number"
                                ? item.category
                                : item.category.title}
                        </p>
                    </div>
                </div>
                {randomListings.length > 0 && (
                    <h1 className="text-2xl mb-4 hidden md:block">
                        Muita ilmoituksia samasta kategoriasta:
                    </h1>
                )}
                <div className="flex w-3/4 flex-col space-y-4 hidden md:block">
                    {randomListings.map((listing, index) => (
                        <Link to="/single" state={listing} key={index}>
                            <div
                                className={`bg-main-light w-full rounded p-2 flex items-center ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
                            >
                                <img
                                    src={listing.images[0].url}
                                    alt={`Listing ${listing.id}`}
                                    className="w-36 h-36 object-cover"
                                />
                                <div className="ml-4 flex flex-row">
                                    <div className="w-1/2">
                                        <h2 className="text-xl my-2">{listing.title}</h2>
                                        <p className="text-xl my-2">{+listing.price} €</p>
                                    </div>
                                    <div className="ml-4 w-1/2">
                                        <p className="text-xl my-2">
                                            {new Date(listing.time).toLocaleDateString("fi-FI")}
                                        </p>
                                        <p className="text-xl my-2">
                                            {listing.type === "buy" ? "Ostetaan" : "Myydään"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Single;
