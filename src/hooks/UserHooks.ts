import {
    GetUserResponse,
    PostLoginResponse,
    PostUsersResponse,
    PutUserRequest,
    User
} from "mpp-api-types";
import { fetchData } from "../lib/functions";

const useUser = () => {
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

        await fetchData<PostUsersResponse>(import.meta.env.VITE_SERVER + "/users", options);
    };

    const getUserById = async (user_id: number) => {
        return await fetchData<User>(import.meta.env.VITE_SERVER + "/users/" + user_id);
    };

    const getUsernameAvailable = async (username: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_AUTH_API + "/users/username/" + username
        );
    };

    const getEmailAvailable = async (email: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_AUTH_API + "/users/email/" + email
        );
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

    const putUser = async (user_id: number, user: PutUserRequest, token: string) => {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token
            },
            body: JSON.stringify(user)
        };

        await fetchData(import.meta.env.VITE_SERVER + "/users/" + user_id, options);
    };
    return {
        getUserByToken,
        postUser,
        getUserById,
        getAllUsers,
        deleteUser,
        putUser,
        getUsernameAvailable,
        getEmailAvailable
    };
};

const useMe = () => {
    const getMe = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<User>(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    const putMe = async (user: PutUserRequest, token: string) => {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };
        return await fetchData(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    const deleteMe = async (token: string) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    return { getMe, putMe, deleteMe };
};

const useAuthentication = () => {
    const postLogin = async (creds: Credential) => {
        return await fetchData<PostLoginResponse>(import.meta.env.VITE_SERVER + "/auth/login", {
            method: "POST",
            body: JSON.stringify(creds),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    return { postLogin };
};

export { useUser, useMe, useAuthentication };
