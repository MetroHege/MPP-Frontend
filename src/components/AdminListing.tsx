import React from "react";
import useListing from "../hooks/ListingHooks";
import { Carousel } from "react-responsive-carousel";
import AdminMessage from "./AdminMessage";

const AdminListing: React.FC = () => {
    const { listings, deleteListing } = useListing();
    const token = localStorage.getItem("token");

    // Function to handle deleting a listing
    const handleDeleteListing = async (listingId: number) => {
        const token = localStorage.getItem("token");
        if (token) await deleteListing(listingId, token);
    };
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {listings.map(listing => (
                    <div
                        key={listing.id}
                        className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded shadow-sm"
                    >
                        <div className="col-span-1">
                            {/* Carousel component for displaying listing images */}
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
                            <div className="mt-4">
                                {/* AdminMessage component for sending messages to listing items */}
                                <AdminMessage
                                    listingId={listing?.id.toString()}
                                    token={token as string}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <p className="mb-2">Otsikko: {listing.title}</p>
                            <p className="mb-2">Tyyppi: {listing.type}</p>
                            <p className="mb-2">
                                Kategoria:{" "}
                                {typeof listing.category === "number"
                                    ? listing.category
                                    : listing.category.title}
                            </p>
                            <p className="mb-2">Laatu: {listing.quality}</p>
                            <p className="mb-2">Hinta: {listing.price}</p>
                            <p className="mb-2">Aika: {listing.time.toLocaleDateString("fi-FI")}</p>
                            <p className="mb-2">Kuvaus: {listing.description}</p>
                            <p className="mb-2">
                                Käyttäjä:{" "}
                                {typeof listing.user === "number"
                                    ? listing.user
                                    : listing.user.username}
                            </p>
                            <div className="mt-4">
                                {/* Button to delete a listing */}
                                <button
                                    onClick={() => handleDeleteListing(listing.id)}
                                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Poista ilmoitus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminListing;
