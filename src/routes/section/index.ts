// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";

// controller
import SectionController from "../../controllers/section";
import UploadImageMiddleware from "../../middlewares/uploadImage";

// router
const router: Router = express.Router();

// get all sections

// post a new section
router.post("/:typeSection",
    Auth.authGuard,
    UploadImageMiddleware.uploader.single("picture"),
    SectionController.create);

export { router as SettingsRouter };