// express
import express from "express";

// middleware
import Auth from "../../auth";

// types
import { Router } from "express";
import PortfolioController from "../../controllers/portfolio";

// router
const router: Router = express.Router();

// routes
router.post("/",
    Auth.authGuard,
    PortfolioController.create
);
router.get("/", PortfolioController.get);


export { router as PortfolioRouter };