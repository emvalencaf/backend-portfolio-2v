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
    UploadImageMiddleware.uploader.fields([
        {
            name: "backgroundImg", maxCount: 1,
        },
        {
            name: "picture", maxCount: 1,
        },
    ]),
    SectionController.create,
);

router.get("/:id",
    Auth.authGuard,
    SectionController.getById,
);

router.get("/settings/:settingsId",
    Auth.authGuard,
    SectionController.getAllBySettingIds,
);

export { router as SectionRouter };