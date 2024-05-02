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
                        className="bg-transparent mr-4"
                    />
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
