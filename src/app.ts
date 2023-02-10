// modules
import express from "express";
import dotenv from "dotenv";

// types
import { Express, Request, Response } from "express";

dotenv.config();


const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// custom router
import { Router } from "./routes";

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server")
});

app.use(Router);


export default app;