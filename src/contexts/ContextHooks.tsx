import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { UpdateContext } from "../contexts/UpdateContext";

// These hooks are used to access the UserContext and UpdateContext.
const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext can only be used inside an UpdateProvider");
    }

    return context;
};

// This hook is used to access the UpdateContext.
const useUpdateContext = () => {
    const context = useContext(UpdateContext);
    if (!context) {
        throw new Error("useUpdateContext can only be used inside an UpdateProvider");
    }

    return context;
};

export { useUserContext, useUpdateContext };
