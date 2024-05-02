import React, { useState } from "react";
import AdminUser from "../components/AdminUser";
import AdminListing from "../components/AdminListing";
import AdminCategory from "../components/AdminCategory";

const Admin: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState("users");

    return (
        <div className="side-panel">
            <nav className="mb-4">
                <button onClick={() => setSelectedFilter("users")} className="mr-4">
                    Käyttäjät
                </button>
                <button onClick={() => setSelectedFilter("listings")}>Ilmoitukset</button>
                <button onClick={() => setSelectedFilter("categories")} className="ml-4 mr-4">
                    Kategoriat
                </button>
            </nav>
            {selectedFilter === "users" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Käyttäjät</h2>
                    <AdminUser />
                </>
            )}
            {selectedFilter === "listings" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Ilmoitukset</h2>
                    <AdminListing />
                </>
            )}
            {selectedFilter === "categories" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Kategoriat</h2>
                    <AdminCategory />
                </>
            )}
        </div>
    );
};

export default Admin;
