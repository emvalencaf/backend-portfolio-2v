// modules
import express from "express";
import dotenv from "dotenv";

// types
import { Express, Request, Response } from "express";

dotenv.config();


const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// custom routes
import { UserRouter } from "./routes/user";

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server")
});

app.use("/user", UserRouter);

export default app;