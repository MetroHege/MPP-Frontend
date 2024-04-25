import {
    GetListingStatisticResponse,
    GetUserListingStatisticResponse,
    GetUserStatisticResponse
} from "mpp-api-types";
import { fetchData } from "../lib/functions";

const useStatistics = () => {
    const getListingStatistics = async () => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/statistics/listings");
            const statistics = await fetchData<GetListingStatisticResponse>(url.toString());
            return statistics;
        } catch (error) {
            console.error("getListingStatistics failed", error);
        }
    };

    const getUserStatistics = async () => {
        try {
            const url = new URL(import.meta.env.VITE_SERVER + "/statistics/users");
            const statistics = await fetchData<GetUserStatisticResponse>(url.toString());
            return statistics;
        } catch (error) {
            console.error("getUserStatistics failed", error);
        }
    };

    const getUserListingStatistics = async (id: number) => {
        try {
            const url = new URL(
                import.meta.env.VITE_SERVER + "/statistics/users/" + id + "/listings"
            );
            const statistics = await fetchData<GetUserListingStatisticResponse>(url.toString());
            return statistics;
        } catch (error) {
            console.error("getUserListingStatistics failed", error);
        }
    };

    return { getListingStatistics, getUserStatistics, getUserListingStatistics };
};

export default useStatistics;
