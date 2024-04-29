import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import darkLogo from "../img/divarinet-white.png";
import lightLogo from "../img/divarinet-black.png";
import { useEffect, useState } from "react";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import field1 from "../img/field-1.jpg";
import field2 from "../img/field-2.jpg";
import field3 from "../img/field-3.jpg";
import { Carousel } from "react-responsive-carousel";
import { useUser } from "../hooks/UserHooks";
import { useCategories } from "../hooks/CategoryHooks";
import { useTheme } from "../contexts/ThemeContext";
import { useUserContext } from "../contexts/ContextHooks";
import useStatistics from "../hooks/StatisticsHooks";

// This component is used to render the layout of the application.
const Layout = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { getAllUsers } = useUser();
    const { user, handleAutoLogin } = useUserContext();
    const [userCount, setUserCount] = useState<number>(0);
    const { getListingStatistics, getUserStatistics } = useStatistics();
    const [listingsCount, setListingsCount] = useState<number>(0);
    const { categories, getCategories } = useCategories();
    const { theme } = useTheme();

    // This function is used to handle the auto login process.
    if (!user) {
        handleAutoLogin();
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const fetchStatistics = async () => {
            const listingStatistics = await getListingStatistics();
            const userStatistics = await getUserStatistics();
            if (listingStatistics) {
                setListingsCount(listingStatistics.listings);
            }
            if (userStatistics) {
                setUserCount(userStatistics.users);
            }
        };

        fetchStatistics();
    }, [getListingStatistics, getUserStatistics]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUserCount(users.length);
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    return (
        <>
            <header
                className={`w-full ${theme === "light" ? "bg-slate-200 text-gray-900" : "bg-main-dark"}`}
            >
                <div className="flex justify-between p-2 items-center">
                    <Link to="/">
                        <img
                            src={theme === "light" ? lightLogo : darkLogo}
                            alt="DivariNet"
                            className="h-10 w-auto"
                        />{" "}
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="sm:hidden flex items-center px-3 py-2 border rounded text-white border-white"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <nav className="sm:flex hidden">
                        <ul className="flex space-x-4 mr-4">
                            <li>
                                <Link
                                    onClick={() => setIsOpen(false)}
                                    className={`text-xl ${theme === "light" ? "text-black" : "text-white"} hover:text-gray-300 ${location.pathname === "/" ? "underline" : ""}`}
                                    to="/"
                                >
                                    Koti
                                </Link>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <Link
                                            onClick={() => setIsOpen(false)}
                                            className={`text-xl ${theme === "light" ? "text-black" : "text-white"} hover:text-gray-300 ${location.pathname === "/profile" ? "underline" : ""}`}
                                            to="/profile"
                                        >
                                            Profiili
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() => setIsOpen(false)}
                                            className={`text-xl ${theme === "light" ? "text-black" : "text-white"} hover:text-gray-300 ${location.pathname === "/upload" ? "underline" : ""}`}
                                            to="/upload"
                                        >
                                            Ilmoita
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link
                                        onClick={() => setIsOpen(false)}
                                        className={`text-xl ${theme === "light" ? "text-black" : "text-white"} hover:text-gray-300 ${location.pathname === "/login" ? "underline" : ""}`}
                                        to="/login"
                                    >
                                        Kirjaudu
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                {isOpen && (
                    <div className="transition-transform duration-500 ease-in-out transform translate-x-0 sm:translate-x-full bg-main-dark">
                        <ul className="flex flex-col space-y-4 p-2 items-end">
                            <li>
                                <Link
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/"
                                >
                                    Koti
                                </Link>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <Link
                                            onClick={() => setIsOpen(false)}
                                            className="text-xl text-white hover:text-gray-300"
                                            to="/profile"
                                        >
                                            Profiili
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() => setIsOpen(false)}
                                            className="text-xl text-white hover:text-gray-300"
                                            to="/upload"
                                        >
                                            Ilmoita
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link
                                        onClick={() => setIsOpen(false)}
                                        className="text-xl text-white hover:text-gray-300"
                                        to="/login"
                                    >
                                        Kirjaudu
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </header>
            <div>
                {location.pathname === "/" && (
                    <div className="relative">
                        <div
                            className={`absolute top-5 left-5 p-4 z-10 w-full md:top-10 md:left-10 md:w-1/2 ${theme === "light" ? "text-gray-900" : ""}`}
                        >
                            <h2 className="font-bold text-4xl mb-4">Tervetuloa DivariNetiin!</h2>
                            <p className="text-lg md:text-xl overflow-auto md:overflow-visible">
                                DivariNet on suunniteltu kaikille urheilusta kiinnostuneille, olitpa
                                ostamassa tai myymässä vanhoja urheiluvaatteita/-välineitä!
                            </p>
                        </div>
                        <div
                            className={`absolute top-10 md:right-10 p-4 z-10 w-full md:block text-right ${theme === "light" ? "text-gray-800" : ""}`}
                        >
                            <p className="text-xl md:block hidden">
                                Aktiivisia käyttäjiä: <strong>{userCount}</strong>
                            </p>
                            <p className="text-xl md:block hidden">
                                Ilmoituksia jätetty: <strong>{listingsCount}</strong>
                            </p>
                            <p className="text-xl md:block hidden">
                                Tuotekategorioita: <strong>{categories.length}</strong>
                            </p>
                        </div>
                        <Carousel
                            className="w-full object-cover object-center"
                            autoPlay
                            infiniteLoop
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            showArrows={false}
                            interval={10000}
                            transitionTime={2000}
                        >
                            <div>
                                <img
                                    className="h-110 w-full object-cover"
                                    src={field1}
                                    alt="Slide 1"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${theme === "light" ? "from-slate-100 to-transparent" : "from-main-medium to-transparent"}`}
                                ></div>{" "}
                                <div
                                    className={`h-5 absolute inset-0 ${theme === "light" ? "bg-gradient-to-b from-slate-200 to-transparent" : "bg-gradient-to-b from-main-dark to-transparent"}`}
                                ></div>{" "}
                            </div>
                            <div>
                                <img
                                    className="h-110 w-full object-cover"
                                    src={field2}
                                    alt="Slide 2"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${theme === "light" ? "from-slate-100 to-transparent" : "from-main-medium to-transparent"}`}
                                ></div>{" "}
                                <div
                                    className={`h-5 absolute inset-0 ${theme === "light" ? "bg-gradient-to-b from-slate-200 to-transparent" : "bg-gradient-to-b from-main-dark to-transparent"}`}
                                ></div>{" "}
                            </div>
                            <div>
                                <img
                                    className="h-110 w-full object-cover"
                                    src={field3}
                                    alt="Slide 3"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t ${theme === "light" ? "from-slate-100 to-transparent" : "from-main-medium to-transparent"}`}
                                ></div>{" "}
                                <div
                                    className={`h-5 absolute inset-0 ${theme === "light" ? "bg-gradient-to-b from-slate-200 to-transparent" : "bg-gradient-to-b from-main-dark to-transparent"}`}
                                ></div>{" "}
                            </div>
                        </Carousel>
                    </div>
                )}
            </div>
            <div className={`${theme === "light" ? "bg-slate-100 text-gray-900" : ""}`}>
                <main
                    className={`w-full md:w-4/5 mx-auto p-4 ${theme === "light" ? "bg-slate-100 text-gray-900" : ""}`}
                >
                    {/* This component is used to render the content of the application. */}
                    <Outlet />
                </main>
            </div>
            <footer
                className={`py-10 px-6 bg-main-dark ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
            >
                {" "}
                <div className="flex w-full">
                    <div className="w-1/3">
                        <img
                            src={theme === "light" ? lightLogo : darkLogo}
                            alt="DivariNet"
                            className="h-10 w-auto"
                        />{" "}
                        <p className="text-sm mt-2">
                            Luotetun markkinapaikan tarjoaja käytetyille urheiluvälineille.
                        </p>
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-lg font-bold mb-2 text-center">Linkit</h2>
                        <ul className="space-y-2 text-sm text-center">
                            <li>
                                <Link to="/">Koti</Link>
                            </li>
                            <li>
                                <Link to="/contact">Ota yhteyttä</Link>
                            </li>
                            <li>
                                <Link to="/rules">Käyttöehdot</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-1/3">
                        <h2 className="text-lg font-bold mb-2 text-center">SoMe</h2>
                        <div className="flex justify-center space-x-4">
                            <a href="#">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 border-t border-gray-800 pt-5">
                    <p className="text-sm text-center">Copyright 2024 - DivariNet</p>
                </div>
            </footer>
        </>
    );
};

export default Layout;
