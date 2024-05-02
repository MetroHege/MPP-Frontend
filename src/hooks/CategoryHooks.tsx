import { Category, GetCategoriesResponse } from "mpp-api-types";
import { useState } from "react";

// This hook is used to fetch and manage categories from the server.
const useCategories = () => {
    const [categories, setCategories] = useState<GetCategoriesResponse>([]);

    const getCategories = async (): Promise<GetCategoriesResponse> => {
        const response = await fetch(import.meta.env.VITE_SERVER + "/categories");
        const json = await response.json();
        setCategories(json);
        return json;
    };

    // This function is used to post a new category to the server.
    const postCategory = async (category: Category, token: string) => {
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        };
        const response = await fetch(import.meta.env.VITE_SERVER + "/categories", options);
        return await response.json();
    };

    // This function is used to delete a category from the server.
    const deleteCategory = async (id: number, token: string) => {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetch(import.meta.env.VITE_SERVER + "/categories/" + id, options);
    };

    return { categories, getCategories, postCategory, deleteCategory };
};

export { useCategories };
