import express from "express";
import dotenv from "dotenv";

// types
import { Express, Request, Response } from "express";

dotenv.config();


const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server")
});

export default app;