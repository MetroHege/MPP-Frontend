import { Dispatch, SetStateAction, createContext, useState } from "react";

type UpdateContextType = {
    update: boolean;
    setUpdate: Dispatch<SetStateAction<boolean>>;
};

// This context is used to manage the update state of the application.
const UpdateContext = createContext<UpdateContextType | null>(null);

// This provider is used to wrap the application and provide the update context.
const UpdateProvider = ({ children }: { children: React.ReactNode }) => {
    const [update, setUpdate] = useState<boolean>(false);

    return (
        <UpdateContext.Provider value={{ update, setUpdate }}>{children}</UpdateContext.Provider>
    );
};

export { UpdateContext, UpdateProvider };
