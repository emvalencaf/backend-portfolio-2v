// express
import express from "express";

// controller
import UserController from "../../controllers/user";

// middleware 
import Auth from "../../auth";

// types
import { Router } from "express";

// router
const router: Router = express.Router();

// routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me",
    Auth.authGuard,
    UserController.getCurrentUser
);
router.patch("/change-password",
    Auth.authGuard,
    UserController.changePassword,
);

// params routes
router.get("/:id",
    UserController.getByParams
);

export { router as UserRouter };