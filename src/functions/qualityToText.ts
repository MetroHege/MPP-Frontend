import { Quality } from "../types/LocalTypes";

export default function (quality: Quality) {
    switch (quality) {
        case Quality.New:
            return "Uusi";
        case Quality.LikeNew:
            return "Uudenveroinen";
        case Quality.Good:
            return "Hyvä";
        case Quality.Fair:
            return "Käyttökelpoinen";
        case Quality.Poor:
            return "Huono";
    }
}
