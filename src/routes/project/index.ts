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
router.get("/mainLangs/:mainLang", ProjectController.getByParams);
router.get("/users/:userId", ProjectController.getByParams);
router.get("/titles/:title", ProjectController.getByParams);
router.get("/:id", ProjectController.getByParams);


export { router as ProjectRouter };