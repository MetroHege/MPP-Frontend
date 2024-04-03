import { PostListingsResponse, User } from "mpp-api-types";
import { Carousel } from "react-responsive-carousel";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

const Single = () => {
    const { state } = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const item: PostListingsResponse = state;
    const userItem: User = state.user;

    return (
        <div className="flex">
            <div className="w-1/2">
                <Carousel showThumbs={false}>
                    {item.images.map((image, index) => (
                        <div key={index}>
                            <img
                                className="w-64 h-130 object-cover rounded"
                                src={image.url}
                                alt={`Listing ${item.id}`}
                            />
                        </div>
                    ))}
                </Carousel>
                <div className="p-3 flex mb-4">
                    <p className="text-4xl mt-2 w-1/2 font-bold">{item.title}</p>
                    <p className="text-4xl mt-2 w-1/2 text-right font-bold">
                        {parseInt(item.price)} €
                    </p>{" "}
                </div>
                <h2 className="mb-4 text-2xl">Lisätiedot</h2>
                <hr className="w-full mt-2 mb-3 border-gray-300" />
                <p className="mb-10">{item.description}</p>
                <div>
                    <h1 className="text-4xl mb-4">Kysymykset:</h1>
                </div>
            </div>
            <div className="w-1/2 p-3 flex ml-4">
                <div className="w-1/2">
                    <p className="text-2xl">Myyjä:</p>
                    <p className="text-2xl">Ilmoitustyyppi:</p>
                    <p className="text-2xl">Ilmoitus jätetty:</p>
                    <p className="text-2xl">Kaupunki:</p>
                    <p className="text-2xl">Kunto:</p>
                    <p className="text-2xl">Kategoria:</p>
                </div>
                <div className="w-1/2">
                    <p className="text-lg">
                        {userItem.firstName} {userItem.lastName}
                    </p>
                    <p className="text-2xl">{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                    <p className="text-2xl">{new Date(item.time).toLocaleDateString("fi-FI")}</p>
                    <p className="text-2xl">{item.user.city}</p>
                    <p className="text-2xl">{item.quality}</p>
                    <p className="text-2xl">
                        {typeof item.category === "number" ? item.category : item.category.title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Single;
