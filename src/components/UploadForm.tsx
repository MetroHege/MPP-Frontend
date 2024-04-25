import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import useListing from "../hooks/ListingHooks";
import { useCategories } from "../hooks/CategoryHooks";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";

enum Quality {
    New = 5,
    LikeNew = 4,
    Good = 3,
    Fair = 2,
    Poor = 1
}

// This component is a sortable item.
const SortableItem = React.memo(
    SortableElement<{ value: string; i: number; deleteImage: (index: number) => void }>(
        ({
            value,
            i,
            deleteImage
        }: {
            value: string;
            i: number;
            deleteImage: (index: number) => void;
        }) => (
            <div className="relative">
                <img src={value} alt="Uploaded" className="rounded mb-2" />
                <button
                    type="button"
                    onClick={() => deleteImage(i)}
                    className="absolute top-1 right-0 text-xl text-red-500 font-bold w-5 h-5 flex items-center justify-center"
                >
                    X
                </button>
            </div>
        )
    )
);

// This component is a sortable list.
const SortableList = SortableContainer<{ items: string[]; deleteImage: (index: number) => void }>(
    ({ items, deleteImage }: { items: string[]; deleteImage: (index: number) => void }) => {
        return (
            <div className="grid grid-cols-2 gap-2">
                {items.map((value, index) => (
                    <SortableItem
                        key={`item-${index}`}
                        value={value}
                        i={index}
                        index={index}
                        deleteImage={deleteImage}
                    />
                ))}
            </div>
        );
    }
);

