// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";

// controller
import SettingsController from "../../controllers/settings";
import UploadImageMiddleware from "../../middlewares/uploadImage";

// router
const router: Router = express.Router();

router.get("/", SettingsController.getAllSettings);
router.get("/:id",
    Auth.authGuard,
    SettingsController.getByParams
);
router.post("/",
    Auth.authGuard,
    UploadImageMiddleware.uploader.fields([
        {
            name: "favIcon", maxCount: 1,
        },
        {
            name: "logoImg", maxCount: 1,
        },
    ]),
    SettingsController.create);
router.put("/:id",
    Auth.authGuard,
    UploadImageMiddleware.uploader.fields([
        {
            name: "favIcon", maxCount: 1,
        },
        {
            name: "logoImg", maxCount: 1,
        },
    ]),
    SettingsController.update);

export { router as SettingsRouter };