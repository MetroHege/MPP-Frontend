import { PostListingsResponse, User } from "mpp-api-types";
import { Carousel } from "react-responsive-carousel";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserHooks";
import useListing from "../hooks/ListingHooks";
import ListingForm from "../components/ListingForm";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const Single = () => {
    const { state } = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const item: PostListingsResponse = state;
    const userItem: User = state.user;
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const { deleteListing } = useListing();
    const { theme } = useTheme();

    return (
        <div className="flex">
            <div className="w-1/2">
                <button
                    className="px-4 mt-4 mb-4 py-2 bg-red-gradient text-white rounded hover:bg-blue-600"
                    type="button"
                    onClick={() => navigate(-1)}
                >
                    &#8592; Takaisin
                </button>
                <Carousel showThumbs={false}>
                    {item.images.map((image, index) => (
                        <div key={index}>
                            <img
                                className="w-64 h-130 object-cover rounded"
                                src={image.url}
                                alt={`Listing ${item.id}`}
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="p-3 flex mb-4">
                    <p className="text-4xl mt-2 w-1/2 font-bold">{item.title}</p>
                    <p className="text-4xl mt-2 w-1/2 text-right font-bold">
                        {parseInt(item.price)} €
                    </p>{" "}
                </div>
                <div className="flex justify-between items-center">
                    <h2 className=" text-2xl">Lisätiedot</h2>
                    {/* {user?.id === item.user.id && (
                        <div className=" flex space-x-4 items-center">
                            <button
                                className="w-1/2 p-2 bg-yellow-gradient font-bold mb-2 rounded hover:brightness-75"
                                type="submit"
                                onClick={() => setShowForm(true)}
                            >
                                Muokkaa
                            </button>
                            <ListingForm showForm={showForm} setShowForm={setShowForm} />
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={async () => {
                                    if (user?.id === item.user.id) {
                                        await deleteListing(
                                            item.id,
                                            (user as User & { token: string }).token
                                        );
                                        // You might want to refresh the page or redirect the user after the listing is deleted
                                    }
                                }}
                            >
                                Poista
                            </button>
                        </div>
                    )} */}
                </div>
                <hr className="w-full mt-2 mb-3 border-gray-300" />
                <p className="mb-10">{item.description}</p>
                <div>
                    <h1 className="text-4xl mb-4">Kysymykset:</h1>
                </div>
            </div>
            <div className="w-1/2 flex items-start mt-4 ml-4">
                <div
                    className={`rounded-lg shadow-lg p-4 bg-main-light flex display-flex w-3/4 ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
                >
                    <div className="w-1/2 ml-4">
                        <p className="text-3xl">Myyjä:</p>
                        <p className="text-3xl">Ilmoitustyyppi:</p>
                        <p className="text-3xl">Ilmoitus jätetty:</p>
                        <p className="text-3xl">Kaupunki:</p>
                        <p className="text-3xl">Kunto:</p>
                        <p className="text-3xl">Kategoria:</p>
                    </div>
                    <div className="w-1/2 ml-4">
                        <p className="text-3xl">
                            {userItem.username}
                            {userItem.firstName}
                        </p>
                        <p className="text-3xl">{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                        <p className="text-3xl">
                            {new Date(item.time).toLocaleDateString("fi-FI")}
                        </p>
                        <p className="text-3xl">{userItem.city}</p>
                        <p className="text-3xl">{item.quality}</p>
                        <p className="text-3xl">
                            {typeof item.category === "number"
                                ? item.category
                                : item.category.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;
