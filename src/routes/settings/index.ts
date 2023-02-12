// express
import express from "express";

// types
import { Router } from "express";
import Auth from "../../auth";
import SettingsController from "../../controllers/settings";
import UploadImageMiddleware from "../../middlewares/uploadImage";

// router
const router: Router = express.Router();

router.get("/", SettingsController.getAllSettings);
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

export { router as SettingsRouter };
/*
when there is more than one field method used is multer.fields

router.post("/api/",
    Auth.authGuard,
    UploadImageMiddleware.uploader.fields([
        {
            name: "picture",
            maxCount: 1,
        },
        {
            name: "picture2",
            maxCount: 1,
        }
    ]),
    async (req, res) => {

    res.json({
        files: req.files,
    })
});

when there is only one

multer.single("{name of the field}")

*/