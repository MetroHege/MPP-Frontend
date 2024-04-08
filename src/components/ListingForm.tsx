import { PutListingRequest } from "mpp-api-types";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "react-modal"; // make sure to install this package
import useListing from "../hooks/ListingHooks";

interface ListingFormProps {
    id: number;
    showForm: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

const ListingForm: React.FC<ListingFormProps> = ({ showForm, setShowForm }) => {
    const [listing, setListing] = useState<PutListingRequest>({});
    const { putListing } = useListing();
    const [formData, setFormData] = useState<PutListingRequest>({ id });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Modal
            isOpen={showForm}
            onRequestClose={() => setShowForm(false)}
            className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
            contentLabel="Modal"
        >
            <div className="bg-main-medium rounded-lg w-1/3">
                <div className="flex flex-col items-start p-4">
                    <div className="flex items-center w-full">
                        <div className="font-medium text-lg">Muokkaa tietojasi:</div>
                        <svg
                            onClick={() => setShowForm(false)}
                            className="ml-auto fill-current w-6 h-6 cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 18 18"
                        >
                            <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                        </svg>
                    </div>
                    <hr className="w-full mt-2 mb-3 border-gray-300" />
                    <form
                        onSubmit={async e => {
                            e.preventDefault();
                            const token = localStorage.getItem("token");
                            if (token) {
                                await putListing(formData.id, formData, token);
                                setShowForm(false);
                            } else {
                                console.log("Token not found");
                            }
                        }}
                    >
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                        <input
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                        />
                        <div className="ml-auto mt-4 space-x-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                type="submit"
                            >
                                Tallenna
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                type="button"
                                onClick={() => setShowForm(false)}
                            >
                                Peruuta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ListingForm;
