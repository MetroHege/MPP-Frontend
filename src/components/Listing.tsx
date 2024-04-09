import { useState } from "react";
import { PostListingsResponse, User } from "mpp-api-types";
import { Link } from "react-router-dom";
import useListing from "../hooks/ListingHooks";
import React from "react";
import { useUser } from "../hooks/UserHooks";
import Modal from "react-modal";
import ComboBox from "./ComboBox";
import { Category } from "mpp-api-types";
import { useCategories } from "../hooks/CategoryHooks";
import { useTheme } from "../contexts/ThemeContext";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { UpdateContext } from "../contexts/UpdateContext";

export enum Quality {
    New = 5,
    LikeNew = 4,
    Good = 3,
    Fair = 2,
    Poor = 1
}

const Listing = (props: { item: PostListingsResponse; userItem: User }) => {
    const item = props.item;
    const userItem = props.userItem;

    const { user } = useUser();
    const { putListing, deleteListing } = useListing();
    const { theme } = useTheme();
    const { categories } = useCategories();
    const [category, setCategory] = useState(0);
    const [formData, setFormData] = useState(item);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            await putListing(
                item.id,
                {
                    ...formData,
                    category: formData.category.id,
                    images: undefined,
                    thumbnail: undefined,
                    user: undefined,
                    time: undefined
                },
                token
            );
            setModalIsOpen(false);
        } else {
            console.log("Token not found");
        }
    };

    return (
        <>
            <Link to="/single" state={item}>
                <div
                    className={`mb-4 bg-main-light flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
                >
                    <img className="w-64 h-64 object-cover" src={item.thumbnail?.url} />
                    <div className="flex flex-col p-3 w-3/5">
                        <p className="text-4xl mt-2">{item.title}</p>
                        <p className="mt-2 text-l">
                            {item.description.split(" ").slice(0, 30).join(" ")}
                        </p>
                        <p className="text-4xl mt-2">{parseInt(item.price)} €</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 w-1/5">
                        <p className="text-lg">{new Date(item.time).toLocaleDateString("fi-FI")}</p>{" "}
                        <p className="text-lg">{userItem.city}</p>
                        <p className="text-lg hidden">
                            {typeof item.category === "number"
                                ? item.category
                                : item.category.title}
                        </p>
                        <p className="text-lg">{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                        <p className="text-lg hidden">{item.quality}</p>
                    </div>
                </div>
            </Link>
            {user?.id === item.user.id && (
                <div className="mt-2">
                    <button
                        onClick={() => setModalIsOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                        Muokkaa
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2"
                    >
                        Poista
                    </button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                        contentLabel="Edit Listing"
                    >
                        <div className="bg-main-medium rounded-lg w-1/3">
                            <form className="flex flex-col items-start p-4" onSubmit={handleSubmit}>
                                <div className="flex items-center w-full">
                                    <div className="font-medium text-lg">Muokkaa ilmoitusta</div>
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
                                <div className="flex w-2/3 pb-2">
                                    <label
                                        className="w-1/3 text-left text-xl font-bold"
                                        htmlFor="title"
                                    >
                                        Otsikko:
                                    </label>
                                    <input
                                        className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Title"
                                    />
                                </div>
                                <div className="flex w-2/3 pb-2">
                                    <label
                                        className="w-1/3 text-left text-xl font-bold"
                                        htmlFor="description"
                                    >
                                        Kuvaus:
                                    </label>
                                    <textarea
                                        className="w-1/2 h-50 rounded border border-gray-300 p-2 text-gray-600"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    />
                                </div>
                                <div className="flex w-2/3 pb-2">
                                    <label
                                        className="w-1/3 text-left text-xl font-bold"
                                        htmlFor="price"
                                    >
                                        Hinta:
                                    </label>
                                    <input
                                        className="w-1/2 h-10 rounded border border-gray-300 p-2 text-gray-600"
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="flex w-2/3 pb-2">
                                    <p className="w-1/3 text-left text-xl font-bold">Tyyppi:</p>
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
                                        className="w-1/3 text-left text-xl font-bold"
                                        htmlFor="quality"
                                    >
                                        Kunto:
                                    </label>
                                    <div className="w-full flex flex-col">
                                        <label className="mb-4 mr-2">
                                            <input
                                                type="radio"
                                                name="quality"
                                                value={Quality.New}
                                                onChange={handleChange}
                                                className="mr-1"
                                            />
                                            Uusi
                                        </label>
                                        <label className="mb-4 mr-2">
                                            <input
                                                type="radio"
                                                name="quality"
                                                value={Quality.LikeNew}
                                                onChange={handleChange}
                                                className="mr-1"
                                            />
                                            Erinomainen
                                        </label>
                                        <label className="mb-4 mr-2">
                                            <input
                                                type="radio"
                                                name="quality"
                                                value={Quality.Good}
                                                onChange={handleChange}
                                                className="mr-1"
                                            />
                                            Hyvä
                                        </label>
                                        <label className="mb-4 mr-2">
                                            <input
                                                type="radio"
                                                name="quality"
                                                value={Quality.Fair}
                                                onChange={handleChange}
                                                className="mr-1"
                                            />
                                            Tyydyttävä
                                        </label>
                                        <label className="mb-4 mr-2">
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
                                <div className="flex w-2/3 pb-2">
                                    <label
                                        className="w-1/3 text-left text-xl font-bold"
                                        htmlFor="category"
                                    >
                                        Kategoria:
                                    </label>
                                    <Dropdown
                                        buttonText="Tuotekategoriat"
                                        className="mb-4"
                                        value={category}
                                        onChange={e => setCategory(Number(e.target.value))}
                                        onOptionSelect={(id: number) => setCategory(id)}
                                    />
                                    {category && category !== 0 && (
                                        <div className="flex items-center space-x-2">
                                            {categories.find(cat => cat.id === category) && (
                                                <span>
                                                    {categories.find(cat => cat.id === category)
                                                        ?.title !== "0"
                                                        ? categories.find(
                                                              cat => cat.id === category
                                                          )?.title
                                                        : ""}
                                                </span>
                                            )}
                                            <button onClick={() => setCategory(0)}>X</button>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-auto mt-4 space-x-4">
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Tallenna
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
        </>
    );
};

export default Listing;
