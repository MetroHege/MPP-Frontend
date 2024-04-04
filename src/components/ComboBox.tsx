import React, { useState } from "react";
import { Category } from "mpp-api-types";
import { useCategories } from "../hooks/CategoryHooks";

interface ComboBoxProps {
    options: { value: string; label: string }[];
    onOptionSelect: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, onOptionSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleOptionClick = (value: string) => {
        setInputValue(value);
        setIsOpen(false);
        onOptionSelect(value);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <ul>
                    {options.map(option => (
                        <li key={option.value} onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ComboBox;
