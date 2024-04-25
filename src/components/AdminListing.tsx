import React, { useState, useEffect } from "react";
import useListing from "../hooks/ListingHooks";
import { Carousel } from "react-responsive-carousel";
import Messages from "./Messages";

const AdminListing: React.FC = () => {
    const { listings, fetchListings, deleteListing } = useListing();
    // const userItem: User = state.user;
    // const [listings, setListings] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // const fetchListings = async () => {
        //     const fetchedListings = await getListing();
        //     setListings(fetchedListings);
        // };
        // fetchListings();
    }, []);

    const handleDeleteListing = async (listingId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteListing(listingId, token);
            setListings(listings.filter(listing => listing.id !== listingId));
        }
    };
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {listings.map(listing => (
                    <div
                        key={listing.id}
                        className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded shadow-sm"
                    >
                        <div>
                            <Carousel showThumbs={false} selectedItem={0} key={listing.id}>
                                {listing.images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            className="w-52 h-52 object-cover rounded"
                                            src={image.url}
                                            alt={`Listing ${listing.id}`}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <p className="mb-2">Title: {listing.title}</p>
                            <p className="mb-2">Type: {listing.type}</p>
                            <p className="mb-2">
                                Category:{" "}
                                {typeof listing.category === "number"
                                    ? listing.category
                                    : listing.category.title}
                            </p>
                            <p className="mb-2">Quality: {listing.quality}</p>
                            <p className="mb-2">Price: {listing.price}</p>
                            <p className="mb-2">Time: {listing.time}</p>
                            <p className="mb-2">Description: {listing.description}</p>
                            <p className="mb-2">
                                User:{" "}
                                {typeof listing.user === "number"
                                    ? listing.user
                                    : listing.user.username}
                            </p>
                        </div>
                        {/* <Messages listingId={listing?.id.toString()} token={token} /> */}
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => handleDeleteListing(listing.id)}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Poista
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminListing;
