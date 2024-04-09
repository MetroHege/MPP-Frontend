import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import useListing from "../hooks/ListingHooks";
import { useCategories } from "../hooks/CategoryHooks";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import { useNavigate } from "react-router-dom";

export enum Quality {
    New = 5,
    LikeNew = 4,
    Good = 3,
    Fair = 2,
    Poor = 1
}

const SortableItem = React.memo(
    SortableElement(({ value }: { value: string }) => (
        <img src={value} alt="Uploaded" className="rounded mb-2 w-50 h-50" />
    ))
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    );
});

const UploadForm = () => {
    const { categories, getCategories } = useCategories();
    const [category, setCategory] = useState(0);
    const [selectedImage, setSelectedImage] = useState("https://placehold.co/300x300");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<"buy" | "sell">("buy");
    const [quality, setQuality] = useState(0);
    const [price, setPrice] = useState(0);
    const { postListing } = useListing();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const navigate = useNavigate();

    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        setSelectedImages(prevImages => {
            const newImages = arrayMove(prevImages, oldIndex, newIndex);
            console.log(newImages);
            return newImages;
        });
    };

    const handleImageChange = (e: any) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);

            setSelectedImages(prevImages => prevImages.concat(fileArray as File[]));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
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
            <div className="flex">
                <div className="w-1/2 p-4">
                    <h1 className="text-4xl mb-4">Kuvat:</h1>
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
                        />
                        <input type="file" name="image" onChange={handleImageChange} multiple />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl mb-2">Ilmoituksen otsikko:</h2>
                        <input
                            type="text"
                            placeholder="Tuotteen nimi..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        />
                    </div>
                </div>
                <div className="w-1/2 p-4">
                    <div className="mb-4">
                        <h2 className="text-2xl">Ilmoitusteksti:</h2>
                        <h3 className="mb-2 text-xs text-slate-500">
                            Kirjoita lyhyt kuvaus tuotteestasi (max 150 merkkiä)
                        </h3>
                        <textarea
                            placeholder="Tuotekuvaus..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full h-30 rounded border border-slate-500 p-2 text-slate-950"
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
                            onChange={e => setPrice(Number(e.target.value))}
                            className="w-2/3 h-10 rounded border border-slate-500 p-2 text-slate-950"
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className=" w-1/2 p-2 bg-green-gradient font-bold rounded"
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
