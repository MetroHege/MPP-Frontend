import express from "express";

const app = express();

app.use("/", express.static("dist"));
app.use("/assets/icon", express.static("icon"));
app.use("/*", express.static("dist"));

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
