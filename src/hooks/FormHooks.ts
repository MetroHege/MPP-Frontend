import { useState } from "react";

// This hook is used to manage form inputs and submission.
const useForm = <T>(callback: () => void, initState: T) => {
    const [inputs, setInputs] = useState<T>(initState);

    const handleSubmit = (event: React.SyntheticEvent) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    };

    // This function is used to handle input changes.
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    // This function is used to reset the form.
    const resetForm = () => {
        setInputs(initState);
    };

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        resetForm
    };
};

export { useForm };
