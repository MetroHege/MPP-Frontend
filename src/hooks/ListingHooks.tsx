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
    PutListingResponse
} from "mpp-api-types";

const useListing = () => {
    const [listings, setListings] = useState<ListingWithId[]>([]);
    const { update } = useUpdateContext();

    const getListing = async () => {
        try {
            const mediaListings = await fetchData<GetListingsResponse>(
                import.meta.env.VITE_SERVER + "/media"
            );
            console.log(listings);

            setListings(mediaListings);
        } catch (error) {
            console.error("getMedia failed", error);
        }
    };
    useEffect(() => {
        getListing();
    }, [update]);

    const putListing = async (id: number, listing: Listing, token: string) => {
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
        file: PostListingsRequest,
        inputs: Record<string, string>,
        token: string
    ) => {
        const listing: PostListingsRequest = {
            type: inputs.type as "buy" | "sell",
            category: Number(inputs.category),
            quality: Number(inputs.quality),
            price: Number(inputs.price),
            title: inputs.title,
            description: inputs.description
        };

        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listing)
        };
        return fetchData<PostListingsResponse>(import.meta.env.VITE_SERVER + "/media", options);
    };

    const deleteListing = async (media_id: number, token: string) => {
        const options = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<DeleteListingResponse>(
            import.meta.env.VITE_SERVER + "/media/" + media_id,
            options
        );
    };

    return { postListing, deleteListing, putListing };
};

export default useListing;
