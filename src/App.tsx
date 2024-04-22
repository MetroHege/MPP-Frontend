import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Modal from "react-modal";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Single from "./views/Single";
import Login from "./views/Login";
import Rules from "./views/Rules";
import Admin from "./views/Admin";
import { UserProvider } from "./contexts/UserContext";
import { UpdateProvider } from "./contexts/UpdateContext";
import { useEffect } from "react";
import Contact from "./views/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    useEffect(() => {
        Modal.setAppElement("#root");
    }, []);

    return (
        <ThemeProvider>
            <Router basename={import.meta.env.BASE_URL}>
                <UserProvider>
                    <UpdateProvider>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <Profile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/upload"
                                    element={
                                        <ProtectedRoute>
                                            <Upload />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/single" element={<Single />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/rules" element={<Rules />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route
                                    path="*"
                                    element={
                                        <>
                                            <h1 className="font-bold text-4xl mb-4">
                                                404 - Not Found
                                            </h1>
                                            <p className="text-2xl">
                                                Oi ei! Täällä ei ole verkkoon osunutta palloa.
                                                Katsomme ylös ja alas, mutta ainoa mikä lentää on
                                                tuuliviiri. Kipinä ei kuitenkaan katoa! Potkaise
                                                kotinappia ja palaa takaisin kentälle. Ehkä
                                                seuraavalla syötöllä teemme maalin!
                                            </p>
                                        </>
                                    }
                                />
                            </Route>
                        </Routes>
                    </UpdateProvider>
                </UserProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
