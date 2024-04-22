import React, { useEffect, useState } from "react";
import AdminUser from "../components/AdminUser";
import AdminListing from "../components/AdminListing";
import AdminCategory from "../components/AdminCategory";

const Admin: React.FC = () => {
    return (
        <div className="side-panel">
            <ul className="space-y-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <AdminUser />
                <h2 className="text-xl font-semibold">Listings</h2>
                <AdminListing />
                <h2 className="text-xl font-semibold">Categories</h2>
                <AdminCategory />
            </ul>
        </div>
    );
};

export default Admin;
