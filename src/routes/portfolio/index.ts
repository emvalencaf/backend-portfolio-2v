// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";
import PortfolioController from "../../controllers/portfolio";

// router
const router: Router = express.Router();

// routes
router.get("/", PortfolioController.get);
router.post("/", Auth.authGuard, PortfolioController.createSettings);

export { router as PortfolioRouter };