import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import logo from "../image/divarinet-white.png";
<<<<<<< Updated upstream
=======
import { useState } from "react";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
//import yourVideoSource from "../img/video-4K.mp4";
import field1 from "../img/field-1.jpg";
import field2 from "../img/field-2.jpg";
import field3 from "../img/field-3.jpg";
import { Carousel } from "react-responsive-carousel";
>>>>>>> Stashed changes

const Layout = () => {
    return (
        <>
            <header className="w-full bg-main-dark">
                <div className="flex justify-between p-2 items-center">
                    <img src={logo} alt="DivariNet" className="h-10 w-auto" />
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Link
                                    className="text-2xl text-center text-slate-50 hover:bg-yellow-gradient active:bg-yellow-gradient bg-clip-text transition-colors duration-200 p-2"
                                    to="/"
                                >
                                    Koti
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-2xl text-center text-slate-50 hover:bg-yellow-gradient active:bg-yellow-gradient bg-clip-text transition-colors duration-200 p-2"
                                    to="/profile"
                                >
                                    Profiili
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-2xl text-center text-slate-50 hover:bg-yellow-gradient active:bg-yellow-gradient bg-clip-text transition-colors duration-200 p-2"
                                    to="/upload"
                                >
                                    Ilmoitukset
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-2xl text-center text-slate-50 hover:bg-yellow-gradient active:bg-yellow-gradient bg-clip-text transition-colors duration-200 p-2"
                                    to="/login"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
            <main className="w-4/5 mx-auto p-4">
                <Outlet />
            </main>
            <footer className="w-full flex justify-center bg-main-dark p-4">
                <p className="text-2xl">Copyright 2024 - DivariNet</p>
            </footer>
        </>
    );
};

export default Layout;
