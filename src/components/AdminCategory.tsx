import React, { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryHooks";

const AdminCategory: React.FC = () => {
    const { getCategories, deleteCategory, postCategory } = useCategories();
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);

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

    return (
        <>
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
        </>
    );
};

export default AdminCategory;
