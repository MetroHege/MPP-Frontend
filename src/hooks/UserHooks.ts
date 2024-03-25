import { GetUserResponse, GetUsersResponse, User, postLoginResponse } from "mpp-api-types";
import { fetchData } from "../lib/functions";

const useUser = () => {
    // TODO: implement network functions for auth server user endpoints
    const getUserByToken = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<GetUserResponse>(
            import.meta.env.VITE_SERVER + "/users/token/",
            options
        );
    };

    const postUser = async (user: Record<string, string>) => {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

        await fetchData<GetUsersResponse>(import.meta.env.VITE_SERVER + "/users", options);
    };

    const getUserById = async (user_id: number) => {
        return await fetchData<User>(import.meta.env.VITE_SERVER + "/users/" + user_id);
    };

    const getAllUsers = async () => {
        return await fetchData<User[]>(import.meta.env.VITE_SERVER + "/users");
    };

    const deleteUser = async (user_id: number, token: string) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };

        await fetchData(import.meta.env.VITE_SERVER + "/users/" + user_id, options);
    };

    return {
        getUserByToken,
        postUser,
        getUserById,
        getAllUsers,
        deleteUser
    };
};

const useAuthentication = () => {
    const postLogin = async (creds: Credential) => {
        return await fetchData<postLoginResponse>(import.meta.env.VITE_SERVER + "/auth/login", {
            method: "POST",
            body: JSON.stringify(creds),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    return { postLogin };
};

export { useUser, useAuthentication };
