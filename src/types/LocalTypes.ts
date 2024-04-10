import { PostLoginRequest, UserWithId } from "mpp-api-types";

export type Credentials = PostLoginRequest;

export type AuthContextType = {
    user: UserWithId | null;
    handleLogin: (credentials: Credentials) => void;
    handleLogout: () => void;
    handleAutoLogin: () => void;
};
