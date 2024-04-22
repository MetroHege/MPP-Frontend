import { PostListingsResponse, User } from "mpp-api-types";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const Listing = (props: { item: PostListingsResponse; userItem: User }) => {
    const item = props.item;
    const userItem = props.userItem;
    const { theme } = useTheme();

    return (
        <>
            <Link to="/single" state={item}>
                <div
                    className={`mb-4 bg-main-light flex overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ${theme === "light" ? "bg-slate-200 text-gray-900" : ""}`}
                >
                    <img className="w-64 h-64 object-cover" src={item.thumbnail?.url} />
                    <div className="flex flex-col p-3 w-3/5">
                        <p className="text-4xl mt-2">{item.title}</p>
                        <p className="mt-2 text-l">
                            {item.description.split(" ").slice(0, 30).join(" ")}
                        </p>
                        <p className="text-4xl mt-2">
                            {typeof item.price === "number" ? item.price : +item.price} €
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 w-1/5">
                        <p className="text-lg">{new Date(item.time).toLocaleDateString("fi-FI")}</p>{" "}
                        <p className="text-lg">{userItem.city}</p>
                        <p className="text-lg hidden">
                            {typeof item.category === "number"
                                ? item.category
                                : item.category.title}
                        </p>
                        <p className="text-lg">{item.type === "buy" ? "Ostetaan" : "Myydään"}</p>
                        <p className="text-lg hidden">{item.quality}</p>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Listing;
