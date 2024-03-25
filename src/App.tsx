import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Single from "./views/Single";
import Login from "./views/Login";
import Rules from "./views/Rules";

const App = () => {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/single" element={<Single />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route
                        path="*"
                        element={
                            <>
                                <h1 className="font-bold text-4xl mb-4">404 - Not Found</h1>
                                <p className="text-2xl">
                                    Hupsis! Täällä ei ole mitään maalattavaa. Etsimme kissoja ja
                                    koiria, mutta ne ovat kaikki karanneet kilpajuoksuun. Paina
                                    kotinappia ja palaa takaisin kisakentälle. Ehkä seuraavalla
                                    kierroksella löydämme voittajan!
                                </p>
                            </>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
