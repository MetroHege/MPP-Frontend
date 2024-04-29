import React, { useState, useRef } from "react";

interface FilterDropdownProps {
    options: string[];
    buttonText: string;
    selectedOption: string;
    handleOptionChange: (selectedOption: string) => void;
}

// This component is used to render a filter dropdown.
const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    buttonText,
    handleOptionChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {buttonText}
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto max-h-50">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {options.map((option, index) => (
                            <a
                                key={index}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    handleOptionChange(option);
                                }}
                            >
                                {option}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
