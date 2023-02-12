// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";
import ProjectController from "../../controllers/project";
import UploadImageMiddleware from "../../middlewares/uploadImage";

// router
const router: Router = express.Router();

// routes
    // post route
router.post("/", Auth.authGuard, UploadImageMiddleware.uploader.single("picture"), ProjectController.create);
    // get routes
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getByParams);
router.get("/mainLangs/:mainLang", ProjectController.getByParams);
router.get("/users/:user", ProjectController.getByParams);
router.get("/title/:title", ProjectController.getByParams);


export { router as ProjectRouter };