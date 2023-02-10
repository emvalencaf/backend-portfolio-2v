// express
import express from "express";

// controller
import UserController from "../../controllers/user";

// types
import { Router } from "express";

// router
const router: Router = express.Router();

router.post("/register", UserController.register);

// params router
router.route("/:id")
    .get(UserController.getById);

export { router as UserRouter };