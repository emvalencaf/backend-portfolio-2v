"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
// express
const express_1 = __importDefault(require("express"));
// controller
const user_1 = __importDefault(require("../../controllers/user"));
// middleware 
const auth_1 = __importDefault(require("../../auth"));
// router
const router = express_1.default.Router();
exports.UserRouter = router;
// routes
router.post("/register", user_1.default.register);
router.post("/login", user_1.default.login);
router.get("/me", auth_1.default.authGuard, user_1.default.getCurrentUser);
router.patch("/change-password", auth_1.default.authGuard, user_1.default.changePassword);
// params routes
router.get("/:id", user_1.default.getByParams);
