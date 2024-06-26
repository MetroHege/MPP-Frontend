import { useEffect, useState } from "react";
import { FaArrowUp, FaFutbol } from "react-icons/fa";
import UserForm from "../components/UserForm";
import { useMe } from "../hooks/UserHooks";
import { ListingWithId, User, UserWithId } from "mpp-api-types";
import { useUserContext } from "../contexts/ContextHooks";
import { Listing as Listingtype } from "mpp-api-types";
import useListing from "../hooks/ListingHooks";
import Listing from "../components/Listing";
import { FaBasketball } from "react-icons/fa6";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import useStatistics from "../hooks/StatisticsHooks";

interface CustomSwitchProps {
    checked: boolean;
    onChange: () => void;
    offColor?: string;
    onColor?: string;
    handleDiameter?: number;
    uncheckedIcon?: boolean;
    checkedIcon?: boolean;
    boxShadow?: string;
    activeBoxShadow?: string;
    height?: number;
    width?: number;
    className?: string;
    id?: string;
}

// This component is a custom switch that can be toggled on and off.
const CustomSwitch: React.FC<CustomSwitchProps> = ({ checked, onChange }) => {
    return (
        <label
            onClick={onChange}
            className={`toggle-label block overflow-hidden h-6 w-12 rounded-full ${checked ? "bg-gray-600" : "bg-gray-300"} cursor-pointer`}
        >
            <span
                className={`toggle ${checked ? "translate-x-6" : "translate-x-0"} inline-block w-6 h-6 transform bg-white shadow-md rounded-full flex items-center justify-center`}
                style={checked ? { animation: "spin 1s linear infinite" } : undefined}
            >
                <FaFutbol color="black" size={20} />
            </span>
        </label>
    );
};

// This component is the profile view of the application.
const Profile = () => {
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserWithId | null>(null);
    const { getMe } = useMe();
    const { listings } = useListing();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const { getUserListingStatistics } = useStatistics();
    const [userListingsCount, setUserListingsCount] = useState<number>(0);
    const [listingMessagesCount, setListingMessagesCount] = useState<number>(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchStatistics = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const me = await getMe(token);
                if (me) {
                    const userListingStatistics = await getUserListingStatistics(me.id);
                    if (userListingStatistics) {
                        setUserListingsCount(userListingStatistics.listings);
                        setListingMessagesCount(
                            userListingStatistics.messages - userListingStatistics.ownMessages
                        );
                    }
                }
            }
        };

        fetchStatistics();
    }, [getUserListingStatistics, getMe]);

    useEffect(() => {
        const checkScroll = () => {
            if (!isVisible && window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else if (isVisible && window.scrollY <= window.innerHeight) {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, [isVisible]);

    // This function is used to scroll to the top of the page.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

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

    // If the user is not loaded yet, display a loading message.
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
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#000"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <FaBasketball
                            style={{ fontSize: "50px", opacity: "0.7", color: "orange", zIndex: 1 }}
                        />
                    </div>
                    <FaArrowUp style={{ fontSize: "40px", color: "#fff", zIndex: 2 }} />
                </button>
            )}
            <button>
                <a
                    className=" w-1/4 p-2 bg-green-gradient font-bold rounded mb-10 text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                    href="/"
                >
                    &#8592; Etusivulle
                </a>
            </button>
            <div className="flex flex-col xsm:flex-row mt-5 mb-5 xsm:mt-10 xsm:mb-10">
                <div className="w-full mb-4 xsm:w-1/2">
                    <h1 className="text-4xl mb-4">Tietoni:</h1>
                    <p className="text-2xl mb-2">
                        <span>Käyttäjänimi:</span>{" "}
                        <span className="font-bold">{user.username}</span>
                    </p>
                    <p className="text-2xl mb-2">
                        <span>Etunimi:</span> <span className="font-bold">{user.firstName}</span>
                    </p>
                    <p className="text-2xl mb-2">
                        <span>Sukunimi:</span> <span className="font-bold">{user.lastName}</span>
                    </p>
                    <p className="text-2xl mb-2">
                        <span>Puhelinnumero:</span> <span className="font-bold">{user.phone}</span>
                    </p>
                    <p className="text-2xl mb-2">
                        <span>Sähköposti:</span> <span className="font-bold">{user.email}</span>
                    </p>
                    <p className="text-2xl mb-2">
                        <span>Salasana:</span> <span className="font-bold">**********</span>
                    </p>
                    <p className="text-2xl mb-4">
                        <span>Kaupunki:</span> <span className="font-bold">{user.city}</span>
                    </p>
                    <div className="flex flex-col">
                        <button
                            className="w-3/4 md:w-1/2 p-2 bg-yellow-gradient font-bold mb-2 rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                            type="submit"
                            onClick={() => setShowForm(true)}
                        >
                            Muokkaa tietoja
                        </button>
                        {/* This component is a form that allows the user to edit their information. */}
                        <UserForm
                            showForm={showForm}
                            setShowForm={setShowForm}
                            setParentUser={setUser}
                        />
                        <button
                            className="w-3/4 md:w-1/2 p-2 bg-red-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                            type="submit"
                            onClick={handleLogout}
                        >
                            Kirjaudu ulos
                        </button>
                    </div>
                </div>
                <div className="w-full xsm:w-1/2">
                    <p className="hidden xsm:block text-3xl md:text-4xl mb-4">
                        Aktiivisia ilmoituksia: {userListingsCount}
                    </p>
                    <p className="hidden xsm:block text-3xl md:text-4xl mb-4">
                        Kyselyjä ilmoituksissa: {listingMessagesCount}
                    </p>
                    <div className="flex items-center">
                        <p className="text-xl md:text-2xl mr-2">Vaihda teemaa:</p>
                        {/* This component is a custom switch that can be toggled on and off. */}
                        <CustomSwitch
                            onChange={toggleTheme}
                            checked={theme === "dark"}
                            offColor="#767577"
                            onColor="#f4f3f4"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch mt-2 xsm:mt-0"
                            id="material-switch"
                        />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 my-4 mx-2"></div>
            <div>
                <h1 className="text-4xl mb-4">Ilmoitukseni:</h1>
                {listings &&
                listings.filter((listing: Listingtype) =>
                    typeof listing.user === "number" ? listing.user : listing.user.id === user?.id
                ).length > 0 ? (
                    listings
                        .filter((listing: Listingtype) =>
                            typeof listing.user === "number"
                                ? listing.user
                                : listing.user.id === user?.id
                        )
                        .slice()
                        .map((listing: ListingWithId) => (
                            <Listing
                                key={listing.id}
                                item={{ ...listing, id: listing.id }}
                                userItem={listing.user as unknown as User}
                            />
                        ))
                ) : (
                    <div>
                        <p className="text-2xl mb-4 mt-10">
                            Voi ei, näyttää siltä ettei sinulla ole vielä ilmoituksia
                        </p>
                        <button
                            className=" w-1/4 p-2 bg-green-gradient font-bold rounded mb-10 text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                            onClick={() => navigate("/upload")}
                        >
                            Jätä ilmoitus
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
