import { Category } from "mpp-api-types";
import { useState, useEffect, useRef } from "react";
import { useCategories } from "../hooks/CategoryHooks";

const Dropdown = ({
    buttonText,
    className,
    onOptionSelect // new prop
}: {
    buttonText: string;
    className?: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onOptionSelect: (id: number) => void; // new prop
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { categories, getCategories } = useCategories(); // call useCategories

    useEffect(() => {
        getCategories(); // fetch categories when the component mounts
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                type="button"
                className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
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
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto max-h-50">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {categories.map((option: Category, index: number) => (
                            <a
                                key={index}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                                onClick={e => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    onOptionSelect(option.id); // use the new prop here
                                }}
                            >
                                {option.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
