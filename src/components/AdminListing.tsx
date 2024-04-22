import React, { useState, useEffect } from "react";
import useListing from "../hooks/ListingHooks";

const AdminListing: React.FC = () => {
    const { listings, fetchListings, deleteListing } = useListing();
    // const [listings, setListings] = useState([]);

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
            {listings.map(listing => (
                <li key={listing.id} className="p-4 border border-gray-200 rounded shadow-sm">
                    <p className="mb-2 font-semibold">{listing.title}</p>
                    <p className="mb-2">Type: {listing.type}</p>
                    {/* <p className="mb-2">Category: {listing.category}</p> */}
                    <p className="mb-2">Quality: {listing.quality}</p>
                    <p className="mb-2">Price: {listing.price}</p>
                    <p className="mb-2">Time: {listing.time}</p>
                    <p className="mb-2">Description: {listing.description}</p>
                    {/* <p className="mb-2">User: {listing.user}</p> */}
                    <img
                        src={listing.thumbnail}
                        alt="Thumbnail"
                        className="h-36 w-36 object-cover"
                    />
                    <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Delete Listing
                    </button>
                </li>
            ))}
        </>
    );
};

export default AdminListing;
