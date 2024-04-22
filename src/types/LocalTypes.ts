import { PostLoginRequest, UserWithId } from "mpp-api-types";

export type Credentials = PostLoginRequest;

export type AuthContextType = {
    user: UserWithId | null;
    handleLogin: (credentials: Credentials) => void;
    handleLogout: () => void;
    handleAutoLogin: () => void;
};

export enum Quality {
    New = 5,
    LikeNew = 4,
    Good = 3,
    Fair = 2,
    Poor = 1
}
