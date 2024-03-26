import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../image/divarinet-white.png";
// import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
// import field1 from "../img/field-1.jpg";
// import field2 from "../img/field-2.jpg";
// import field3 from "../img/field-3.jpg";
import yourVideoSource from "../img/video-4K.mp4";
import { useState } from "react";

const Layout = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="w-full bg-main-dark">
                <div className="flex justify-between p-2 items-center md:hidden">
                    <img src={logo} alt="DivariNet" className="h-10 w-auto" />
                    <button className="flex" onClick={() => setIsOpen(!isOpen)}>
                        <FontAwesomeIcon
                            icon={isOpen ? faTimes : faBars}
                            className="text-2xl text-white hover:text-gray-300"
                        />
                    </button>
                </div>
                <nav className={`bg-main-dark px-6 py-4 ${isOpen ? "block" : "hidden"} md:block`}>
                    <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
                        <img src={logo} alt="DivariNet" className="h-10 w-auto hidden md:block" />
                        <ul className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
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
                                    Ilmoitukset
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
                </nav>
            </header>
            <div>
                {location.pathname === "/" && (
                    <div className="relative">
                        <div className="absolute top-10 left-10 p-4 z-10 w-1/2">
                            <h2 className="font-bold text-4xl mb-4">Tervetuloa DivariNet:iin!</h2>
                            <p className="text-xl">
                                DivariNet on suunniteltu kaikille, urheilusta kiinnostuneille,
                                olitpa sitten ostamassa tai myymässä vanhoja
                                urheiluvaatteita/-välineitä!
                            </p>
                        </div>
                        <div className="absolute top-10 right-10 p-4 z-10 w-1/2 text-right">
                            <p className="text-xl">
                                Aktiivisia käyttäjiä: <strong>340</strong>
                            </p>
                            <p className="text-xl">
                                Ilmoituksia jätetty: <strong>1200</strong>
                            </p>
                            <p className="text-xl">
                                Tuotekategorioita: <strong>15</strong>
                            </p>
                        </div>
                        {/* <Carousel
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
                                <div className="absolute inset-0 bg-gradient-to-t from-main-medium to-transparent"></div>
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                            </div>
                            <div>
                                <img
                                    className="h-110 w-full object-cover"
                                    src={field2}
                                    alt="Slide 2"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-main-medium to-transparent"></div>
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                            </div>
                            <div>
                                <img
                                    className="h-110 w-full object-cover"
                                    src={field3}
                                    alt="Slide 3"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-main-medium to-transparent"></div>
                                <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                            </div>
                        </Carousel> */}
                        <div className="relative">
                            <video className="w-full h-130 object-cover" autoPlay loop muted>
                                <source src={yourVideoSource} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-t from-main-medium to-transparent"></div>
                            <div className="h-5 absolute inset-0 bg-gradient-to-b from-main-dark to-transparent"></div>
                        </div>
                    </div>
                )}
            </div>
            <main className="w-4/5 mx-auto p-4">
                <Outlet />
            </main>
            <footer className="bg-main-dark text-white py-10 px-6">
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
                                <a href="#">Koti</a>
                            </li>
                            <li>
                                <a href="#">Ota yhteyttä</a>
                            </li>
                            <li>
                                <a href="#">Käyttöehdot</a>
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
