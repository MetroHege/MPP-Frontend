import { PostListingsRequest, User } from "mpp-api-types";

export type Credentials = Pick<User, keyof User>;

export type AuthContextType = {
    user: PostListingsRequest | null;
    handleLogin: (credentials: Credentials) => void;
    handleLogout: () => void;
    handleAutoLogin: () => void;
};
