// modules
import express from "express";
import { UserRouter } from "./user";
// router
const router = express();


// user routes
router.use("/api/users", UserRouter);


// test route
router.get("/api", (req, res) => {
    
    res.send("API working!!");

});

export { router as Router };