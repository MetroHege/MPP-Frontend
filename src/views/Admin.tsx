import React, { useEffect, useState } from "react";
import AdminUser from "../components/AdminUser";
import AdminListing from "../components/AdminListing";
import AdminCategory from "../components/AdminCategory";
import useStatistics from "../hooks/StatisticsHooks";

const Admin: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState("users");
    const [userCount, setUserCount] = useState<number>(0);
    const { getListingStatistics, getUserStatistics } = useStatistics();
    const [listingsCount, setListingsCount] = useState<number>(0);
    const [buyCount, setBuyCount] = useState<number>(0);
    const [sellCount, setSellCount] = useState<number>(0);
    const [messageCount, setMessageCount] = useState<number>(0);

    // useEffect hook to fetch statistics
    useEffect(() => {
        const fetchStatistics = async () => {
            const listingStatistics = await getListingStatistics();
            const userStatistics = await getUserStatistics();
            if (listingStatistics) {
                setListingsCount(listingStatistics.listings);
                setBuyCount(listingStatistics.buy);
                setSellCount(listingStatistics.sell);
                setMessageCount(listingStatistics.messages);
            }
            if (userStatistics) {
                setUserCount(userStatistics.users);
            }
        };

        fetchStatistics();
    }, [getListingStatistics, getUserStatistics]);

    return (
        <div className="side-panel">
            {/* The navigation bar */}
            <nav className="mb-4 flex justify-between">
                {/* The div that contains the filter buttons */}
                <div className="text-xl">
                    <button onClick={() => setSelectedFilter("users")} className="mr-4">
                        Käyttäjät
                    </button>
                    <button onClick={() => setSelectedFilter("listings")}>Ilmoitukset</button>
                    <button onClick={() => setSelectedFilter("categories")} className="ml-4 mr-4">
                        Kategoriat
                    </button>
                </div>
                {/* The div that contains the statistics */}
                <div className="text-sm">
                    <p>
                        Aktiivisia käyttäjiä: <strong>{userCount}</strong>
                    </p>
                    <p>
                        Ilmoituksia kokonaisuudessaan: <strong>{listingsCount}</strong>
                    </p>
                    <p>
                        Ostoilmoituksia jätetty: <strong>{buyCount}</strong>
                    </p>
                    <p>
                        Myynti-ilmoituksia jätetty: <strong>{sellCount}</strong>
                    </p>
                    <p>
                        Viestejä ilmoituksissa: <strong>{messageCount}</strong>
                    </p>
                </div>
            </nav>
            {selectedFilter === "users" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Käyttäjät</h2>
                    <AdminUser />
                </>
            )}
            {selectedFilter === "listings" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Ilmoitukset</h2>
                    <AdminListing />
                </>
            )}
            {selectedFilter === "categories" && (
                <>
                    <h2 className="text-xl font-semibold mb-4">Kategoriat</h2>
                    <AdminCategory />
                </>
            )}
        </div>
    );
};

export default Admin;
