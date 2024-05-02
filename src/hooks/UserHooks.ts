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

const useUser = () => {
    const [user, setUser] = useState<UserWithId | null>(null);

    const getUserByToken = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<GetUserResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
    };

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

    const getUserById = async (id: number) => {
        return await fetchData<GetUserResponse>(import.meta.env.VITE_SERVER + "/users/" + id);
    };

    const getUsernameAvailable = async (username: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_SERVER + "/users/username/" + username
        );
    };

    const getEmailAvailable = async (email: string) => {
        return await fetchData<{ available: boolean }>(
            import.meta.env.VITE_SERVER + "/users/email/" + email
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

const useMe = () => {
    const getMe = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<GetMeResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
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
        return await fetchData<PutMeResponse>(import.meta.env.VITE_SERVER + "/users/me", options);
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
