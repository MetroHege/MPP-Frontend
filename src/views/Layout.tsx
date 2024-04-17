import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../image/divarinet-white.png";
import { useEffect, useState } from "react";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import field1 from "../img/field-1.jpg";
import field2 from "../img/field-2.jpg";
import field3 from "../img/field-3.jpg";
import { Carousel } from "react-responsive-carousel";
import { useUser } from "../hooks/UserHooks";
import { useCategories } from "../hooks/CategoryHooks"; // Import the getCategories function
import useListing from "../hooks/ListingHooks";
import { useTheme } from "../contexts/ThemeContext";

const Layout = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const { getAllUsers } = useUser();
    const [userCount, setUserCount] = useState<number>(0); // Declare setUserCount function
    const { categories, getCategories } = useCategories();
    const { listings } = useListing();
    const { theme } = useTheme();

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUserCount(users.length);
        };

        fetchUsers();
    }, []);

    return (
        <>
            <header className="w-full bg-main-dark">
                <div className="flex justify-between p-2 items-center">
                    <img src={logo} alt="DivariNet" className="h-10 w-auto" />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="xl:hidden flex items-center px-3 py-2 border rounded text-white border-white"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <nav className="xl:flex hidden">
                        <ul className="flex space-x-4 mr-4">
                            <li>
                                <Link className="text-xl text-white hover:text-gray-300" to="/">
                                    Koti
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/profile"
                                >
                                    Profiili
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/upload"
                                >
                                    Ilmoita
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/admin"
                                >
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/login"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {isOpen && (
                    <div className="transition-transform duration-500 ease-in-out transform translate-x-0 xl:translate-x-full bg-main-dark">
                        <ul className="flex flex-col space-y-4 p-2 items-end">
                            <li>
                                <Link className="text-xl text-white hover:text-gray-300" to="/">
                                    Koti
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/profile"
                                >
                                    Profiili
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/upload"
                                >
                                    Ilmoita
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-xl text-white hover:text-gray-300"
                                    to="/login"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
            <div>
                {location.pathname === "/" && (
                    <div className="relative">
                        <div
                            className={`absolute top-10 left-10 p-4 z-10 w-1/2 ${theme === "light" ? "text-gray-900" : ""}`}
                        >
                            {" "}
                            <h2 className="font-bold text-4xl mb-4">Tervetuloa DivariNet:iin!</h2>
                            <p className="text-xl">
                                DivariNet on suunniteltu kaikille, urheilusta kiinnostuneille,
                                olitpa sitten ostamassa tai myymässä vanhoja
                                urheiluvaatteita/-välineitä!
                            </p>
                        </div>
                        <div
                            className={`absolute top-10 right-10 p-4 z-10 w-1/2 text-right ${theme === "light" ? "text-gray-800" : ""}`}
                        >
                            {" "}
                            <p className="text-xl">
                                Aktiivisia käyttäjiä: <strong>{userCount}</strong>
                            </p>
                            <p className="text-xl">
                                Ilmoituksia jätetty: <strong>{listings.length}</strong>
                            </p>
                            <p className="text-xl">
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
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
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
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
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
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                            </div>
                        </Carousel>
                        {/* <div className="relative">
                            <video className="w-full h-130 object-cover" autoPlay loop muted>
                                <source src={yourVideoSource} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-main-medium to-transparent"></div>
                            <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                        </div> */}
                    </div>
                )}
            </div>
            <body className={`${theme === "light" ? "bg-slate-100 text-gray-900" : ""}`}>
                <main
                    className={`w-4/5 mx-auto p-4 ${theme === "light" ? "bg-slate-100 text-gray-900" : ""}`}
                >
                    <Outlet />
                </main>
            </body>
            <footer
                className={`py-10 px-6 ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
            >
                {" "}
                <div className="flex w-full">
                    <div className="w-1/3">
                        <img src={logo} alt="DivariNet" className="h-10 w-auto" />
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