// This component is a form for uploading a new listing.
const UploadForm = () => {
    const { categories, getCategories } = useCategories();
    const [category, setCategory] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"buy" | "sell" | "">("");
    const [quality, setQuality] = useState(0);
    const [price, setPrice] = useState(0);
    const { postListing } = useListing();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState({
        image: "",
        category: "",
        title: "",
        description: "",
        quality: "",
        type: ""
    });

    // This function validates the form.
    const validateForm = () => {
        const errors = {
            image: selectedImages.length === 0 ? "Lataa vähintään yksi kuva" : "",
            title: title === "" ? "Anna ilmoitukselle otsikko" : "",
            description: description === "" ? "Anna ilmoitukselle kuvaus" : "",
            type: type !== "buy" && type !== "sell" ? "Valitse ilmoituksen tyyppi" : "",
            quality: quality === 0 ? "Valitse tuotteen kunto" : "",
            category: category === 0 ? "Valitse tuotteen kategoria" : ""
        };
        setValidationErrors(errors);
        return !Object.values(errors).some(error => error !== "");
    };

    // This function is used to sort the images.
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        setSelectedImages(prevImages => {
            const newImages = arrayMove(prevImages, oldIndex, newIndex);
            console.log(newImages);
            return newImages;
        });
    };

    // This function is used to delete an image.
    const deleteImage = (index: number) => {
        console.log(index);
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    // This function is used to handle image changes.
    const handleImageChange = (e: any) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);

            if (selectedImages.length + fileArray.length > 5) {
                alert("Voit lisätä maksimissaan 5 kuvaa ilmoitukseen!");
                return;
            }

            setSelectedImages(prevImages => prevImages.concat(fileArray as File[]));
        }
    };

    // This function is used to handle form submission.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        const token = localStorage.getItem("token");
        const response = await postListing(
            selectedImages,
            { type, category, quality, price, title, description },
            token as string
        );
        if (response) {
            navigate("/profile");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    <h1 className="text-4xl">Kuvat:</h1>
                    <h3 className="mb-2 text-xs text-slate-500">
                        Voit lisätä maksimissaan 5 kuvaa
                    </h3>
                    <div className="mb-4">
                        {selectedImages.length > 0 && (
                            <p>
                                Voit vaihtaa kuvien järjestystä raahaamalla niitä (ensimmäinen on
                                kansikuva)
                            </p>
                        )}
                        <SortableList
                            items={selectedImages.map(file => URL.createObjectURL(file))}
                            onSortEnd={onSortEnd}
                            axis="xy"
                            deleteImage={deleteImage}
                        />
                        <input type="file" name="image" onChange={handleImageChange} multiple />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    {" "}
                    <div className="mb-4">
                        <h2 className="text-2xl mb-2">Ilmoituksen otsikko:</h2>
                        <input
                            type="text"
                            placeholder="Tuotteen nimi..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                        />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl">Ilmoitusteksti:</h2>
                        <h3 className="mb-2 text-xs text-slate-500">
                            Kirjoita lyhyt kuvaus tuotteestasi (max 150 merkkiä)
                        </h3>
                        <textarea
                            placeholder="Tuotekuvaus..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-2/3 h-30 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl mb-2">Ilmoituksen tyyppi:</h2>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="type"
                                value="sell"
                                onChange={e => setType(e.target.value as "buy" | "sell")}
                                className="mr-1"
                            ></input>
                            Myydään
                        </label>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="type"
                                value="buy"
                                onChange={e => setType(e.target.value as "buy" | "sell")}
                                className="mr-1"
                            ></input>
                            Ostetaan
                        </label>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl mb-2">Tuotteen kunto:</h2>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="quality"
                                value={Quality.New}
                                onChange={e => setQuality(Number(e.target.value))}
                                className="mr-1"
                            ></input>
                            Uusi
                        </label>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="quality"
                                value={Quality.LikeNew}
                                onChange={e => setQuality(Number(e.target.value))}
                                className="mr-1"
                            ></input>
                            Erinomainen
                        </label>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="quality"
                                value={Quality.Good}
                                onChange={e => setQuality(Number(e.target.value))}
                                className="mr-1"
                            ></input>
                            Hyvä
                        </label>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="quality"
                                value={Quality.Fair}
                                onChange={e => setQuality(Number(e.target.value))}
                                className="mr-1"
                            ></input>
                            Tyydyttävä
                        </label>
                        <label className=" mb-4 mr-2">
                            <input
                                type="radio"
                                name="quality"
                                value={Quality.Poor}
                                onChange={e => setQuality(Number(e.target.value))}
                                className="mr-1"
                            ></input>
                            Huono
                        </label>
                    </div>
                    <div>
                        <h2 className="text-2xl mb-2">Tuotekategoria:</h2>
                        <Dropdown
                            buttonText="Tuotekategoriat"
                            className="mb-4"
                            value={category}
                            onChange={e => setCategory(Number(e.target.value))}
                            onOptionSelect={(id: number) => {
                                console.log("Selected category ID:", id);
                                setCategory(id);
                            }}
                        />
                        {category !== 0 && (
                            <div className="flex items-center space-x-2">
                                {categories.find(cat => cat.id === category)?.title && (
                                    <span>
                                        {categories.find(cat => cat.id === category)?.title}
                                    </span>
                                )}
                                <button
                                    className="bg-transparent border-none cursor-pointer text-2xl text-red-500"
                                    onClick={() => setCategory(0)}
                                >
                                    X
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl">Hinta:</h2>
                        <h3 className="mb-2 text-xs text-slate-500">kokonaisina euroina</h3>
                        <input
                            type="text"
                            value={price}
                            onChange={e => {
                                const value = Number(e.target.value);
                                if (!isNaN(value)) {
                                    setPrice(value);
                                }
                            }}
                            className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950 bg-slate-50 dark:text-slate-950 dark:bg-slate-50"
                        />
                    </div>
                    <div className="mt-4">
                        {Object.values(validationErrors).map(
                            (error, index) =>
                                error && (
                                    <p key={index} className="text-red-500">
                                        {error}
                                    </p>
                                )
                        )}
                        <button
                            type="submit"
                            className=" w-1/2 p-2 bg-green-gradient font-bold rounded text-slate-950 transition duration-300 ease-in-out hover:brightness-75 hover:shadow-md"
                        >
                            Jätä ilmoitus!
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UploadForm;
