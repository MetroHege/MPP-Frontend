// UserContext.tsx
import React, { createContext, useState } from "react";
import { useAuthentication, useUser } from "../hooks/UserHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../types/LocalTypes";
import { PostUsersRequest } from "mpp-api-types";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<PostUsersRequest | null>(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // login, logout and autologin functions are here instead of components
    const handleLogin = async (credentials: Credentials) => {
        try {
            const loginResult = await postLogin(credentials);
            if (loginResult) {
                localStorage.setItem("token", loginResult.token);
                setUser(loginResult.user);
                let origin = "";
                if (loginResult.user.level_name === "Admin") {
                    origin = "/admin";
                } else {
                    origin = "/profile";
                }
                navigate(origin);
            }
        } catch (e) {
            alert((e as Error).message);
        }
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/");
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const userResponse = await getUserByToken(token);
                setUser(userResponse.user);
                console.log("level", userResponse.user.level_name);
                let origin = "";
                if (userResponse.user.level_name === "Admin") {
                    origin = "/admin";
                } else {
                    origin = location.state.from.pathname || "/";
                }
                navigate(origin);
            }
        } catch (e) {
            console.log((e as Error).message);
        }
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };
