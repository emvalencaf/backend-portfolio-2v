"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRouter = void 0;
// express
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../auth"));
const project_1 = __importDefault(require("../../controllers/project"));
const uploadImage_1 = __importDefault(require("../../middlewares/uploadImage"));
// router
const router = express_1.default.Router();
exports.ProjectRouter = router;
// routes
// post route
router.post("/", auth_1.default.authGuard, uploadImage_1.default.uploader.single("picture"), project_1.default.create);
// get routes
router.get("/", project_1.default.getAllProjects);
router.get("/mainLangs/:mainLang", project_1.default.getByParams);
router.get("/users/:userId", project_1.default.getByParams);
router.get("/titles/:title", project_1.default.getByParams);
router.get("/:id", project_1.default.getByParams);
