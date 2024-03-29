"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioRouter = void 0;
// express
const express_1 = __importDefault(require("express"));
// middleware
const auth_1 = __importDefault(require("../../auth"));
const portfolio_1 = __importDefault(require("../../controllers/portfolio"));
// router
const router = express_1.default.Router();
exports.PortfolioRouter = router;
// routes
router.post("/", auth_1.default.authGuard, portfolio_1.default.create);
router.get("/", portfolio_1.default.get);
