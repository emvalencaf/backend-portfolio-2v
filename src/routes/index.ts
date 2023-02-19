// modules
import express from "express";

// routers
const router = express();
import { PortfolioRouter } from "./portfolio";
import { ProjectRouter } from "./project";
import { SectionRouter } from "./section";
import { SettingsRouter } from "./settings";
import { UserRouter } from "./user";


// user routes
router.use("/api/users", UserRouter);

// portfolio routes
router.use("/api/portfolios", PortfolioRouter);

// sections
router.use("/api/sections", SectionRouter)

// settings routes
router.use("/api/settings", SettingsRouter);

// project routes
router.use("/api/projects", ProjectRouter);

// test route
router.get("/api", (req, res) => {
    
    res.send("API working!!");

});


export { router as Router };