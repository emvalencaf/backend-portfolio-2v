// modules
import express from "express";
import { PortfolioRouter } from "./portfolio";
import { UserRouter } from "./user";
// router
const router = express();


// user routes
router.use("/api/users", UserRouter);

// portfolio routes
router.use("/api/portfolio", PortfolioRouter);

// test route
router.get("/api", (req, res) => {
    
    res.send("API working!!");

});

export { router as Router };