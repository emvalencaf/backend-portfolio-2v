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
// router
const router = express_1.default.Router();
exports.ProjectRouter = router;
// routes
// get routes
router.get("/", project_1.default.getAllProjects);
router.get("/:id", project_1.default.getByParams);
router.get("/mainLangs/:mainLang", project_1.default.getByParams);
router.get("/users/:user", project_1.default.getByParams);
router.get("/title/:title", project_1.default.getByParams);
// post route
router.post("/", auth_1.default.authGuard, project_1.default.create);
