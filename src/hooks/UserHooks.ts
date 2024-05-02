import {
    GetMeResponse,
    GetUserResponse,
    PostLoginRequest,
    PostLoginResponse,
    PostUsersRequest,
    PostUsersResponse,
    PutMeResponse,
    PutUserRequest,
    User,
    UserWithId
} from "mpp-api-types";
import { fetchData } from "../lib/functions";
import { useEffect, useState } from "react";

// This hook is used to fetch and manage user data from the server.
const useUser = () => {
    const [user, setUser] = useState<UserWithId | null>(null);

    // This function is used to fetch a user by token.
    const getUserByToken = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<GetUserResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    // This function is used to post a user to the server.
    const postUser = async (user: PostUsersRequest) => {
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

        return await fetchData<PostUsersResponse>(import.meta.env.VITE_SERVER + "/users", options);
    };

    // This function is used to fetch a user by id.
    const getUserById = async (id: number) => {
        return await fetchData<GetUserResponse>(import.meta.env.VITE_SERVER + "/users/" + id);
    };

    // This function is used to check if a username is available.
    const getUsernameAvailable = async (username: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_SERVER + "/users/username/" + username
        );
    };

    // This function is used to check if an email is available.
    const getEmailAvailable = async (email: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_SERVER + "/users/email/" + email
        );
    };

    // This function is used to fetch all users.
    const getAllUsers = async () => {
        return await fetchData<User[]>(import.meta.env.VITE_SERVER + "/users");
    };

    // This function is used to delete a user.
    const deleteUser = async (user_id: number, token: string) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };

        await fetchData(import.meta.env.VITE_SERVER + "/users/" + user_id, options);
    };

    // This function is used to put a user.
    const putUser = async (user_id: number, user: PutUserRequest, token: string) => {
        console.log(user);

        const options: RequestInit = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };

        await fetchData(import.meta.env.VITE_SERVER + "/users/" + user_id, options);
    };

    useEffect(() => {
        getUserByToken(localStorage.getItem("token") as string).then(user => setUser(user));
    }, []);

    // This function is used to get user cities.
    const getUserCities = async () => {
        const users = await getAllUsers();
        return users.map(user => user.city);
    };

    return {
        getUserByToken,
        postUser,
        getUserById,
        getAllUsers,
        deleteUser,
        putUser,
        getUsernameAvailable,
        getEmailAvailable,
        user,
        getUserCities
    };
};

// This hook is used to fetch and manage me data from the server.
const useMe = () => {
    const getMe = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<GetMeResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    // This function is used to put me.
    const putMe = async (user: PutUserRequest, token: string) => {
        const options: RequestInit = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };
        return await fetchData<PutMeResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
    };

    // This function is used to delete me.
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

// This hook is used to fetch and manage authentication data from the server.
const useAuthentication = () => {
    const postLogin = async (creds: PostLoginRequest) => {
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
