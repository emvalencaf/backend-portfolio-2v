"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRouter = void 0;
// express
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../auth"));
// controller
const section_1 = __importDefault(require("../../controllers/section"));
const uploadImage_1 = __importDefault(require("../../middlewares/uploadImage"));
// router
const router = express_1.default.Router();
exports.SectionRouter = router;
// get all sections
// post a new section
router.post("/:typeSection", auth_1.default.authGuard, uploadImage_1.default.uploader.fields([
    {
        name: "backgroundImg", maxCount: 1,
    },
    {
        name: "picture", maxCount: 1,
    },
]), section_1.default.create);
router.put("/:id", auth_1.default.authGuard, section_1.default.update);
router.get("/", auth_1.default.authGuard, section_1.default.getAll);
router.get("/:id", auth_1.default.authGuard, section_1.default.getByParams);
router.get("/settings/:settingsId", auth_1.default.authGuard, section_1.default.getByParams);
