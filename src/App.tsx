import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./views/Layout";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Single from "./views/Single";
import Login from "./views/Login";

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
                    <Route path="*" element={<h1>404 - Not Found</h1>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
