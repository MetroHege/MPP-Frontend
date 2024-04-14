// UserContext.tsx
import React, { createContext, useState } from "react";
import { useAuthentication, useUser } from "../hooks/UserHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextType, Credentials } from "../types/LocalTypes";
import { PostUsersResponse } from "mpp-api-types";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<PostUsersResponse | null>(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // const handleLogin = async (credentials: Credentials) => {
    //     try {
    //         const loginResult = await postLogin(credentials);
    //         if (loginResult) {
    //             localStorage.setItem("token", loginResult.token);
    //             setUser(loginResult.user);
    //             let origin = "";
    //             if (loginResult.user.admin) {
    //                 origin = "/admin";
    //             } else {
    //                 origin = "/";
    //             }
    //             navigate(origin);
    //         }
    //     } catch (e) {
    //         alert((e as Error).message);
    //     }
    // };

    const handleLogin = async (credentials: Credentials) => {
        try {
            const failedAttemptsKey = `${credentials.username}_failedAttempts`;
            const lastFailedAttemptKey = `${credentials.username}_lastFailedAttempt`;

            const failedAttempts = Number(localStorage.getItem(failedAttemptsKey) || "0");
            const lastFailedAttempt = Number(localStorage.getItem(lastFailedAttemptKey) || "0");
            const now = Date.now();

            if (failedAttempts >= 3 && now - lastFailedAttempt < 5 * 60 * 1000) {
                alert(
                    "You have entered the wrong password too many times. Please wait 5 minutes before trying again."
                );
                return;
            }

            const loginResult = await postLogin(credentials);

            if (loginResult) {
                localStorage.setItem("token", loginResult.token);
                localStorage.setItem(failedAttemptsKey, "0");
                setUser(loginResult.user);
                let origin = "";
                if (loginResult.user.admin === true) {
                    origin = "/admin";
                } else {
                    origin = "/";
                }
                navigate(origin);
            }
        } catch (e) {
            const failedAttemptsKey = `${credentials.username}_failedAttempts`;
            const lastFailedAttemptKey = `${credentials.username}_lastFailedAttempt`;

            const failedAttempts = Number(localStorage.getItem(failedAttemptsKey) || "0");
            localStorage.setItem(failedAttemptsKey, String(failedAttempts + 1));
            localStorage.setItem(lastFailedAttemptKey, String(Date.now()));
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
                setUser(userResponse);
                let origin = "";
                if (userResponse.admin) {
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
