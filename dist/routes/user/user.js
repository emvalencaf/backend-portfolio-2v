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
// router
const router = express_1.default.Router();
exports.UserRouter = router;
router.post("/register", user_1.default.register);
// params router
router.route("/:id")
    .get(user_1.default.findUserById);
