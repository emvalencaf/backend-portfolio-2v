"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRouter = void 0;
// express
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../auth"));
const settings_1 = __importDefault(require("../../controllers/settings"));
const uploadImage_1 = __importDefault(require("../../middlewares/uploadImage"));
// router
const router = express_1.default.Router();
exports.SettingsRouter = router;
router.get("/", settings_1.default.getAllSettings);
router.post("/", auth_1.default.authGuard, uploadImage_1.default.uploader.fields([
    {
        name: "favIcon", maxCount: 1,
    },
    {
        name: "logoImg", maxCount: 1,
    },
]), settings_1.default.create);
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
