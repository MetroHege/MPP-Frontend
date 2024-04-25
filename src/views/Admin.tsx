import React, { useEffect, useState } from "react";
import AdminUser from "../components/AdminUser";
import AdminListing from "../components/AdminListing";
import AdminCategory from "../components/AdminCategory";
import AdminMessage from "../components/AdminMessage";

const Admin: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState("users");

    return (
        <div className="side-panel">
            <nav className="mb-4">
                <button onClick={() => setSelectedFilter("users")} className="mr-4">
                    Users
                </button>
                <button onClick={() => setSelectedFilter("listings")}>Listings</button>
                <button onClick={() => setSelectedFilter("categories")} className="ml-4 mr-4">
                    Categories
                </button>
                <button onClick={() => setSelectedFilter("messages")}>Messages</button>
            </nav>
            {selectedFilter === "users" && (
                <>
                    <h2 className="text-xl font-semibold">Users</h2>
                    <AdminUser />
                </>
            )}
            {selectedFilter === "listings" && (
                <>
                    <h2 className="text-xl font-semibold">Listings</h2>
                    <AdminListing />
                </>
            )}
            {selectedFilter === "categories" && (
                <>
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <AdminCategory />
                </>
            )}
            {selectedFilter === "messages" && (
                <>
                    <h2 className="text-xl font-semibold">Messages</h2>
                    <AdminMessage listingId={""} token={""} />
                </>
            )}
        </div>
    );
};

export default Admin;
