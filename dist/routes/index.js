"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
// modules
const express_1 = __importDefault(require("express"));
// routers
const router = (0, express_1.default)();
exports.Router = router;
const portfolio_1 = require("./portfolio");
const project_1 = require("./project");
const settings_1 = require("./settings");
const user_1 = require("./user");
// user routes
router.use("/api/users", user_1.UserRouter);
// portfolio routes
router.use("/api/portfolio", portfolio_1.PortfolioRouter);
// settings routes
router.use("/api/settings", settings_1.SettingsRouter);
// project routes
router.use("/api/projects", project_1.ProjectRouter);
// test route
router.get("/api", (req, res) => {
    res.send("API working!!");
});
