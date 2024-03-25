/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "main-dark": "#1E1F22",
                "main-light": "#313338",
                "main-medium": "#2B2D31"
            },
            backgroundImage: {
                "blue-gradient": "linear-gradient(to right, #6AA9FF, #3B7BD9)",
                "red-gradient": "linear-gradient(to right, #FF6E6E, #D93B3B)",
                "yellow-gradient": "linear-gradient(to right, #F7F77A, #E7E732)",
                "green-gradient": "linear-gradient(to right, #72D572, #4CAF50)"
            },
            borderRadius: {
                custom1: "32px",
                custom2: "96px",
                custom3: "128px",
                custom4: "32px"
            }
        }
    },
    variants: {
        extend: {
            backgroundImage: ["hover", "focus", "active"]
        }
    },
    plugins: ["prettier-plugin-tailwindcss"]
};
