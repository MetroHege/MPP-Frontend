import { PostListingsResponse, User } from "mpp-api-types";
import { Link } from "react-router-dom";
import useListing from "../hooks/ListingHooks";
import React from "react";
import { useUser } from "../hooks/UserHooks";

const Listing = (props: { item: PostListingsResponse; userItem: User }) => {
    const item = props.item;
    const userItem = props.userItem;

    const { user } = useUser();

    return (
        <>
            <Link to="/single" state={item}>
                <div className="mb-4 flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
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
                        <p className="text-lg">
                            {typeof item.category === "number"
                                ? item.category
                                : item.category.title}
                        </p>
                        <p className="text-lg">{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                    </div>
                    {user?.id === item.user.id && (
                        <div className="mt-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Modify
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </Link>
        </>
    );
};

export default Listing;
