// modules
import express from "express";


// routers
const router = express();
import { PortfolioRouter } from "./portfolio";
import { ProjectRouter } from "./project";
import { UserRouter } from "./user";


// user routes
router.use("/api/users", UserRouter);

// portfolio routes
router.use("/api/portfolio", PortfolioRouter);

// project routes
router.use("/api/projects", ProjectRouter);

// test route
router.get("/api", (req, res) => {
    
    res.send("API working!!");

});

export { router as Router };