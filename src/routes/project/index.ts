// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";
import ProjectController from "../../controllers/project";

// router
const router: Router = express.Router();

// routes
    // get routes
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getByParams);
router.get("/mainLangs/:mainLang", ProjectController.getByParams);
router.get("/users/:user", ProjectController.getByParams);
router.get("/title/:title", ProjectController.getByParams);

    // post route
router.post("/", Auth.authGuard, ProjectController.create);

export { router as ProjectRouter };