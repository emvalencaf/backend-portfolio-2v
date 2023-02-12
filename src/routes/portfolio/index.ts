// express
import express from "express";

// types
import { Router } from "express";
import PortfolioController from "../../controllers/portfolio";

// router
const router: Router = express.Router();

// routes
router.get("/", PortfolioController.get);


export { router as PortfolioRouter };