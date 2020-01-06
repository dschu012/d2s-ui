import express from "express";
import dotenv from "dotenv";
import path from "path";
import api from "./api/routes";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || 8080;

app.use("/", express.static(path.join(process.cwd(), "dist")));
app.use("/api", api);

app.listen(port, () => {
    console.log(`server started on ${port}`);
});