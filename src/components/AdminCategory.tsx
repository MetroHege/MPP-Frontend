import React, { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoryHooks";

const AdminCategory: React.FC = () => {
    const { getCategories, deleteCategory, postCategory } = useCategories();
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    // useEffect hook to fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
        fetchCategories();
    }, []);

    // Function to handle deleting a category
    const handleDeleteCategory = async (categoryId: number) => {
        const token = localStorage.getItem("token");
        if (token) {
            await deleteCategory(categoryId, token);
            setCategories(categories.filter(category => category.id !== categoryId));
        }
    };

    // Function to handle posting a new category
    const handlePostCategory = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (token) {
            const newCategory = await postCategory({ title: newCategoryName }, token);
            if (newCategory) {
                setCategories(prevCategories => [...prevCategories, newCategory]);
                setNewCategoryName("");
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {categories.map(category => (
                    <div key={category.id} className="p-4 border border-gray-200 rounded shadow-sm">
                        <p className="mb-2">{category.title}</p>
                        {/* Button to delete the category */}
                        <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Poista
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <form onSubmit={handlePostCategory}>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={e => setNewCategoryName(e.target.value)}
                        placeholder="Lisää uusi kategoria"
                        className="mr-4 border border-gray-200 rounded shadow-sm p-2 bg-slate-50 text-slate-950 dark:text-slate-950 dark:bg-slate-50"
                    />
                    {/* Button to add new category */}
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Lisää
                    </button>
                </form>
            </div>
        </>
    );
};

export default AdminCategory;
