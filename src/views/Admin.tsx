import React, { useEffect, useState } from "react";
import { User } from "mpp-api-types";
import { useUser } from "../hooks/UserHooks";
import { useCategories } from "../hooks/CategoryHooks";
import useListing from "../hooks/ListingHooks";
import Modal from "react-modal";

const AdminSidePanel: React.FC = () => {
    const { getAllUsers, deleteUser, putUser } = useUser();
    const { getCategories, deleteCategory, postCategory } = useCategories();
    const { listings, fetchListings, deleteListing } = useListing();
    const [users, setUsers] = useState<User[]>([]);
    const [categories, setCategories] = useState([]);
    // const [listings, setListings] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState(""); // Add new category

    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        };
        fetchUsers();

        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();

        // const fetchListings = async () => {
        //     const fetchedListings = await getListing();
        //     setListings(fetchedListings);
        // };
        // fetchListings();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteUser(userId, token);
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteCategory(categoryId, token);
            setCategories(categories.filter(category => category.id !== categoryId));
        }
    };

    const handlePostCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        const newCategory = await postCategory(newCategoryName);
        setCategories([...categories, newCategory]);
        setNewCategoryName("");
    };

    const handleDeleteListing = async (listingId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteListing(listingId, token);
            setListings(listings.filter(listing => listing.id !== listingId));
        }
    };

    return (
        <div className="side-panel">
            <ul className="space-y-4">
                <h2 className="text-xl font-semibold">Users</h2>
                {users.map(user => (
                    <li key={user.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2 font-semibold">{user.username}</p>
                        <button
                            onClick={() => handleModifyUser(user.id)}
                            className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
                        >
                            Muokkaa
                        </button>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Poista
                        </button>
                    </li>
                ))}
                <h2 className="text-xl font-semibold">Listings</h2>
                {listings.map(listing => (
                    <li key={listing.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2 font-semibold">{listing.title}</p>
                        <button
                            onClick={() => handleDeleteListing(listing.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete Listing
                        </button>
                    </li>
                ))}
                <h2 className="text-xl font-semibold">Categories</h2>
                {categories.map(category => (
                    <li key={category.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2 font-semibold">{category.title}</p>
                        <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete Category
                        </button>
                    </li>
                ))}
                <form onSubmit={handlePostCategory}>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="New category name"
                        className="bg-transparent"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Add Category
                    </button>
                </form>
            </ul>
        </div>
    );
};

export default AdminSidePanel;
