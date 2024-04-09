import { useEffect, useState } from "react";
import { useUpdateContext } from "../contexts/ContextHooks";
import { fetchData } from "../lib/functions";
import {
    DeleteListingResponse,
    GetListingsResponse,
    Listing,
    ListingWithId,
    PostListingsRequest,
    PostListingsResponse,
    PutListingRequest,
    PutListingResponse
} from "mpp-api-types";

const useListing = (filters?: { category?: number }) => {
    const [listings, setListings] = useState<ListingWithId[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { update } = useUpdateContext();

    const getListing = async () => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/listings");
            if (filters?.category) {
                url.searchParams.append("category", filters.category.toString());
            }

            const mediaListings = await fetchData<GetListingsResponse>(url.toString());

            const filteredListings = mediaListings.filter(listing =>
                listing.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setListings(filteredListings);
        } catch (error) {
            console.error("getListing failed", error);
        }
    };

    useEffect(() => {
        getListing();
    }, [update, searchTerm, filters?.category]);

    const getListingWithId = async (id: number) => {
        return await fetchData<GetListingsResponse>(
            import.meta.env.VITE_SERVER + "/listings/" + id
        );
    };

    const getListingsFromUser = async (id: number) => {
        return await fetchData<GetListingsResponse>(
            import.meta.env.VITE_SERVER + "/users/" + id + "/listings"
        );
    };

    const putListing = async (id: number, listing: PutListingRequest, token: string) => {
        const options = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listing)
        };
        return await fetchData<PutListingResponse>(
            import.meta.env.VITE_SERVER + "/listings/" + id,
            options
        );
    };

    const postListing = (
        files: File[],
        inputs: Record<string, number | string | string[]>,
        token: string
    ) => {
        const listing: PostListingsRequest = {
            type: inputs.type as "buy" | "sell",
            images: inputs.images as string[],
            category: Number(inputs.category),
            quality: Number(inputs.quality),
            price: Number(inputs.price),
            title: inputs.title as string,
            description: inputs.description as string
        };

        const formData = new FormData();
        files.forEach(file => {
            formData.append("file", file);
        });
        formData.append("type", listing.type);
        formData.append("category", listing.category.toString());
        formData.append("quality", listing.quality.toString());
        formData.append("price", listing.price.toString());
        formData.append("title", listing.title);
        formData.append("description", listing.description);
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        };
        return fetchData<PostListingsResponse>(import.meta.env.VITE_SERVER + "/listings", options);
    };

    const deleteListing = async (id: number, token: string) => {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<DeleteListingResponse>(
            import.meta.env.VITE_SERVER + "/listings/" + id,
            options
        );
    };

    return {
        postListing,
        deleteListing,
        putListing,
        getListing,
        getListingWithId,
        listings,
        getListingsFromUser,
        setSearchTerm,
        searchTerm
    };
};

export default useListing;
