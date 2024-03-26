import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(UserContext) || {};

    const location = useLocation();

    if (!user) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
