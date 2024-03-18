import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header className="w-full bg-main-dark">
                <div className="flex justify-between p-4">
                    <h1 className="text-2xl text-slate-50">DivariNet</h1>
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
