import { useEffect, useState } from "react";
import { FaFutbol } from "react-icons/fa";
import UserForm from "../components/UserForm";
import { useMe } from "../hooks/UserHooks";
import { User } from "mpp-api-types";
import { useUserContext } from "../contexts/ContextHooks";
import { Listing as Listingtype } from "mpp-api-types";
import useListing from "../hooks/ListingHooks";
import Listing from "../components/Listing";

const CustomSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label
            onClick={toggleCheck}
            className="toggle-label block overflow-hidden h-6 w-12 rounded-full bg-gray-300 cursor-pointer"
        >
            <span
                className={`toggle ${isChecked ? "translate-x-6" : "translate-x-0"} inline-block w-6 h-6 transform bg-white shadow-md rounded-full flex items-center justify-center`}
                style={isChecked ? { animation: "spin 1s linear infinite" } : undefined}
            >
                <FaFutbol color="black" size={20} />
            </span>
        </label>
    );
};

const Profile = () => {
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { getMe } = useMe();
    const { listings } = useListing();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const fetchedUser = await getMe(token);
                    setUser(fetchedUser);
                } catch (error) {
                    console.log((error as Error).message);
                }
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return (
            <div>
                <h1 className="text-4xl mb-4">Käyttäjätietojesi lataamisessa ilmeni ongelma</h1>
                <p className="text-xl mb-4">
                    Odota hetki tai koita päivittää sivu. Varmista myös, että olet kirjautunut
                    palveluun...
                </p>
            </div>
        );
    }
    const { handleLogout } = useUserContext();

    return (
        <>
            <div className="flex mt-10 mb-10">
                <div className="w-1/2">
                    <h1 className="text-4xl mb-4">Tietoni:</h1>
                    <p className="text-2xl mb-2">Käyttäjänimi: {user.username}</p>
                    <p className="text-2xl mb-2">Etunimi: {user.firstName}</p>
                    <p className="text-2xl mb-2">Sukunimi: {user.lastName}</p>
                    <p className="text-2xl mb-2">Puhelinnumero: {user.phone}</p>
                    <p className="text-2xl mb-2">Sähköposti: {user.email}</p>
                    <p className="text-2xl mb-2">Salasana: **********</p>
                    <p className="text-2xl mb-4">Kaupunki: {user.city}</p>
                    <div className="flex flex-col">
                        <button
                            className="w-1/2 p-2 bg-yellow-gradient font-bold mb-2 rounded hover:brightness-75"
                            type="submit"
                            onClick={() => setShowForm(true)}
                        >
                            Muokkaa tietoja
                        </button>
                        <UserForm showForm={showForm} setShowForm={setShowForm} />
                        <button
                            className="w-1/2 p-2 bg-red-gradient font-bold rounded hover:brightness-75"
                            type="submit"
                            onClick={handleLogout}
                        >
                            Kirjaudu ulos
                        </button>
                    </div>
                </div>
                <div className="w-1/2">
                    <p className="text-4xl mb-4">Tili luotu: 13.1.2024 15:50</p>
                    <p className="text-4xl mb-4">Aktiivisia ilmoituksia: 10</p>
                    <p className="text-4xl mb-4">Kyselyjä ilmoituksissa: 12</p>
                    <p className="text-4xl mb-4">Tykkäyksiä ilmoituksissa: 4</p>
                    <div className="flex items-center">
                        <p className="mr-2 text-2xl">Vaihda teemaa:</p>
                        <CustomSwitch />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 my-4 mx-2"></div>
            <div>
                <h1 className="text-4xl mb-4">Ilmoitukseni:</h1>
                <div>
                    {listings &&
                        listings
                            .filter((listing: Listingtype) => listing.user.id === user?.id)
                            .slice()
                            .reverse()
                            .map((listing: Listingtype) => (
                                <Listing
                                    key={listing.id}
                                    item={{ ...listing, id: listing.id }}
                                    userItem={listing.user as unknown as User}
                                />
                            ))}
                </div>
            </div>
        </>
    );
};

export default Profile;
