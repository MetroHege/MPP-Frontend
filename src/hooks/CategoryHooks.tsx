import { GetCategoriesResponse } from "mpp-api-types";
import { useState } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState<GetCategoriesResponse>([]);

    const getCategories = async (): Promise<GetCategoriesResponse> => {
        const response = await fetch(import.meta.env.VITE_SERVER + "/categories");
        const json = await response.json();
        setCategories(json);
        return json;
    };

    const postCategory = async (category: string, token: string) => {
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        };
        return await fetch(import.meta.env.VITE_SERVER + "/categories", options);
    };

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
