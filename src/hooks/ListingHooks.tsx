import { useEffect, useState } from "react";
import { useUpdateContext } from "../contexts/ContextHooks";
import { fetchData } from "../lib/functions";
import {
    DeleteListingResponse,
    GetListingsResponse,
    ListingWithId,
    PostListingsRequest,
    PostListingsResponse,
    PutListingRequest,
    PutListingResponse
} from "mpp-api-types";

// This hook is used to fetch and manage listings from the server.
const useListing = (filters?: { category?: number }) => {
    const [listings, setListings] = useState<ListingWithId[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "low-high" | "high-low">(
        "newest"
    );
    const [range, setRange] = useState({ start: 0, end: 25 });
    const [hasMore, setHasMore] = useState(true);
    const { update } = useUpdateContext();

    // This function is used to fetch listings from the server.
    const getListing = async () => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/listings");
            url.searchParams.append("range", `${range.start}-${range.end}`);
            if (filters?.category) url.searchParams.append("category", filters.category.toString());
            if (searchTerm) url.searchParams.append("query", searchTerm);
            url.searchParams.append("sort", sortOrder);

            const listings = await fetchData<GetListingsResponse>(url.toString());

            setListings(listings);
            if (listings.length < range.end - range.start) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("getListing failed", error);
        }
    };

    // This function is used to load more listings.
    const loadMore = () => {
        setRange(prevRange => ({ start: 0, end: prevRange.end + 25 }));
    };

    // This function is used to sort listings.
    const sort = (sortOrder: "newest" | "oldest" | "low-high" | "high-low") => {
        setSortOrder(sortOrder);
    };

    useEffect(() => {
        getListing();
    }, [update, searchTerm, filters?.category, range, sortOrder]);

    // This function is used to fetch a listing with a specific id.
    const getListingWithId = async (id: number) => {
        return await fetchData<GetListingsResponse>(
            import.meta.env.VITE_SERVER + "/listings/" + id
        );
    };

    // This function is used to fetch listings from a specific user.
    const getListingsFromUser = async (id: number) => {
        return await fetchData<GetListingsResponse>(
            import.meta.env.VITE_SERVER + "/users/" + id + "/listings"
        );
    };

    // This function is used to fetch listings by category.
    const fetchListingsByCategory = async (category: number) => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/listings");
            url.searchParams.append("category", category.toString());

            const mediaListings = await fetchData<GetListingsResponse>(url.toString());

            return mediaListings;
        } catch (error) {
            console.error("fetchListingsByCategory failed", error);
        }
    };

    // This function is used to update a listing.
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

    // This function is used to post a listing.
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

        // Create a FormData object to send the files and listing data.
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

    // This function is used to delete a listing.
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
        searchTerm,
        fetchListingsByCategory,
        loadMore,
        hasMore,
        sort
    };
};

export default useListing;
