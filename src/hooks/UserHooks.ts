const useUser = () => {
    // TODO: implement network functions for auth server user endpoints
    const getUserByToken = async (token: string) => {
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        return await fetchData<UserResponse>(
            import.meta.env.VITE_AUTH_API + "/users/token/",
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

        await fetchData<UserResponse>(import.meta.env.VITE_AUTH_API + "/users", options);
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

    const getUserById = async (user_id: number) => {
        return await fetchData<User>(import.meta.env.VITE_AUTH_API + "/users/" + user_id);
    };

    const getAllUsers = async () => {
        return await fetchData<UserWithNoPassword[]>(import.meta.env.VITE_AUTH_API + "/users");
    };

    const deleteUser = async (user_id: number, token: string) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        };

        await fetchData(import.meta.env.VITE_AUTH_API + "/users/" + user_id, options);
    };

    return {
        getUserByToken,
        postUser,
        getUsernameAvailable,
        getEmailAvailable,
        getUserById,
        getAllUsers,
        deleteUser
    };
};

const useAuthentication = () => {
    const postLogin = async (creds: Credentials) => {
        return await fetchData<LoginResponse>(import.meta.env.VITE_AUTH_API + "/auth/login", {
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
