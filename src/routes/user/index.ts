// express
import express from "express";

// controller
import UserController from "../../controllers/user";

// types
import { Router } from "express";

// router
const router: Router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// params router
router.route("/:id")
    .get(UserController.getByParams);

export { router as UserRouter };